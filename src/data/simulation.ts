import {
  CalendarCheck,
  CreditCard,
  Goal,
  Landmark,
  PiggyBank,
  Sparkles,
  Wallet,
} from 'lucide-react';

import type { SimulationFormStepProps } from '@/components/features/Simulation/FormStep';

export const simulationFormSteps = [
  {
    id: 'income',
    icon: PiggyBank,
    title: 'Renda mensal bruta',
    question: 'Quanto é depositado na sua conta todo mês (somando todas as fontes)',
    inputProps: {
      placeholder: 'ex: 5.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'expenses',
    icon: CreditCard,
    title: 'Custos fixos de vida',
    question: 'Quanto você gasta mensalmente com custos fixos (aluguel, contas, etc)?',
    inputProps: {
      placeholder: 'ex: 2.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'debts',
    icon: Landmark,
    title: 'Dívidas / parcelas',
    question: 'Você tem algum valor comprometido com parcelas ou empréstimos mensalmente?',
    inputProps: {
      placeholder: 'ex: 500,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalName',
    icon: Goal,
    title: 'Nome da meta',
    question: 'Qual o objetivo que você deseja alcançar?',
    inputProps: {
      placeholder: 'ex: Viagem para o Japão',
      maxLength: 50,
    },
  },
  {
    id: 'goalAmount',
    icon: Wallet,
    title: 'Custo da meta',
    question: 'Quanto custa realizar esse sonho?',
    inputProps: {
      placeholder: 'ex: 15.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalDeadline',
    icon: CalendarCheck,
    title: 'Prazo desejado',
    question: 'Em quantos meses você planeja atingir esse objetivo?',
    inputProps: {
      type: 'number',
      placeholder: 'ex: 12',
      suffix: 'meses',
      min: 1,
      maxLength: 120,
    },
    submitButtonProps: {
      label: 'Gerar simulação',
      emojiIcon: Sparkles,
    },
  },
] satisfies SimulationFormStepProps[];
// Pega o Valor de Cada ID: ['income', 'debts', ...]. Evita que seja uma string genérica

// Monta a estrutura do objeto com chave e valor
// income: string;
export type SimulationFormData = Record<(typeof simulationFormSteps)[number]['id'], string>;

export type SimulationRecord = SimulationFormData & { id: string };
