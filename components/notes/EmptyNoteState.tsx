import React from 'react';
import { SITE_CONFIG } from '@/lib/constants';

interface EmptyNoteStateProps {
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export const EmptyNoteState: React.FC<EmptyNoteStateProps> = ({
  onAction,
  actionHref = SITE_CONFIG.links.whatsapp,
  className = '',
}) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-[620px] rounded-[24px] sm:rounded-[32px] border border-neutral-lightClay/80 bg-neutral-softCream dark:border-neutral-lightClay/80 dark:bg-[#241E1C] px-6 py-10 sm:px-12 sm:py-14 text-center shadow-elevation1 transition-colors duration-200 ${className}`}
    >
      {/* 1. Squircle Badge with Book / Journal Icon (White in light mode, soft blush in dark mode) */}
      <div className="mx-auto mb-6 flex h-[60px] w-[60px] sm:h-[64px] sm:w-[64px] items-center justify-center rounded-[18px] sm:rounded-[20px] bg-white dark:bg-[#FAF0EC] shadow-xs transition-colors">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8A3826"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Notebook outer contour */}
          <rect x="4" y="3" width="16" height="18" rx="2.5" />
          {/* Notebook spine */}
          <line x1="8.5" y1="3" x2="8.5" y2="21" />
          {/* Note content lines */}
          <line x1="12" y1="9.5" x2="16.5" y2="9.5" />
          <line x1="12" y1="13.5" x2="16.5" y2="13.5" />
        </svg>
      </div>

      {/* 2. Headline */}
      <h3 className="font-serif text-[26px] sm:text-[32px] font-semibold leading-[1.2] text-neutral-charcoal dark:text-[#FFF8F5] tracking-tight mb-3">
        Notes are on the way.
      </h3>

      {/* 3. Description */}
      <p className="font-sans text-[14px] sm:text-[15.5px] leading-[1.6] text-neutral-clayGray dark:text-[#C4B5AE] max-w-[460px] mx-auto mb-8">
        Kudirat shares candid updates about what we&apos;re learning, the Lagos food scene, and the decisions behind Reelnosh. The first note will be published soon.
      </p>

      {/* 4. Action Button */}
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center rounded-[12px] sm:rounded-[14px] bg-[#8B3A2A] px-7 py-3.5 font-sans text-[15px] font-semibold text-[#FFFDFB] shadow-sm transition-all duration-200 hover:bg-[#743022] active:bg-[#5A2418] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D79A8A] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#241E1C]"
        >
          Join the Reelnosh Community
        </button>
      ) : (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-[12px] sm:rounded-[14px] bg-[#8B3A2A] px-7 py-3.5 font-sans text-[15px] font-semibold text-[#FFFDFB] shadow-sm transition-all duration-200 hover:bg-[#743022] active:bg-[#5A2418] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D79A8A] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#241E1C]"
        >
          Join the Reelnosh Community
        </a>
      )}
    </div>
  );
};
