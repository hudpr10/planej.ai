import CardInfo, { type CardInfoProps } from '../CardInfo';

const Card = ({ icon, label, value, subtitle, variant }: CardInfoProps) => {
  return (
    <div
      className={[
        'rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]',
        variant === 'primary' ? 'bg-primary' : 'bg-card',
      ].join(' ')}
    >
      <CardInfo icon={icon} label={label} value={value} subtitle={subtitle} variant={variant} />
    </div>
  );
};

export default Card;
