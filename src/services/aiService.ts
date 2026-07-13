import { type Content, GoogleGenAI } from '@google/genai';

import { buildAIPrompt } from '@/data/aiPrompt';
import type { SimulationRecord } from '@/data/simulation';

export type InsightData = {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible';
    content: string;
  };
  diagnosis: {
    content: string;
  };
  suggestion: {
    items: string[];
  };
  extraIncome: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
  chatHistory?: Content[];
};

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL = 'gemini-2.5-flash';
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const sendChatMessage = async (
  prompt: string,
  history: Content[] | undefined,
  simulation: SimulationRecord,
) => {
  const initialPrompt = buildAIPrompt(simulation);
  const initialResponse = JSON.stringify(simulation.insight);

  const contextHistory: Content[] = [
    { role: 'user', parts: [{ text: initialPrompt }] },
    { role: 'model', parts: [{ text: initialResponse }] },
    ...(history || []),
  ];

  const chat = ai.chats.create({
    model: MODEL,
    history: contextHistory,
    config: {
      systemInstruction:
        'Você é um educador financeiro que irá auxiliar o usuário tirando dúvidas a respeito do Insight gerado anteriormente, não fuja do que foi planejado, utilize linguagem clara e objetiva para responder as dúvidas do usuário e responda com no máximo 5 linhas, não utilize Markdown, JSON, ou algum outro formato, APENAS STRING primitiva',
    },
  });

  const response = await chat.sendMessage({ message: prompt });
  const fullHistory = (await chat.getHistory()) as Content[];
  const updatedHistory = fullHistory.slice(2);

  return {
    data: response.text || '',
    updatedHistory,
  };
};

export const getInsight = async (prompt: string) => {
  const chat = ai.chats.create({
    model: MODEL,
    config: {
      responseMimeType: 'application/json',
      systemInstruction: `Você é um educador financeiro especializado em finanças pessoais.
    Analise os dados abaixo e gere um diagnóstico financeiro personalizado com linguagem clara, didática e encorajadora, voltado para pessoas sem conhecimento financiero. O diagnóstico será exibido diretamente ao usuário no app, fale sempre em segunda pessoa ("Você tem...", "sua meta...")`,
    },
  });
  const response = await chat.sendMessage({ message: prompt });
  const updatedHistory = (await chat.getHistory()) as Content[];

  if (response.text) {
    return { data: JSON.parse(response.text) as InsightData, updatedHistory };
  }
  return { data: null, updatedHistory: null };
};
