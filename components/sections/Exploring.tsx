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

        {/* Unified 3-Card Grid */}
        <ScrollReveal className="mb-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {displayItems.map((item) => {
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
                {/* 1. Image or Video: Unified 4:3 Aspect Ratio */}
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  )}

                  {/* Credit chip pill: bottom-left corner of image on semi-transparent dark pill */}
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

                {/* 2. Content Container: badge, title, description, CTA */}
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

                  {/* CTA Button + Trust caption below button */}
                  <ExploringOrderButton mealId={item.id} mealTitle={item.title} />
                </div>
              </div>
            );
          })}
        </ScrollReveal>

      </div>
    </section>
  );
}
