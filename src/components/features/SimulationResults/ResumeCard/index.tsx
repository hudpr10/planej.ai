import { CreditCard, HandCoins, Landmark } from 'lucide-react';

import Divider from '@/components/shared/Divider/intex';

import CardInfo from '../CardInfo';

type ResumeCardProps = {
  total: string;
  expenses: string;
  debts: string;
};

const ResumeCard = ({ total, expenses, debts }: ResumeCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <h3 className="mb-8 text-xl font-semibold">Resumo das suas finanças</h3>
      <CardInfo
        icon={HandCoins}
        label="Renda mensal"
        value={total}
        subtitle="Renda total bruta por mês"
      />
      <Divider spacing={20} />
      <CardInfo
        icon={CreditCard}
        label="Custos fixos de vida"
        value={expenses}
        subtitle="Gastos essenciais por mês"
      />
      <Divider spacing={20} />
      <CardInfo
        icon={Landmark}
        label="dívidas / parcelas"
        value={debts}
        subtitle="Valor comprometido em parcelas/depósito"
      />
    </div>
  );
};

export default ResumeCard;
