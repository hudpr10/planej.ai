import { CalendarCheck, Goal, PiggyBank } from 'lucide-react';
import { useParams } from 'react-router-dom';

import AIInsightCard from '@/components/features/SimulationResults/AIInsightCard';
import Card from '@/components/features/SimulationResults/Card';
import ResumeCard from '@/components/features/SimulationResults/ResumeCard';
import PageHero from '@/components/shared/PageHero';
import useSimulationStorage from '@/hooks/useSimulationStorage';
import { calcMonthlySavings } from '@/utils/simulation';

import NotFoundPage from '../NotFoundPage';

const SimulationResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getFormData } = useSimulationStorage();

  const data = id ? getFormData(id) : null;

  if (!data) {
    return <NotFoundPage />;
  }

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
        <AIInsightCard simulationId={data.id} />
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <ResumeCard total={data.income} expenses={data.expenses} debts={data.debts} />
        </div>
      </div>
    </main>
  );
};

export default SimulationResultsPage;
