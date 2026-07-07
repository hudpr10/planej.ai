import { useCallback, useEffect, useState } from 'react';

import { buildAIPrompt } from '@/data/aiPrompt';
import { getInsight, type InsightData } from '@/services/aiService';

import useSimulationStorage from './useSimulationStorage';

export const useInsight = (id: string) => {
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getFormData } = useSimulationStorage();

  // Necessário o uso do useCallback
  // Essa função entra no array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const data = await getInsight(prompt);
        setInsight(data);
        return data;
      } catch {
        setError('Erro ao gerar diagnóstico. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [getFormData],
  );

  useEffect(() => {
    // Evita o loop infinito de requisições
    if (insight || isLoading || error) {
      return;
    }

    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
