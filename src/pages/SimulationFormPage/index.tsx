import SimulationForm from '@/components/features/Simulation/Form';
import PageHero from '@/components/shared/PageHero';

const SimulationFormPage = () => {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <PageHero
        title="Vamos planejar seu futuro"
        subtitle="Responda algumas questões para ter insights financeiros personalizados"
        withIcon
      />
      <SimulationForm />
    </main>
  );
};

export default SimulationFormPage;
