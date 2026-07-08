import { Rocket } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/features/SimulationHistory/Card';
import Button from '@/components/shared/Button';
import PageHero from '@/components/shared/PageHero';
import { type SimulationRecord } from '@/data/simulation';
import useSimulationStorage from '@/hooks/useSimulationStorage';

const SimulationHistoryPage = () => {
  const { getAllFormData, excludeFormData } = useSimulationStorage();
  const [data, setData] = useState<SimulationRecord[]>(getAllFormData);
  const navigate = useNavigate();

  const handleExclude = (id: string) => {
    const updatedData = excludeFormData(id);
    setData(updatedData);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      {data.length >= 1 ? (
        <ul className="flex flex-col gap-6">
          {data?.map((item) => (
            <Card key={item.id} data={item} onDelete={() => handleExclude(item.id)} />
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <h2 className="font-semibold">🤔 Histórico de simulações vazio.</h2>
          <p>Realize novas simulações!</p>
          <Button icon={Rocket} onClick={() => void navigate('/')}>
            Nova Simulação
          </Button>
        </div>
      )}
    </main>
  );
};

export default SimulationHistoryPage;
