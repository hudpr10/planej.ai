import type { LucideIcon } from 'lucide-react';

export type CardInfoProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
  variant?: 'default' | 'primary';
};

const variantClasses = {
  default: {
    accent: 'text-primary',
    value: 'text-foreground',
    subtitle: 'text-muted-foreground',
  },
  primary: {
    accent: 'text-primary-foreground',
    value: 'text-primary-foreground',
    subtitle: 'text-primary-foreground/70',
  },
};

const CardInfo = ({ icon: Icon, label, value, subtitle, variant = 'default' }: CardInfoProps) => {
  const styles = variantClasses[variant];

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} className={styles.accent} />
        <span
          className={['text-xs font-semibold tracking-widest uppercase', styles.accent].join(' ')}
        >
          {label}
        </span>
      </div>
      <p className={['text-3xl font-semibold', styles.value].join(' ')}>{value}</p>
      <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>{subtitle}</p>
    </>
  );
};

export default CardInfo;
