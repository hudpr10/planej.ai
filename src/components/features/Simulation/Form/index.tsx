import { useState } from 'react';

import { simulationFormSteps } from '@/data/simulation';

import SimulationFormStep from '../FormStep';
import SimulationProgress from '../Progress';

const SimulationForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = simulationFormSteps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex + 1 > simulationFormSteps.length - 1) return;
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <SimulationProgress
        currentStep={currentStepIndex + 1}
        totalSteps={simulationFormSteps.length}
      />
      <SimulationFormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
      />
    </>
  );
};

export default SimulationForm;
