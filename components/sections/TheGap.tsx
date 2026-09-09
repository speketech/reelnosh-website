import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const TheGap: React.FC = () => {
  const bubbles = [
    {
      id: 'b1',
      number: '1',
      initials: 'AO',
      avatarBg: 'bg-clay/15 text-clay',
      text: 'I need this.',
      timestamp: '2m ago',
      positionClasses: 'top-[114px] sm:top-[134px] left-3 sm:left-[32px]',
      rotation: '-rotate-1.5',
      widthClass: 'w-[205px] sm:w-[230px]',
    },
    {
      id: 'b2',
      number: '2',
      initials: 'TA',
      avatarBg: 'bg-[#5A2418]/15 text-[#5A2418]',
      text: 'How much?',
      timestamp: '14m ago',
      positionClasses: 'top-[186px] sm:top-[214px] left-[110px] sm:left-[215px]',
      rotation: 'rotate-[1.5deg]',
      widthClass: 'w-[190px] sm:w-[205px]',
    },
    {
      id: 'b3',
      number: '3',
      initials: 'CO',
      avatarBg: 'bg-[#B84D1B]/15 text-[#B84D1B]',
      text: 'Can I order?',
      timestamp: '1h ago',
      positionClasses: 'top-[258px] sm:top-[294px] left-4 sm:left-[48px]',
      rotation: '-rotate-1',
      widthClass: 'w-[205px] sm:w-[225px]',
    },
  ];

  return (
    <section className="bg-neutral-warmWhite py-16 md:py-[100px]">
      <div className="mx-auto flex h-full max-w-[1120px] items-center px-5 md:px-0">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">

          {/* Left Column: Problem Statement */}
          <div className="max-w-[520px] lg:col-span-6">
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                THE GAP
              </span>
            </div>

            {/* DESIGN_OVERRIDES §1: Title role , 36px Lora semibold, max-width 600 */}
            <h2 className="mb-5 font-serif text-[32px] sm:text-[36px] font-semibold leading-[1.2] text-neutral-charcoal max-w-[600px]">
              Great food should not end in the comments.
            </h2>

            {/* Body paragraph , Figtree Body 16px, max-width 550 */}
            <p className="font-sans text-base text-neutral-clayGray leading-relaxed mb-6 max-w-[500px]">
              Food content creates the craving. But too often, there&apos;s no simple way to turn that moment into a meal.
            </p>

            {/* Emphasis line , Figtree Medium 16px, Clay */}
            <p className="font-sans text-base font-medium text-clay">
              That&apos;s the gap Reelnosh is built to close.
            </p>
          </div>

          {/* Right Column: The Comment Thread Card */}
          <div className="flex w-full items-center justify-center lg:col-span-6">
            <ScrollReveal className="relative h-[450px] sm:h-[500px] w-full max-w-[360px] sm:max-w-[460px] overflow-hidden rounded-[24px] bg-[#F7F3ED] border border-neutral-lightClay/60 shadow-elevation1">

              {/* Organic thread: vector stroke, 2px, Divider color #DCCFC4, no fill */}
              <svg
                viewBox="0 0 460 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full pointer-events-none z-0"
              >
                <path
                  d="M 145 100 C 125 135, 100 165, 125 205 C 175 240, 285 220, 275 270 C 265 315, 150 310, 130 350 C 110 395, 175 440, 195 485"
                  stroke="#DCCFC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Thread Content: Static Video Still + Comments */}
              <div className="relative z-10 h-full w-full">
                {/* Static Still Video Card (The food content that sparked the cravings) */}
                <div className="absolute top-6 sm:top-8 left-7 sm:left-[85px] w-[210px] sm:w-[240px] overflow-hidden rounded-[14px] sm:rounded-[16px] bg-neutral-charcoal text-white shadow-elevation1 border border-neutral-lightClay/50 -rotate-1 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="relative h-[70px] sm:h-[78px] w-full overflow-hidden bg-neutral-charcoal">
                    <Image
                      src="/images/drops/smokey-jollof.jpg"
                      alt="Food reel preview"
                      fill
                      sizes="250px"
                      className="object-cover opacity-90"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

                    {/* Play Icon Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/45 backdrop-blur-xs text-white border border-white/25 shadow-xs">
                        <svg width="11" height="13" viewBox="0 0 12 14" fill="currentColor" className="ml-0.5">
                          <path d="M1.5 1.5L10.5 7L1.5 12.5V1.5Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Reel badge top-left */}
                    <div className="absolute top-1.5 sm:top-2 left-2 sm:left-2.5 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium tracking-wide text-white backdrop-blur-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-spicePop animate-pulse" />
                      <span>Reel</span>
                    </div>

                    {/* Bottom caption */}
                    <div className="absolute bottom-1.5 sm:bottom-2 left-2 sm:left-2.5 right-2 sm:right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-white/90">
                      <span className="font-medium truncate">@chef_kemi · Party Jollof</span>
                      <span className="text-[9px] sm:text-[10px] text-white/70 shrink-0">0:15</span>
                    </div>
                  </div>
                </div>

                {/* Comment Bubbles with distinct initials */}
                {bubbles.map((bubble) => (
                  <div
                    key={bubble.id}
                    className={`absolute ${bubble.positionClasses} ${bubble.widthClass} ${bubble.rotation} transition-transform duration-300 hover:scale-[1.02]`}
                  >
                    <div className="relative flex items-center gap-3 rounded-[14px] sm:rounded-[16px] bg-[#FCFAF7] p-2.5 sm:p-3 shadow-elevation1 border border-neutral-lightClay/50">
                      {/* 28px/32px Circular Avatar with distinct initials & tints */}
                      <div className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full ${bubble.avatarBg}`}>
                        <span className="font-sans text-[11px] font-semibold">{bubble.initials}</span>
                      </div>

                      {/* Comment text & timestamp */}
                      <div className="min-w-0 flex-1">
                        <p className="font-sans text-[13px] sm:text-[14px] font-medium text-neutral-charcoal leading-tight">
                          &ldquo;{bubble.text}&rdquo;
                        </p>
                        <span className="mt-0.5 block font-sans text-[11px] sm:text-[12px] text-neutral-clayGray">
                          {bubble.timestamp}
                        </span>
                      </div>

                      {/* Small hollow accessibility-sequence badge */}
                      <span
                        className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border border-clay bg-[#FCFAF7] font-sans text-[10px] sm:text-[11px] font-semibold text-clay shadow-xs"
                        aria-label={`Comment sequence ${bubble.number}`}
                      >
                        {bubble.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Gradient Fade with closing line sitting over it */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex h-20 sm:h-24 items-end justify-center bg-gradient-to-t from-[#F7F3ED] via-[#F7F3ED]/95 to-transparent pb-4 sm:pb-5">
                <p className="font-sans text-[13px] sm:text-[14px] text-neutral-clayGray">
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
