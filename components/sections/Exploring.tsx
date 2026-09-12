import React from 'react';
import Image from 'next/image';
import { FeaturedContentItem } from '@/lib/constants';
import { getFeaturedContent } from '@/lib/supabase/queries';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ExploringOrderButton } from './ExploringOrderButton';

interface ExploringProps {
  items?: FeaturedContentItem[];
}

export async function Exploring({ items: propItems }: ExploringProps = {}) {
  let items = propItems;

  if (!items) {
    items = await getFeaturedContent('exploring');
  }

  const displayItems = items.slice(0, 3);

  return (
    <section id="exploring" className="bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">

        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F4A11A] inline-block shrink-0" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-[#8B3A2A] dark:text-[#F4A11A]">
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

        {/* Uniform Card Grid or Empty State */}
        {displayItems.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-neutral-lightClay bg-neutral-softCream/40 p-8 text-center">
            <p className="font-sans text-sm text-neutral-clayGray">
              New creator drops are currently being explored. Join the waitlist to vote on what comes next.
            </p>
          </div>
        ) : (
          <ScrollReveal className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {displayItems.map((item) => {
                const mediaUrl = item.public_url || item.media_url;
                const isVideo = item.media_type === 'video';
                const creatorUsername = item.creator_username || item.creator_handle?.replace(/^@/, '') || '';
                const creatorHandle = creatorUsername ? `@${creatorUsername}` : '@reelnosh';
                const sourcePostUrl = item.source_post_url || item.creator_profile_url || (creatorUsername ? `https://instagram.com/${creatorUsername}` : 'https://instagram.com/reelnosh');

                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between overflow-hidden rounded-[16px] border border-neutral-lightClay/70 bg-[var(--color-warm-white)] shadow-elevation1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevation2"
                  >
                    {/* 1. Image or Video */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-softCream">
                      {mediaUrl ? (
                        isVideo ? (
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
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        )
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-4 text-center text-neutral-clayGray">
                          <p className="font-sans text-xs">Drop preview coming soon</p>
                        </div>
                      )}

                      {/* Gradient Overlay for Handle */}
                      {mediaUrl && creatorUsername && (
                        <>
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                          {/* Creator Handle Pill */}
                          <a
                            href={sourcePostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 transition-all hover:bg-black/60 border border-white/20"
                          >
                            <svg
                              width="12"
                              height="12"
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
                        </>
                      )}
                    </div>

                    {/* 2. Content Container */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Status Badge */}
                        <div>
                          <span className="bg-neutral-softCream text-cocoa border border-neutral-lightClay dark:bg-rn-subtle dark:text-rn-text-primary dark:border-rn-border-strong text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block shadow-xs">
                            {item.tap_count && item.tap_count >= 10
                              ? `${item.tap_count} interested`
                              : (item.badge || 'Vote for this Drop')}
                          </span>
                        </div>

                        {/* Card Title */}
                        <h3 className="font-sans text-[22px] font-semibold text-neutral-charcoal pt-2.5 leading-[1.3] line-clamp-2">
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
              })}
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
