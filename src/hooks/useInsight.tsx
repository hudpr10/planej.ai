import { useCallback, useEffect, useRef, useState } from 'react';

import { buildAIPrompt } from '@/data/aiPrompt';
import { getInsight, type InsightData } from '@/services/aiService';

import useSimulationStorage from './useSimulationStorage';

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const { getFormData, updateFormData } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id);
    if (simulation?.insight) return simulation.insight;
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Necessário o uso do useCallback
  // Essa função entra no array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }

      // Muda o estado o ref
      // Impede que faça outras requisições até essa ser finalizada
      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const response = await getInsight(prompt);
        setInsight(response?.data);

        if (response) {
          setInsight(response.data);

          // Salvamos apenas o insight estruturado inicialmente
          updateFormData(simulationId, {
            ...simulation,
            insight: response.data ?? undefined,
          });

          return response.data;
        }
      } catch {
        setError('Erro ao gerar diagnóstico. Tente novamente.');
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData, updateFormData],
  );

  useEffect(() => {
    // Evita o loop infinito de requisições
    if (insight || isLoading || error || isRequestPending.current) return;
    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
