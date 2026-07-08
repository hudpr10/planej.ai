import { useState } from 'react';

import Card from '@/components/features/SimulationHistory/Card';
import PageHero from '@/components/shared/PageHero';
import { type SimulationRecord } from '@/data/simulation';
import useSimulationStorage from '@/hooks/useSimulationStorage';

const SimulationHistoryPage = () => {
  const { getAllFormData, excludeFormData } = useSimulationStorage();
  const [data, setData] = useState<SimulationRecord[]>(getAllFormData);

  const handleExclude = (id: string) => {
    const updatedData = excludeFormData(id);
    setData(updatedData);
  };

  return (
    <main className="mx-auto py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      {data.length >= 1 ? (
        <ul className="flex flex-col items-center gap-6">
          {data?.map((item) => (
            <Card key={item.id} data={item} onDelete={() => handleExclude(item.id)} />
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground text-center">
          <p className="font-semibold">🤔 Nenhum dado foi encontrado.</p>
          <p>Tente realizar alguma simulação.</p>
        </div>
      )}
    </main>
  );
};

export default SimulationHistoryPage;
