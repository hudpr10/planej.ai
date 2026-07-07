import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type SimulationFormData, simulationFormSteps } from '@/data/simulation';
import useSimulationStorage from '@/hooks/useSimulationStorage';

import SimulationFormStep from '../FormStep';
import SimulationProgress from '../Progress';

const SimulationForm = () => {
  const { saveFormData } = useSimulationStorage();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData);
  const currentStep = simulationFormSteps[currentStepIndex];

  const handleNextStep = (inputValue: string) => {
    const updatedFormData = { ...formData, [currentStep.id]: inputValue };
    setFormData(updatedFormData);

    if (currentStepIndex + 1 > simulationFormSteps.length - 1) {
      const id = saveFormData(updatedFormData);
      void navigate(`/resultado/${id}`);
      return;
    }

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
