import React from 'react';
import { TheGap } from './TheGap';
import { TheDrop } from './TheDrop';

export const HowItWorksWrapper: React.FC = () => {
  return (
    <div id="how-it-works" className="relative scroll-mt-[var(--nav-height)]">
      <TheGap />
      <TheDrop />
    </div>
  );
};
