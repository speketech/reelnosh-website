import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const TheDrop: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'A Drop goes live',
      description: 'Meal details, price, and portions are announced.',
    },
    {
      number: '2',
      title: 'Order your servings',
      description: 'Reserve one or more portions in a few taps.',
    },
    {
      number: '3',
      title: 'We confirm details',
      description: 'Order details and delivery timing are locked in.',
    },
    {
      number: '4',
      title: 'The Drop closes',
      description: 'Orders close when sold out or window ends.',
    },
  ];

  return (
    <section id="the-drop" className="scroll-mt-[var(--nav-height)] bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-0">
        
        {/* Header Row */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                THE DROP
              </span>
            </div>

            {/* DESIGN_OVERRIDES §1: Title role — 36px Lora semibold */}
            <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal">
              Food content becomes a real experience in four steps.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <p className="font-sans text-sm sm:text-base text-neutral-clayGray leading-relaxed max-w-md ml-auto">
              A Reelnosh Drop brings a creator&apos;s meal to interested diners through a small, defined experience.
            </p>
          </div>
        </div>

        {/* Contained Panel — 1120px width, min-h-[340px], radius 24 (rounded-[24px]), fill Soft Cream (#F7F3ED), Elevation 1 shadow */}
        <div className="relative overflow-hidden rounded-[24px] border border-neutral-lightClay/70 bg-[#F7F3ED] p-8 shadow-elevation1 sm:p-12">
          
          {/* Steps Timeline Grid */}
          <div className="relative">
            {/* Desktop continuous straight 3px Clay line behind circles */}
            <div className="absolute top-6 left-12 right-12 hidden h-[3px] bg-clay/90 lg:block z-0" />

            <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((step, idx) => (
                <ScrollReveal
                  key={step.number}
                  delay={idx * 80}
                  className="relative flex flex-col items-start"
                >
                  {/* Circle Header & Chevron Line Container */}
                  <div className="relative flex w-full items-center mb-5">
                    {/* 48px Filled-Clay Circle, white 18px numeral */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay font-sans text-[18px] font-semibold text-white shadow-sm ring-4 ring-[#F7F3ED]">
                      {step.number}
                    </div>

                    {/* Directional Chevron past circles 1, 2, 3 on desktop */}
                    {idx < 3 && (
                      <div className="absolute left-[70px] hidden items-center lg:flex">
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 12 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-clay"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 2L8 7L2 12"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Step Title — Figtree SemiBold 20px */}
                  <h3 className="mb-2 font-sans text-[20px] font-semibold leading-snug text-neutral-charcoal">
                    {step.title}
                  </h3>

                  {/* Description — Figtree 14px, clamped to 220px width across all four */}
                  <p className="max-w-[220px] font-sans text-[14px] leading-relaxed text-neutral-clayGray">
                    {step.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Closing italic line — Lora Quote 24px italic, Clay, centered near the panel's bottom */}
          <div className="relative z-10 mt-12 border-t border-neutral-lightClay/80 pt-6 text-center">
            <p className="font-serif text-[20px] sm:text-[24px] italic text-clay">
              &ldquo;A limited meal from a creator, made available to you.&rdquo;
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
