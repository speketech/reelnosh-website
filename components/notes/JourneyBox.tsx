'use client';

import React from 'react';

interface JourneyBoxProps {
  content: string;
  title?: string;
}

export function JourneyBox({ content, title = 'The Commerce Loop' }: JourneyBoxProps) {
  const trimmed = content.trim();

  // If mermaid flowchart/graph syntax is passed, extract the node texts in order
  let steps: string[] = [];
  if (/^(graph|flowchart)\s+/i.test(trimmed)) {
    const matches = Array.from(trimmed.matchAll(/\[(.*?)\]/g)).map((m) => m[1].trim());
    steps = Array.from(new Set(matches)).filter(Boolean);
  } else {
    steps = trimmed
      .split(/\n|->|-->/)
      .map((line) => line.trim())
      .filter((line) => line && !/^(graph|flowchart)\s+/i.test(line))
      .map((line) =>
        line
          .replace(/^(\d+[\.\)]|\-|\*)\s*/, '')
          .replace(/^[A-Za-z]\s*\[(.*?)\]$/, '$1')
          .replace(/^\*\*(.*?)\*\*\s*[:\-–]?\s*/, '$1: ')
          .trim()
      )
      .filter(Boolean);
  }

  // Fallback: If no discrete steps were found, display as a styled editorial callout box
  if (steps.length === 0) {
    return (
      <div className="my-8 rounded-[16px] border border-neutral-lightClay bg-neutral-softCream/70 p-6 sm:p-8 dark:border-[#42312A] dark:bg-[#231814] shadow-xs">
        <p className="font-sans text-base leading-relaxed text-neutral-charcoal dark:text-[#EAE2DC]">
          {content}
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 sm:my-10 overflow-hidden rounded-[16px] border border-neutral-lightClay bg-neutral-softCream/80 p-5 sm:p-7 md:p-8 dark:border-[#42312A] dark:bg-[#231814] shadow-xs transition-colors">
      {/* Box Header */}
      <div className="mb-5 sm:mb-6 flex items-center justify-between border-b border-neutral-lightClay/60 pb-3.5 dark:border-[#382822]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-spicePop" aria-hidden="true" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-clay dark:text-[#E07A5F]">
            {title}
          </span>
        </div>
        <span className="font-sans text-[11px] font-medium text-neutral-clayGray dark:text-[#A89A90]">
          {steps.length} Steps
        </span>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group relative flex items-start gap-3 rounded-[12px] border border-neutral-lightClay/60 bg-neutral-warmWhite/95 p-3.5 sm:p-4 transition-all duration-150 hover:border-clay/40 hover:shadow-xs dark:border-[#4A352E]/70 dark:bg-[#2B1E19] dark:hover:border-[#E07A5F]/40"
          >
            {/* Step Number Badge */}
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay/10 font-sans text-xs font-bold text-clay dark:bg-[#E07A5F]/15 dark:text-[#E07A5F]">
              {idx + 1}
            </span>

            {/* Step Content */}
            <span className="font-sans text-[14px] sm:text-[15px] font-medium leading-snug text-neutral-charcoal dark:text-[#EFE9E4] pt-0.5">
              {step}
            </span>

            {/* Directional arrow between cards on desktop */}
            {idx < steps.length - 1 && (idx + 1) % 3 !== 0 && (
              <span
                className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-4 w-4 items-center justify-center rounded-full bg-neutral-warmWhite border border-neutral-lightClay/60 text-clay text-[10px] dark:bg-[#231814] dark:border-[#42312A] dark:text-[#E07A5F] pointer-events-none"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
