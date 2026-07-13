import type { Content } from '@google/genai';
import { useCallback, useEffect, useState } from 'react';

import { sendChatMessage } from '@/services/aiService';

import useSimulationStorage from './useSimulationStorage';

export const useChat = (simulationId: string) => {
  const { getFormData, updateFormData } = useSimulationStorage();

  // Inicializa o estado das mensagens buscando o histórico já salvo no localStorage
  const [messages, setMessages] = useState<Content[]>(() => {
    const simulation = getFormData(simulationId);
    return simulation?.insight?.chatHistory || [];
  });

  // Sincroniza o estado das mensagens se a simulação mudar ou o histórico carregar
  useEffect(() => {
    const simulation = getFormData(simulationId);
    if (simulation?.insight?.chatHistory) {
      setMessages((prev) => {
        // Evita atualizações desnecessárias e loops infinitos comparando os valores
        if (JSON.stringify(prev) === JSON.stringify(simulation.insight?.chatHistory)) {
          return prev;
        }
        return simulation.insight?.chatHistory;
      });
    }
  }, [simulationId, getFormData]);

  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isSending) return;

      const simulation = getFormData(simulationId);
      if (!simulation) {
        setChatError('Simulação não encontrada.');
        return;
      }

      setIsSending(true);
      setChatError(null);

      // 1. Atualiza a interface imediatamente com a mensagem que o usuário digitou
      const userMessage: Content = { role: 'user', parts: [{ text }] };
      const tempHistory = [...messages, userMessage];
      setMessages(tempHistory);

      try {
        // 2. Envia o histórico acumulado para a nossa service do Gemini
        const { data, updatedHistory } = await sendChatMessage(text, messages, simulation);

        // 3. Atualiza o estado local do React com o histórico completo retornado pelo SDK
        setMessages(updatedHistory);

        // 4. Persiste o novo histórico no localStorage usando o seu storage hook
        updateFormData(simulationId, {
          ...simulation,
          insight: simulation.insight
            ? {
                ...simulation.insight,
                chatHistory: updatedHistory,
              }
            : undefined,
        });

        return data;
      } catch {
        setChatError('Não foi possível enviar a mensagem. Tente novamente.');
        // Se deu erro, removemos a mensagem do usuário que falhou para não quebrar a sincronia
        setMessages(messages);
      } finally {
        setIsSending(false);
      }
    },
    [simulationId, messages, getFormData, updateFormData, isSending],
  );

  const clearChat = useCallback(() => {
    const simulation = getFormData(simulationId);
    if (!simulation) return;

    setMessages([]);
    updateFormData(simulationId, {
      ...simulation,
      insight: simulation.insight
        ? {
            ...simulation.insight,
            chatHistory: [],
          }
        : undefined,
    });
  }, [simulationId, getFormData, updateFormData]);

  return {
    messages,
    sendMessage,
    isSending,
    chatError,
    clearChat,
  };
};
