import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isValid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, isValid, id, ...props }, ref) => {
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
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full px-4 py-2.5 bg-neutral-softCream border rounded-brand text-sm text-neutral-charcoal placeholder:text-neutral-clayGray/75 dark:placeholder:text-neutral-clayGray/80 transition-colors duration-200 focus:outline-none focus:border-focusRing focus:ring-1 focus:ring-focusRing disabled:bg-interaction-disabledBackground disabled:text-interaction-disabledText ${
              error ? 'border-feedback-error' : isValid ? 'border-feedback-success pr-10' : 'border-neutral-lightClay'
            } ${className}`}
            {...props}
          />
          {isValid && !error && (
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-surface-successTint text-feedback-success text-xs font-bold transition-opacity duration-200"
              aria-label="Valid input"
            >
              ✓
            </span>
          )}
        </div>
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
