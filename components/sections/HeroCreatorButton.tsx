'use client';

import React from 'react';

export const HeroCreatorButton: React.FC = () => {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-creator-modal'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center font-sans text-base font-semibold text-clay hover:text-clay-hover underline underline-offset-4 decoration-clay/70 hover:decoration-clay dark:text-seasonal-palmCream dark:decoration-seasonal-palmCream transition-colors shrink-0 cursor-pointer"
    >
      <span>Join the Creator Waitlist</span>
    </button>
  );
};
