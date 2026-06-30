import PiggyBankImage from '@/assets/images/piggy-bank.png';

const SimulationHero = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <h1 className="text-foreground sm:texto-4xl text-3xl font-semibold">
          Vamos planejar seu futuro
        </h1>
        <img src={PiggyBankImage} alt="" aria-hidden="true" className="my-2 h-16 w-16 sm:ml-3" />
      </div>
      <p className="text-muted-foreground text-sm">
        Responda algumas questões para ter insights financeiros personalizados
      </p>
    </div>
  );
};

export default SimulationHero;
