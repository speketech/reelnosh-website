import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-[1.2px] text-neutral-charcoal"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 bg-neutral-softCream border rounded-brand text-sm text-neutral-charcoal placeholder:text-neutral-clayGray/60 transition-colors duration-200 focus:outline-none focus:border-focusRing focus:ring-1 focus:ring-focusRing disabled:bg-interaction-disabledBackground disabled:text-interaction-disabledText ${
            error ? 'border-feedback-error' : 'border-neutral-lightClay'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-feedback-error font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-clayGray">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
