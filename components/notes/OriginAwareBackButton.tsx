'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const OriginAwareBackButton: React.FC<{ fallbackHref?: string }> = ({
  fallbackHref = '/founders-note',
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-neutral-clayGray hover:text-neutral-charcoal transition-colors cursor-pointer"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9.99349 11.9919L5.99609 7.99447L9.99349 3.99707"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Back</span>
    </button>
  );
};
