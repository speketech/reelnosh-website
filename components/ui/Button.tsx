import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-semibold rounded-brand transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing disabled:pointer-events-none disabled:bg-interaction-disabledBackground disabled:text-interaction-disabledText';

    const variants = {
      primary: 'bg-clay text-white hover:bg-clay-hover active:bg-clay-pressed shadow-elevation1',
      secondary:
        'bg-transparent border border-secondaryCta-border text-clay hover:bg-secondaryCta-hoverBackground active:bg-[#F3ECE8]',
      ghost: 'bg-transparent text-clay hover:bg-secondaryCta-hoverBackground',
      white: 'bg-white text-clay hover:bg-neutral-softCream shadow-elevation1',
    };

    const sizes = {
      sm: 'text-[13px] px-3.5 py-1.5',
      md: 'text-[15px] px-5 py-2.5',
      lg: 'text-base px-7 py-3.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Please wait...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
