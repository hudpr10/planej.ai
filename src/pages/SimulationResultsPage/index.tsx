import { CalendarCheck, Goal, PiggyBank } from 'lucide-react';

import Card from '@/components/features/SimulationResults/Card';
import ResumeCard from '@/components/features/SimulationResults/ResumeCard';
import PageHero from '@/components/shared/PageHero';
import type { SimulationFormData } from '@/data/simulation';
import { calcMonthlySavings } from '@/utils/simulation';

const mock: SimulationFormData = {
  income: 'R$ 5.000,00',
  expenses: 'R$ 5.000,00',
  debts: 'R$ 5.000,00',
  goalName: 'Viagem para o Japão',
  goalAmount: 'R$ 5.000,00',
  goalDeadline: '12',
};

const SimulationResultsPage = () => {
  const data: SimulationFormData = mock;
  const monthlySavings: number = calcMonthlySavings(data);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Resultado da Simulação"
        subtitle="Com base no seu perfil financeiro e objetivos"
      />
      <div className="order-2 mb-6 grid grid-cols-1 gap-4 lg:order-1 lg:grid-cols-3">
        <Card icon={Goal} label="Custo da Meta" value={data.goalAmount} subtitle={data.goalName} />
        <Card
          icon={CalendarCheck}
          label="Prazo"
          value={`${data?.goalDeadline} meses`}
          subtitle={'Prazo para atingir a meta'}
        />
        <Card
          icon={PiggyBank}
          label="Economia mensal"
          value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          subtitle="Economia mensal necessária"
          variant="primary"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
          Painel de Insights
        </div>
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <ResumeCard total={data.income} expenses={data.expenses} debts={data.debts} />
        </div>
      </div>
    </main>
  );
};

export default SimulationResultsPage;
