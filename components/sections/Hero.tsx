'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SITE_CONFIG, FeaturedContentItem } from '@/lib/constants';

interface HeroProps {
  content?: FeaturedContentItem;
  onOpenCreatorWaitlist?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onOpenCreatorWaitlist }) => {
  const [imgSrc, setImgSrc] = useState(
    content?.media_url || '/images/hero/hero-image.png'
  );

  return (
    <section className="relative overflow-hidden bg-neutral-warmWhite py-12 md:h-[629px] md:py-0">
      <div className="mx-auto h-full max-w-[1120px] px-5 md:px-0">
        <div className="grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-0">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex max-w-[504px] flex-col justify-center">
            {/* Eyebrow label */}
            <p className="mb-7 font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
              A NEW WAY TO EXPERIENCE CREATOR-MADE FOOD
            </p>

            {/* H1 with exact line breaks matching reference */}
            {/* DESIGN_OVERRIDES §1: Display (H1) — 48px at sm+, title (36px) on mobile */}
            <h1 className="mb-7 font-serif text-[36px] font-semibold leading-[1.15] text-neutral-charcoal sm:text-[48px]">
              Where food content <span className="font-medium italic text-clay">becomes meals.</span>
            </h1>

            {/* Subhead with exact break */}
            <p className="mb-8 max-w-[428px] font-sans text-base leading-[1.5] text-neutral-clayGray">
              We turn food content into meals you can actually order. Help shape the first creator-led food drops in Lagos.
            </p>

            {/* Action Buttons */}
            <div className="mb-3">
              <a
                href={SITE_CONFIG.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] w-full items-center justify-center rounded-brand bg-clay px-7 text-center font-sans text-base font-semibold text-white shadow-elevation1 transition-colors hover:bg-clay-hover active:bg-clay-pressed sm:w-auto"
              >
                Join the Reelnosh Community
              </a>
            </div>

            {/* Secondary Action: Plain text link */}
            <div className="mb-4">
              <button
                type="button"
                onClick={onOpenCreatorWaitlist}
                className="group inline-flex items-center gap-1 font-sans text-sm font-medium text-clay hover:underline transition-colors"
              >
                <span>Cooking your own meals? Join the Creator Waitlist</span>
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Caption under CTAs */}
            <p className="font-sans text-xs leading-[1.4] text-neutral-clayGray">
              We&apos;re starting small with our first Drops.
            </p>
          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              
              {/* Starburst Badge + concentric ring motif (DESIGN_OVERRIDES §5) */}
              <div className="pointer-events-none absolute -right-7 -top-8 z-30 h-28 w-28 drop-shadow-sm">
                {/* Concentric rings — very low opacity, behind badge, same asset pattern as FoodiesClub */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-neutral-lightClay/30 z-0" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-neutral-lightClay/20 z-0" />
                <img src="/icons/starting-in-lagos.svg" alt="Starting in Lagos" className="relative z-10 h-full w-full object-contain" />
              </div>

              {/* Outer Soft Cream Container Card */}
              <div className="rounded-[12px] border border-neutral-lightClay/80 bg-[#F7F3ED] p-5 shadow-elevation2">
                
                {/* Food Image */}
                <div className="relative aspect-[480/440] w-full overflow-hidden rounded-[12px] border border-neutral-lightClay bg-white">
                  <Image
                    src={imgSrc}
                    alt="Featured culinary drop"
                    fill
                    priority
                    onError={() => setImgSrc('/images/hero/hero-image.png')}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>

                {/* Creator Attribution Bar */}
                <div className="relative flex items-center justify-between px-1.5 pb-0 pl-[76px] pt-3">
                  <div className="absolute -left-1 bottom-[-8px] z-10 h-16 w-16 overflow-hidden rounded-full border-4 border-[#F7F3ED] bg-neutral-softCream shadow-elevation1">
                    <Image
                      src="/images/hero/hero-avatar.png"
                      alt="Kudirat Ijeoma"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-sans text-[14px] text-neutral-clayGray">
                      Food by <strong className="font-semibold text-neutral-charcoal">@kudiratijeoma</strong>
                    </p>
                  </div>

                  <a
                    href="https://instagram.com/kudiratijeoma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-[13px] font-medium text-clay hover:underline"
                  >
                    <span>View on Instagram</span>
                    <span className="text-[11px] leading-none">↗</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
