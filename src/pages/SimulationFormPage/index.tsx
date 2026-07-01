import SimulationForm from '@/components/features/Simulation/Form';
import SimulationHero from '@/components/features/Simulation/Hero';
import SimulationProgress from '@/components/features/Simulation/Progress';

const SimulationFormPage = () => {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <SimulationHero />
      <SimulationForm />
      <SimulationProgress currentStep={1} totalSteps={6} />
    </main>
  );
};

export default SimulationFormPage;
