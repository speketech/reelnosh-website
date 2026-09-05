import React from 'react';
import { TheGap } from './TheGap';
import { TheDrop } from './TheDrop';

export const HowItWorksWrapper: React.FC = () => {
  return (
    <div id="how-it-works" className="relative scroll-mt-[var(--nav-height)]">
      {/* Sticky vertical rail label in the left gutter (x=24 outside 80px content margin) */}
      <div className="pointer-events-none absolute left-3 top-0 bottom-0 hidden w-10 lg:block 2xl:left-8 z-30">
        <div className="sticky top-32 flex flex-col items-center gap-3">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-[11px] font-bold uppercase tracking-[2.5px] text-clay select-none">
            HOW IT WORKS
          </span>
          <div className="h-10 w-[1.5px] bg-clay/30" />
        </div>
      </div>

      {/* 1. The Gap Section with sub-label at vertical midpoint */}
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 hidden lg:block 2xl:left-8 z-20">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-[10px] font-semibold uppercase tracking-[1.5px] text-neutral-clayGray/70 select-none">
            THE GAP
          </span>
        </div>
        <TheGap />
      </div>

      {/* 2. The Drop Section with sub-label at vertical midpoint */}
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 hidden lg:block 2xl:left-8 z-20">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-[10px] font-semibold uppercase tracking-[1.5px] text-neutral-clayGray/70 select-none">
            THE DROP
          </span>
        </div>
        <TheDrop />
      </div>
    </div>
  );
};
