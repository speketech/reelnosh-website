import React from 'react';
import Image from 'next/image';
import { FeaturedContentItem, SEED_EXPLORING_ITEMS } from '@/lib/constants';
import { getFeaturedContent } from '@/lib/supabase/queries';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ExploringOrderButton } from './ExploringOrderButton';

interface ExploringProps {
  items?: FeaturedContentItem[];
}

export async function Exploring({ items: propItems }: ExploringProps = {}) {
  let items = propItems;

  if (!items || items.length === 0) {
    const rows = await getFeaturedContent('exploring');
    items = rows.length > 0 ? rows : SEED_EXPLORING_ITEMS;
  }

  const displayItems = items.slice(0, 3);

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

          <h2 className="font-serif text-[36px] font-semibold text-neutral-charcoal leading-[1.2] mb-3">
            Meals that could become Drops.
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-clayGray">
            We&apos;re exploring the kinds of meals people would love to experience through Reelnosh.
          </p>
        </div>

        {/* Unified Card Grid:
            - Mobile (<md): single column
            - Tablet (md–lg): hero card spans full width, 2 compact cards below in a row
            - Desktop (lg+): 3-column uniform grid */}
        <ScrollReveal className="mb-10">
          {displayItems.length > 0 && (() => {
            const [heroItem, ...restItems] = displayItems;

            const renderCard = (item: typeof heroItem) => {
              const mediaUrl = item.public_url || item.media_url;
              const isVideo = item.media_type === 'video';
              const creatorUsername = item.creator_username || item.creator_handle?.replace(/^@/, '') || 'kudiratijeoma';
              const creatorHandle = `@${creatorUsername.replace(/^@/, '')}`;
              const sourcePostUrl = item.source_post_url || item.creator_profile_url || `https://instagram.com/${creatorUsername.replace(/^@/, '')}`;

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between overflow-hidden rounded-[16px] border border-neutral-lightClay/70 bg-white shadow-elevation1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation2"
                >
                  {/* 1. Image or Video */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-softCream">
                    {isVideo ? (
                      <video
                        src={mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={mediaUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 360px"
                        className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    )}

                    {/* Credit chip */}
                    <a
                      href={sourcePostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-neutral-charcoal/65 px-2.5 py-1 text-white backdrop-blur-sm transition-colors hover:bg-neutral-charcoal/85 shadow-xs"
                      aria-label={`View ${creatorHandle} on Instagram`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-white"
                        aria-hidden="true"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span className="font-sans text-[12px] font-medium tracking-tight text-white leading-none">
                        {creatorHandle}
                      </span>
                    </a>
                  </div>

                  {/* 2. Content Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Status Badge */}
                      <div>
                        <span className="bg-[#FAF0E6] text-clay text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block">
                          {item.tap_count && item.tap_count >= 10
                            ? `${item.tap_count} interested`
                            : (item.badge || 'Vote for this Drop')}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="font-sans text-[22px] font-semibold text-neutral-charcoal pt-2.5 leading-[1.3]">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-[13px] text-neutral-clayGray leading-relaxed mt-1.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <ExploringOrderButton mealId={item.id} mealTitle={item.title} />
                  </div>
                </div>
              );
            };

            return (
              <>
                {/* Grid:
                    mobile: 1-col
                    tablet (md): 2-col grid — hero card is col-span-2 (full width), 2 compact cards are 1-col each on the next row
                    desktop (lg+): 3-col — all cards are 1-col each */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Hero card: full-width at tablet via col-span-2, normal 1-col at lg */}
                  <div className="md:col-span-2 lg:col-span-1">
                    {renderCard(heroItem)}
                  </div>
                  {/* Remaining 2 cards: each 1/2 width at tablet, 1/3 at desktop */}
                  {restItems.map((item) => renderCard(item))}
                </div>
              </>
            );
          })()}
        </ScrollReveal>

      </div>
    </section>
  );
}
