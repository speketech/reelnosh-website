'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FeaturedContentItem } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ExploringProps {
  items: FeaturedContentItem[];
  onOpenDetailModal?: (mealId: string, mealTitle: string) => void;
}

export const Exploring: React.FC<ExploringProps> = ({ items, onOpenDetailModal }) => {
  const [interestedMeals, setInterestedMeals] = useState<Record<string, boolean>>({});

  const handleOrderTap = (meal: FeaturedContentItem) => {
    // 1. Instant client-side state swap (no animation)
    setInterestedMeals((prev) => ({ ...prev, [meal.id]: true }));

    // 2. Decoupled non-blocking POST to /api/interest-tap
    try {
      fetch('/api/interest-tap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meal_id: meal.id }),
      }).catch((err) => console.warn('Interest tap background error:', err));
    } catch (err) {
      console.warn('Interest tap dispatch error:', err);
    }

    // 3. Optional non-gating follow-up modal
    if (onOpenDetailModal) {
      setTimeout(() => {
        onOpenDetailModal(meal.id, meal.title);
      }, 750);
    }
  };

  const primaryItem = items[0];
  const secondaryItems = items.slice(1, 3);

  return (
    <section id="exploring" className="bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-0">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
              WHAT WE&apos;RE EXPLORING
            </span>
          </div>

          {/* DESIGN_OVERRIDES §1: Title role — 36px Lora semibold */}
          <h2 className="font-serif text-[36px] font-semibold text-neutral-charcoal leading-[1.2] mb-3">
            Meals that could become Drops.
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-clayGray">
            We&apos;re exploring the kinds of meals people would love to experience through Reelnosh.
          </p>
        </div>

        {/* 3 Cards Row matching Figma layout */}
        <ScrollReveal className="mb-10 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
          
          {/* Card 1: Wide Card (spans 6 cols on desktop) */}
          {primaryItem && (
            <div className="flex flex-col overflow-hidden rounded-[8px] border border-neutral-lightClay/70 bg-white shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 sm:flex-row lg:col-span-6">
              {/* Image half */}
              <div className="relative min-h-[220px] overflow-hidden bg-neutral-softCream sm:min-h-full sm:w-1/2">
                <Image
                  src={primaryItem.media_url}
                  alt={primaryItem.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover"
                />
              </div>

              {/* Content half */}
              <div className="flex flex-col justify-between space-y-4 p-6 sm:w-1/2 sm:p-7">
                <div className="space-y-2">
                  <div className="text-xs font-sans">
                    <span className="text-neutral-clayGray font-medium">Food by </span>
                    <strong className="text-neutral-charcoal font-semibold">
                      {primaryItem.creator_handle || '@kudiratijeoma'}
                    </strong>
                    <br />
                    <a
                      href={primaryItem.creator_profile_url || 'https://instagram.com/kudiratijeoma'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-clay hover:underline inline-flex items-center gap-1 font-medium mt-0.5"
                    >
                      <span>View on Instagram</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <span className="bg-[#FAF0E6] text-clay text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block">
                      {primaryItem.tap_count && primaryItem.tap_count >= 10
                        ? `${primaryItem.tap_count} interested`
                        : (primaryItem.badge || 'Vote for this Drop')}
                    </span>
                  </div>

                  {/* DESIGN_OVERRIDES §1: Card title role — 22px Figtree semibold (same for all cards) */}
                  <h3 className="font-sans text-[22px] font-semibold text-neutral-charcoal pt-1 leading-[1.3]">
                    {primaryItem.title}
                  </h3>

                  <p className="font-sans text-xs text-neutral-clayGray leading-relaxed">
                    {primaryItem.description}
                  </p>
                </div>

                {/* Trust caption before tap */}
                {!interestedMeals[primaryItem.id] && (
                  <p className="font-sans text-[13px] text-neutral-clayGray mb-2">
                    Tap to show interest — no payment, no obligation.
                  </p>
                )}

                {/* DESIGN_OVERRIDES §7: Checkmark icon fades in alongside text — pure opacity, 300ms */}
                <button
                  type="button"
                  onClick={() => handleOrderTap(primaryItem)}
                  disabled={interestedMeals[primaryItem.id]}
                  className={`w-full py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-brand border transition-colors ${
                    interestedMeals[primaryItem.id]
                      ? 'bg-surface-successTint border-feedback-success text-feedback-success cursor-default'
                      : 'bg-white border-secondaryCta-border text-clay hover:bg-secondaryCta-hoverBackground'
                  }`}
                >
                  {interestedMeals[primaryItem.id] ? (
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <span>Interested</span>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className="transition-opacity duration-300 opacity-100"
                        aria-hidden="true"
                      >
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : ("I'd order this")}
                </button>
              </div>
            </div>
          )}

          {/* Cards 2 & 3: Vertical Cards (each spans 3 cols on desktop) */}
          {secondaryItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between overflow-hidden rounded-[8px] border border-neutral-lightClay/70 bg-white shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 lg:col-span-3"
            >
              {/* DESIGN_OVERRIDES §3: Unified 4:5 aspect ratio for all meal card images */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-softCream">
                <Image
                  src={item.media_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1.5">
                  <div className="space-y-1 text-xs sm:hidden">
                    <p className="font-sans text-neutral-clayGray">
                      Food by <strong className="font-semibold text-neutral-charcoal">{item.creator_handle || '@kudiratijeoma'}</strong>
                    </p>
                    <a
                      href={item.creator_profile_url || 'https://instagram.com/kudiratijeoma'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-clay hover:underline"
                    >
                      View on Instagram <span>↗</span>
                    </a>
                  </div>
                  <span className="bg-[#FAF0E6] text-clay text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block">
                    {item.tap_count && item.tap_count >= 10
                      ? `${item.tap_count} interested`
                      : (item.badge || 'Vote for this Drop')}
                  </span>
                  {/* DESIGN_OVERRIDES §1: Card title role — 22px Figtree semibold (same size as primary card) */}
                  <h4 className="font-sans text-[22px] font-semibold text-neutral-charcoal leading-[1.3]">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-clayGray leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Trust caption before tap (mobile) */}
                {!interestedMeals[item.id] && (
                  <p className="font-sans text-[13px] text-neutral-clayGray mt-3 mb-1 sm:hidden">
                    Tap to show interest — no payment, no obligation.
                  </p>
                )}

                {/* DESIGN_OVERRIDES §7: Checkmark icon fades in alongside text — pure opacity, 300ms */}
                <button
                  type="button"
                  onClick={() => handleOrderTap(item)}
                  disabled={interestedMeals[item.id]}
                  className={`w-full rounded-brand border px-4 py-2.5 text-xs font-semibold transition-colors sm:hidden ${
                    interestedMeals[item.id]
                      ? 'border-feedback-success bg-surface-successTint text-feedback-success'
                      : 'border-secondaryCta-border bg-white text-clay hover:bg-secondaryCta-hoverBackground'
                  }`}
                >
                  {interestedMeals[item.id] ? (
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <span>Interested</span>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className="transition-opacity duration-300 opacity-100"
                        aria-hidden="true"
                      >
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : ("I'd order this")}
                </button>
              </div>
            </div>
          ))}

        </ScrollReveal>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-clay" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-lightClay" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-lightClay" />
        </div>

      </div>
    </section>
  );
};
