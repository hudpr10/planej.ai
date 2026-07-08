import { useNavigate } from 'react-router-dom';

import Button from '@/components/shared/Button';
import PageHero from '@/components/shared/PageHero';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center py-10 sm:py-14">
      <PageHero
        title="Ops! Página não encontrada."
        subtitle="O link que você tentou acessar não existe ou foi movido."
      />
      <Button onClick={() => void navigate('/')}>Voltar a navegação</Button>
    </main>
  );
};

export default NotFoundPage;
