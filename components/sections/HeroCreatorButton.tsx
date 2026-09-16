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
      className="inline-flex items-center justify-center font-sans text-base font-semibold text-clay hover:text-clay-hover active:text-clay-pressed underline underline-offset-4 decoration-clay/70 hover:decoration-clay hover:decoration-2 hover:underline-offset-2 dark:text-accent-spicePop dark:decoration-accent-spicePop/70 hover:dark:text-[#F6B242] hover:dark:decoration-[#F6B242] hover:dark:decoration-2 hover:dark:underline-offset-2 dark:active:text-[#D98A0F] transition-all duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 dark:focus-visible:ring-accent-spicePop/60 focus-visible:ring-offset-2 rounded-xs"
    >
      <span>Join the Creator Waitlist</span>
    </button>
  );
};
