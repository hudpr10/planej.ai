import Card from '@/components/features/SimulationHistory/Card';
import PageHero from '@/components/shared/PageHero';
import useSimulationStorage from '@/hooks/useSimulationStorage';

const SimulationHistoryPage = () => {
  const { getAllFormData } = useSimulationStorage();
  const data = getAllFormData();

  return (
    <main className="mx-auto py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      <ul className="flex flex-col items-center gap-6">
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </ul>
    </main>
  );
};

export default SimulationHistoryPage;
