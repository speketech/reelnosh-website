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
      className="inline-flex items-center justify-center font-sans text-base font-semibold text-clay dark:text-[#F4C16D] hover:text-clay-hover dark:hover:text-[#F4A11A] underline underline-offset-4 decoration-clay/70 dark:decoration-[#F4C16D]/70 hover:decoration-clay dark:hover:decoration-[#F4C16D] transition-colors shrink-0 cursor-pointer"
    >
      <span>Join the Creator Waitlist</span>
    </button>
  );
};
