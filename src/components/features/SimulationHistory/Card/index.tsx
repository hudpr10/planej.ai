import { ExternalLink, Goal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/shared/Button';
import Divider from '@/components/shared/Divider/intex';
import type { SimulationRecord } from '@/data/simulation';
import useSimulationStorage from '@/hooks/useSimulationStorage';
import { calcMonthlySavings } from '@/utils/simulation';

const CardData = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex w-47.5 flex-col font-semibold">
      <span className="text-muted-foreground text-xs uppercase">{title}</span>
      <span className="text-foreground text-base">{value}</span>
    </div>
  );
};

const Card = ({ data }: { data: SimulationRecord }) => {
  const navigate = useNavigate();
  const handleNavigate = () => void navigate(`/resultado/${data.id}`);

  const { excludeFormData } = useSimulationStorage();

  const monthlySavings = calcMonthlySavings(data);

  return (
    <li className="bg-card flex w-310 items-center gap-8 rounded-2xl p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="bg-primary/30 rounded-xl p-2">
        <Goal size={24} className="text-primary" />
      </div>

      <div className="flex w-47.5 flex-col">
        <span className="text-foreground truncate overflow-hidden text-base font-semibold">
          {data.goalName}
        </span>
        <span className="text-muted-foreground text-sm">{new Date().toLocaleDateString()}</span>
      </div>

      <CardData title="Custo da Meta" value={`R$ ${data.goalAmount}`} />

      <CardData title="Prazo" value={`${data.goalDeadline} meses`} />

      <CardData
        title="economia mensal"
        value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
      />

      <Divider orientation="vertical" spacing={0} />

      <Button variant="ghost" onClick={() => excludeFormData(data.id)}>
        <Trash2 className="text-red-500" />
      </Button>

      <Button
        variant="secondary"
        className="whitespace-nowrap"
        icon={ExternalLink}
        onClick={handleNavigate}
      >
        Ver detalhes
      </Button>
    </li>
  );
};

export default Card;
