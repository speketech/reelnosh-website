import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const TheGap: React.FC = () => {
  const bubbles = [
    {
      id: 'b1',
      number: '1',
      text: 'I need this.',
      timestamp: '2m ago',
      positionClasses: 'top-8 sm:top-10 left-4 sm:left-10',
      rotation: '-rotate-2',
      widthClass: 'w-[260px]',
    },
    {
      id: 'b2',
      number: '2',
      text: 'How much?',
      timestamp: '14m ago',
      positionClasses: 'top-[175px] left-16 sm:left-[140px]',
      rotation: 'rotate-[1.5deg]',
      widthClass: 'w-[220px]',
    },
    {
      id: 'b3',
      number: '3',
      text: 'Can I order?',
      timestamp: '1h ago',
      positionClasses: 'top-[310px] left-6 sm:left-[60px]',
      rotation: '-rotate-1',
      widthClass: 'w-[260px]',
    },
  ];

  return (
    <section className="bg-[#F7F3ED] py-16 md:py-[120px]">
      <div className="mx-auto flex h-full max-w-[1120px] items-center px-5 md:px-0">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Problem Statement */}
          <div className="max-w-[550px] lg:col-span-6">
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                THE GAP
              </span>
            </div>

            {/* DESIGN_OVERRIDES §1: Title role , 36px Lora semibold, max-width 600 */}
            <h2 className="mb-5 font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal max-w-[600px]">
              Great food should not end in the comments.
            </h2>

            {/* Body paragraph , Figtree Body 16px, max-width 550 */}
            <p className="font-sans text-base text-neutral-clayGray leading-relaxed mb-6 max-w-[550px]">
              Food content creates the craving. But too often, there&apos;s no simple way to turn that moment into a meal.
            </p>

            {/* Emphasis line , Figtree Medium 16px, Clay */}
            <p className="font-sans text-base font-medium text-clay">
              That&apos;s the gap Reelnosh is built to close.
            </p>
          </div>

          {/* Right Column: The Comment Thread Card (520�,560 Soft Cream Card) */}
          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <ScrollReveal className="relative h-[540px] sm:h-[560px] w-full max-w-[520px] overflow-hidden rounded-[24px] bg-[#F7F3ED] border border-neutral-lightClay/60 p-6 sm:p-8 shadow-elevation1">

              {/* Organic thread: vector stroke, 2px, Divider color #DCCFC4, no fill */}
              <svg
                viewBox="0 0 520 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full pointer-events-none z-0"
              >
                <path
                  d="M 60 15 C 80 40, 150 45, 170 72 C 210 115, 245 130, 250 205 C 255 265, 185 285, 190 340 C 195 395, 260 425, 270 495"
                  stroke="#DCCFC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Thread Comment Bubbles */}
              <div className="relative z-10 h-full w-full">
                {bubbles.map((bubble, idx) => (
                  <div
                    key={bubble.id}
                    className={`absolute ${bubble.positionClasses} ${bubble.widthClass} ${bubble.rotation} transition-transform duration-300 hover:scale-[1.02]`}
                  >
                    <div className="relative flex items-center gap-3 rounded-[16px] bg-[#FCFAF7] p-3.5 shadow-elevation1 border border-neutral-lightClay/50">
                      {/* 32px Circular Avatar Placeholder (Clay 15% tint fill, no image) */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay/15">
                        <span className="font-sans text-[11px] font-semibold text-clay">RN</span>
                      </div>

                      {/* Comment text & timestamp */}
                      <div className="min-w-0 flex-1">
                        <p className="font-sans text-[15px] font-medium text-neutral-charcoal leading-tight">
                          &ldquo;{bubble.text}&rdquo;
                        </p>
                        <span className="mt-0.5 block font-sans text-[12px] text-neutral-clayGray">
                          {bubble.timestamp}
                        </span>
                      </div>

                      {/* Small hollow accessibility-sequence badge (20px circle, 1px Clay stroke, no fill, numeral inside) */}
                      <span
                        className="absolute -bottom-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full border border-clay bg-[#FCFAF7] font-sans text-[11px] font-semibold text-clay shadow-xs"
                        aria-label={`Comment sequence ${bubble.number}`}
                      >
                        {bubble.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom ~80px Gradient Fade with closing line sitting over it */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex h-24 items-end justify-center bg-gradient-to-t from-[#F7F3ED] via-[#F7F3ED]/95 to-transparent pb-5">
                <p className="font-sans text-[14px] text-neutral-clayGray">
                  ...and more like this.
                </p>
              </div>

            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
