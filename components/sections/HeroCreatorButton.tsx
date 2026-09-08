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
      className="group inline-flex items-center justify-center gap-1.5 font-sans text-sm font-medium text-clay hover:underline transition-colors shrink-0"
    >
      <span>Join Creator Waitlist</span>
      <img src="/icons/forward-arrow.svg" alt="" aria-hidden="true" width={16} height={16} className="h-4 w-4" />
    </button>
  );
};
