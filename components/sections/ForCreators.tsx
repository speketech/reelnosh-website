'use client';

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTheme } from '@/components/providers/ThemeProvider';

interface ForCreatorsProps {
  onOpenCreatorWaitlist?: () => void;
}

const valueProps = [
  {
    title: 'Turn attention into orders',
    description: 'Give interested people a clearer, direct path to your food.',
  },
  {
    title: 'Sell through Drops',
    description: 'Make specific meals available without managing an endless menu.',
  },
  {
    title: 'Build a business beyond the algorithm',
    description: "Turn the audience you've built into opportunities to sell what you create.",
  },
];

export const ForCreators: React.FC<ForCreatorsProps> = ({ onOpenCreatorWaitlist }) => {
  const { theme } = useTheme();
  return (
    <section id="for-creators" className="scroll-mt-[var(--nav-height)] bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Creator Value Proposition */}
          <div className="lg:col-span-6 space-y-8">
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                FOR CREATORS
              </span>
            </div>

            {/* DESIGN_OVERRIDES §1: Title role , 36px Lora semibold */}
            <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal max-w-[540px]">
              Your food already has an audience. We&apos;re helping turn that interest into orders.
            </h2>

            {/* Value Propositions , Clean single check icon, NOT placed in another circular border */}
            <div className="space-y-6">
              {valueProps.map((item, idx) => (
                <ScrollReveal key={item.title} delay={idx * 80} className="flex items-start gap-4">
                  <img
                    src="/icons/check-icon.svg"
                    alt=""
                    width={28}
                    height={30}
                    className="h-7 w-7 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <strong className="block font-sans text-base font-semibold text-neutral-charcoal">
                      {item.title}
                    </strong>
                    <p className="font-sans text-sm leading-relaxed text-neutral-clayGray max-w-[420px]">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenCreatorWaitlist}
                className="inline-flex h-[52px] w-full sm:w-auto items-center justify-center rounded-brand bg-[#783323] px-8 font-sans text-base font-semibold text-white shadow-elevation1 transition-colors hover:bg-[#63291C] active:bg-[#522217]"
              >
                Join the Creator Waitlist
              </button>
            </div>
          </div>

          {/* Right Column: Responsive Redesigned Creator Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[424px]">
                <img
                  src={theme === 'dark' ? '/images/creator/creator-mockup-dark.svg' : '/images/creator/creator-mockup.svg'}
                  alt="How one post becomes a sold-out Drop: You post, it becomes a Drop, it sells out"
                  width={424}
                  height={486}
                  className="h-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[424px] mx-auto object-contain drop-shadow-sm"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
