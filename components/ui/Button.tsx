import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold text-ui-button transition-colors duration-300 rounded-pill focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing focus-visible:ring-offset-2 disabled:bg-lightClay disabled:text-[#9A948C] disabled:cursor-not-allowed cursor-pointer";

    const variantStyles = {
      primary: "bg-clay text-warmWhite hover:bg-clay-hover active:bg-clay-pressed",
      secondary: "bg-softCream text-charcoal hover:bg-lightClay active:bg-[#D9CFC4]",
      outline: "border border-lightClay text-charcoal bg-transparent hover:bg-softCream active:bg-lightClay",
      ghost: "text-clay bg-transparent hover:bg-softCream active:bg-lightClay",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-[13px] leading-tight",
      md: "px-6 py-3 text-ui-button",
      lg: "px-8 py-4 text-[16px] leading-tight",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
