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
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay dark:text-[#F4A11A]">
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
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 shrink-0 mt-0.5 text-clay"
                    aria-hidden="true"
                  >
                    <path
                      d="M13.9971 2.5C21.4514 2.5 27.4949 8.54281 27.4951 15.9971C27.4951 23.4515 21.4515 29.4951 13.9971 29.4951C6.54281 29.4949 0.5 23.4514 0.5 15.9971C0.500176 8.54292 6.54292 2.50018 13.9971 2.5Z"
                      stroke="currentColor"
                      className="fill-transparent dark:fill-[#FFF5FA]"
                    />
                    <path
                      d="M19.7107 13.4002L12.712 20.3989C12.6511 20.4601 12.5786 20.5086 12.4989 20.5417C12.4191 20.5749 12.3336 20.5919 12.2473 20.5919C12.1609 20.5919 12.0754 20.5749 11.9957 20.5417C11.9159 20.5086 11.8435 20.4601 11.7825 20.3989L8.72058 17.337C8.65955 17.276 8.61114 17.2035 8.57811 17.1238C8.54508 17.044 8.52808 16.9586 8.52808 16.8722C8.52808 16.7859 8.54508 16.7005 8.57811 16.6207C8.61114 16.541 8.65955 16.4685 8.72058 16.4075C8.78162 16.3464 8.85407 16.298 8.93382 16.265C9.01356 16.232 9.09903 16.215 9.18534 16.215C9.27166 16.215 9.35712 16.232 9.43687 16.265C9.51661 16.298 9.58907 16.3464 9.6501 16.4075L12.2478 19.0052L18.7823 12.4718C18.9056 12.3485 19.0727 12.2793 19.2471 12.2793C19.4214 12.2793 19.5886 12.3485 19.7118 12.4718C19.8351 12.5951 19.9043 12.7622 19.9043 12.9366C19.9043 13.1109 19.8351 13.2781 19.7118 13.4013L19.7107 13.4002Z"
                      fill="currentColor"
                    />
                  </svg>
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
                className="inline-flex h-[52px] w-full sm:w-auto items-center justify-center rounded-brand bg-[#8B3A2A] px-8 font-sans text-base font-semibold text-white shadow-elevation1 transition-colors hover:bg-[#743022] active:bg-[#5F261A]"
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
                  src="/images/creator/creator-mockup.svg"
                  alt="How one post becomes a sold-out Drop: You post, it becomes a Drop, it sells out"
                  width={424}
                  height={486}
                  className="h-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[424px] mx-auto object-contain drop-shadow-sm dark:hidden"
                />
                <img
                  src="/images/creator/creator-mockup-dark.svg"
                  alt="How one post becomes a sold-out Drop: You post, it becomes a Drop, it sells out"
                  width={424}
                  height={486}
                  className="h-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[424px] mx-auto object-contain drop-shadow-sm hidden dark:block"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
