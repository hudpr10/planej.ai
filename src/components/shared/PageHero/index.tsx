import PiggyBankImage from '@/assets/images/piggy-bank.png';

type PageHeroProps = {
  title: string;
  subtitle: string;
  withIcon?: boolean;
};

const PageHero = ({ title, subtitle, withIcon = false }: PageHeroProps) => {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <h1 className="text-foreground sm:texto-4xl text-3xl font-semibold">{title}</h1>
        {withIcon && (
          <img
            src={PiggyBankImage}
            alt="Icone Porquinho Financeiro"
            aria-hidden="true"
            className="my-2 h-16 w-16 sm:ml-3"
          />
        )}
      </div>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
};

export default PageHero;
