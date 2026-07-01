import { simulationFormSteps } from '@/data/simulation';

import SimulationFormStep from '../FormStep';
import SimulationProgress from '../Progress';

const SimulationForm = () => {
  const currentStep = simulationFormSteps[5];

  return (
    <>
      <SimulationProgress currentStep={1} totalSteps={6} />
      <SimulationFormStep key={currentStep.id} {...currentStep} />
    </>
  );
};

export default SimulationForm;
