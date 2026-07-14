import type { Content } from '@google/genai';
import { useCallback, useRef, useState } from 'react';

import { sendChatMessage } from '@/services/aiService';

import useSimulationStorage from './useSimulationStorage';

export const useChat = (simulationId: string) => {
  const isMessagePending = useRef(false);
  const { getFormData, updateFormData } = useSimulationStorage();

  // Inicializa o estado das mensagens buscando o histórico já salvo no localStorage
  const [messages, setMessages] = useState<Content[]>(() => {
    const simulation = getFormData(simulationId);
    return simulation?.insight?.chatHistory || [];
  });

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }

      isMessagePending.current = true;
      setIsSending(true);
      setError(null);

      // Atualiza a interface imediatamente com a mensagem que o usuário digitou
      const userMessage: Content = { role: 'user', parts: [{ text }] };
      setMessages([...messages, userMessage]);

      try {
        // Envia o histórico acumulado para a Service do Gemini
        const { updatedHistory } = await sendChatMessage(text, messages, simulation);

        // Atualiza o estado local do React com o histórico completo retornado pelo SDK
        setMessages(updatedHistory);

        // Persiste o novo histórico no localStorage usando o storage hook
        updateFormData(simulationId, {
          ...simulation,
          insight: simulation.insight
            ? {
                ...simulation.insight,
                chatHistory: updatedHistory,
              }
            : undefined,
        });
      } catch {
        setError('Não foi possível enviar a mensagem. Tente novamente.');
        // Se deu erro, removemos a mensagem do usuário que falhou para não quebrar a sincronia
        setMessages(messages);
      } finally {
        setIsSending(false);
      }
    },
    [simulationId, messages, getFormData, updateFormData],
  );

  return {
    messages,
    sendMessage,
    isSending,
    error,
  };
};
