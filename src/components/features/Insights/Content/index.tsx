import 'react-loading-skeleton/dist/skeleton.css';

import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useChat } from '@/hooks/useChat';
import type { InsightData } from '@/services/aiService';

import IATalk from '../IATalk';

type ContentProps = {
  simulationId: string;
  insight: InsightData;
};

const Paragraph = ({ children }: React.PropsWithChildren) => {
  return <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>;
};

const SectionTitle = ({ children }: React.PropsWithChildren) => {
  return (
    <h3 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
      {children}
    </h3>
  );
};

const OrderedList = ({ items }: { items: string[] }) => {
  return (
    <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
      {items.map((item, index) => (
        <li className="pl-1" key={index}>
          {item}
        </li>
      ))}
    </ol>
  );
};

const statusStyles = {
  viable: {
    label: 'Meta viável no prazo',
    className: 'bg-green/40 text-green',
  },
  needs_adjustment: {
    label: 'Ajuste necessário',
    className: 'bg-yellow/20 text-yellow',
  },
  unfeasible: {
    label: 'Meta inviável no prazo',
    className: 'bg-red/40 text-red',
  },
};

const Content = ({ simulationId, insight }: ContentProps) => {
  const status = statusStyles[insight.feasibility.status] ?? null;
  const [inputValue, setInputValue] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const { sendMessage, messages, isSending } = useChat(simulationId);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setInputValue('');

    if (inputValue === '') return;
    sendMessage(inputValue);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 50); // 50ms é o suficiente para o DOM se atualizar
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  return (
    <>
      <div
        ref={containerRef}
        className="lg:max-h-81.5 lg:scrollbar-thin lg:[scrollbar-color:var(--border)_transparent] lg:overflow-y-auto lg:pr-2"
      >
        <section className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-2 sm:flex-row">
            <span className="text-foreground text-sm font-semibold">🎯 Viabilidade da Meta</span>
            {status && (
              <span
                className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
            )}
          </div>
          <Paragraph>{insight.feasibility.content}</Paragraph>
        </section>

        <section>
          <SectionTitle>💰 Diagnóstico Financeiro</SectionTitle>
          <Paragraph>{insight.diagnosis.content}</Paragraph>
        </section>

        <section>
          <SectionTitle>💡 Como Aumentar sua Renda</SectionTitle>
          <OrderedList items={insight.extraIncome.items} />
        </section>

        <section>
          <SectionTitle>🏦 Sugestões de Investimento</SectionTitle>
          <OrderedList items={insight.investment.items} />
        </section>

        <section className="mb-5">
          <SectionTitle>🚀 Mensagem Final</SectionTitle>
          <Paragraph>{insight.motivation.content}</Paragraph>
        </section>

        <IATalk messages={messages} />
        {isSending && (
          <Skeleton
            count={3.5}
            baseColor="var(--color-skeleton-base)" // Cores
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg" // Classes de estilização
            containerClassName="flex-1" // Ocupa todo o componente
            inline
          />
        )}
      </div>

      <form className="bottom-4 mt-3 flex gap-3" onSubmit={handleSubmit}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Quais são os investimentos mais seguros para aumentar minha renda?"
          disabled={isSending}
        />
        <Button
          icon={Send}
          disabled={isSending}
          className="flex w-14 items-center justify-center"
          type="submit"
        ></Button>
      </form>
    </>
  );
};

export default Content;
