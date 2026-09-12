'use client';

import React, { useState } from 'react';

interface ExploringOrderButtonProps {
  mealId: string;
  mealTitle: string;
}

export const ExploringOrderButton: React.FC<ExploringOrderButtonProps> = ({
  mealId,
  mealTitle,
}) => {
  const [isInterested, setIsInterested] = useState(false);

  const handleOrderTap = () => {
    setIsInterested(true);

    // Decoupled non-blocking POST to /api/interest-tap
    try {
      fetch('/api/interest-tap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meal_id: mealId }),
      }).catch((err) => console.warn('Interest tap background error:', err));
    } catch (err) {
      console.warn('Interest tap dispatch error:', err);
    }

    // Trigger detail modal via window event
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('open-detail-modal', {
            detail: { mealId, mealTitle },
          })
        );
      }
    }, 750);
  };

  return (
    <div className="pt-4 mt-auto">
      <button
        type="button"
        onClick={handleOrderTap}
        disabled={isInterested}
        aria-label={isInterested ? `Registered interest in ${mealTitle}` : `I'd order this - ${mealTitle}`}
        aria-pressed={isInterested}
        className={`w-full h-[46px] px-5 text-sm font-semibold rounded-brand border transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1E1B18] ${isInterested
            ? 'bg-surface-successTint border-feedback-success text-feedback-success dark:bg-[#1A2A15] dark:border-[#9BC47E] dark:text-[#9BC47E] cursor-default'
            : 'bg-transparent border-[#D8B2A8] text-[#743022] hover:bg-secondaryCta-hoverBackground dark:bg-transparent dark:border-[#D79A8A] dark:text-[#FFF5FA] dark:hover:bg-[#342620] dark:hover:text-white dark:hover:border-[#F4C16D] active:scale-[0.99]'
          }`}
      >
        {isInterested ? (
          <span className="inline-flex items-center justify-center gap-1.5 font-medium">
            <span>Interested</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-opacity duration-300 opacity-100"
              aria-hidden="true"
            >
              <path
                d="M3 8l3.5 3.5L13 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          "I'd order this"
        )}
      </button>

      <p className="font-sans text-[12px] text-neutral-clayGray dark:text-[#B9ADA4] text-center mt-2">
        Tap to show interest, no payment, no obligation.
      </p>
    </div>
  );
};
