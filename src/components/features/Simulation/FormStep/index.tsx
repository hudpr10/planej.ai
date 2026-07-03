import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/shared/Button';
import Input, { type InputProps } from '@/components/shared/Input';
import { formatCurrencyInput } from '@/utils/currency';

export interface SimulationFormStepProps {
  id: string;
  icon: LucideIcon;
  title: string;
  question: string;
  inputProps: InputProps;
  submitButtonProps?: {
    label: string;
    emojiIcon?: LucideIcon;
  };
}

interface ActionsButtonsProps {
  onBack: () => void;
  onNext: (inputValue: string) => void;
  hideBackButton?: boolean;
}

const SimulationFormStep = ({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  onBack,
  onNext,
  hideBackButton = false,
}: SimulationFormStepProps & ActionsButtonsProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!inputValue) return;
    onNext(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(
      inputProps.prefix === 'R$' ? formatCurrencyInput(e.target.value) : e.target.value,
    );

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">{title}</h2>
      <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
        {question}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input {...inputProps} value={inputValue} onChange={handleInputChange} />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {!hideBackButton && (
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
              icon={ArrowLeft}
            >
              Voltar
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            className="sm:order-2; disabled:bg-muted-primary order-1 flex-1"
            icon={!submitButtonProps?.emojiIcon ? ArrowRight : submitButtonProps.emojiIcon}
            disabled={!inputValue}
          >
            {submitButtonProps?.label ?? 'Próximo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SimulationFormStep;
