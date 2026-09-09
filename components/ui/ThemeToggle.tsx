'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-brand text-neutral-charcoal hover:text-clay hover:bg-neutral-softCream transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing ${className}`}
    >
      {/* Sun Icon: visible in dark mode, clicking switches to light */}
      <svg
        className={`absolute h-5 w-5 transition-opacity duration-300 ${mounted && theme === 'dark' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon Icon: visible in light mode (and before mounted to avoid FOUC), clicking switches to dark */}
      <svg
        className={`absolute h-5 w-5 transition-opacity duration-300 ${mounted && theme === 'dark' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
};
