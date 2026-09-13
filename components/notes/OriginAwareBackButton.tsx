'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const OriginAwareBackButton: React.FC<{ fallbackHref?: string }> = ({
  fallbackHref = '/founders-note',
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window === 'undefined') return;

    const origin = window.sessionStorage.getItem('reelnosh:note-origin');
    const originUrl = window.sessionStorage.getItem('reelnosh:note-origin-url');
    const originScroll = window.sessionStorage.getItem('reelnosh:note-origin-scroll');

    // If user navigated within the site, browser history back cleanly restores exact position
    const isInternalReferrer = !!document.referrer && document.referrer.includes(window.location.host);
    if (window.history.length > 1 && isInternalReferrer) {
      router.back();
      return;
    }

    // Fallback if accessed directly or refreshed
    const target = originUrl || (origin === 'home' ? '/#founders-note' : fallbackHref);
    router.push(target);

    if (originScroll) {
      const scrollY = parseInt(originScroll, 10);
      if (!isNaN(scrollY)) {
        setTimeout(() => {
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }, 150);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back to previous page"
      className="inline-flex items-center gap-1.5 font-sans text-[13px] text-neutral-clayGray hover:text-neutral-charcoal transition-colors cursor-pointer"
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
