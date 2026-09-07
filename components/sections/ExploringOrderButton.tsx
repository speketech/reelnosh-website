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
        className={`w-full h-[46px] px-5 text-sm font-semibold rounded-brand border transition-colors flex items-center justify-center ${
          isInterested
            ? 'bg-surface-successTint border-feedback-success text-feedback-success cursor-default'
            : 'bg-white border-secondaryCta-border text-clay hover:bg-secondaryCta-hoverBackground'
        }`}
      >
        {isInterested ? (
          <span className="inline-flex items-center justify-center gap-1.5">
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

      <p className="font-sans text-[12px] text-neutral-clayGray text-center mt-2">
        Tap to show interest, no payment, no obligation.
      </p>
    </div>
  );
};
