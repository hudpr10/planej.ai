import { PiggyBank } from 'lucide-react';

import SimulationFormStep from '../FormStep';
import SimulationProgress from '../Progress';

const SimulationForm = () => {
  return (
    <form>
      <SimulationProgress currentStep={1} totalSteps={6} />
      <SimulationFormStep
        icon={PiggyBank}
        title="Renda mensal bruta"
        question="Quanto é depositado na sua conta todo mês (somando todas as fontes)"
        inputProps={{ prefix: 'R$', type: 'text', placeholder: 'ex: 5.000,00' }}
      />
    </form>
  );
};

export default SimulationForm;
