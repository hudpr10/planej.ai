import type { InputHTMLAttributes } from 'react';

import Divider from '../Divider/intex';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
}

const Input = ({ prefix, suffix, ...props }: InputProps) => {
  return (
    <div className="bg-input flex grow items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      {prefix && (
        <>
          <span className="text-muted-foreground text-sm font-medium">{prefix}</span>
          <Divider orientation="vertical" />
        </>
      )}
      <input
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        autoFocus
        {...props}
      />
      {suffix && (
        <>
          <Divider orientation="vertical" />
          <span className="text-muted-foreground text-sm font-medium">{suffix}</span>
        </>
      )}
    </div>
  );
};

export default Input;
