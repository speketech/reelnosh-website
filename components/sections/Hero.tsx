import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG, FeaturedContentItem, SEED_HERO_CONTENT } from '@/lib/constants';
import { getFeaturedContent } from '@/lib/supabase/queries';
import { HeroCreatorButton } from './HeroCreatorButton';

interface HeroProps {
  content?: FeaturedContentItem;
}

export async function Hero({ content: propContent }: HeroProps = {}) {
  let content = propContent;

  if (!content) {
    const rows = await getFeaturedContent('hero');
    content = rows.length > 0 ? rows[0] : SEED_HERO_CONTENT;
  }

  const mediaUrl = content.public_url || content.media_url || SEED_HERO_CONTENT.public_url || '/images/hero/hero-image.png';
  const isVideo = content.media_type === 'video';
  const creatorUsername = content.creator_username || content.creator_handle?.replace(/^@/, '') || 'kudiratijeoma';
  const sourcePostUrl = content.source_post_url || content.creator_profile_url || 'https://instagram.com/kudiratijeoma';

  return (
    <section className="relative overflow-hidden bg-neutral-warmWhite py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1120px] px-5 md:px-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex max-w-[540px] flex-col justify-center text-center lg:text-left items-center lg:items-start mx-auto lg:mx-0">
            {/* Eyebrow label */}
            <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
              A NEW WAY TO EXPERIENCE CREATOR-MADE FOOD
            </p>

            {/* H1 with exact line breaks matching reference */}
            <h1 className="mb-6 font-serif text-[36px] font-semibold leading-[1.15] text-neutral-charcoal sm:text-[48px]">
              Where food content <span className="font-medium italic text-clay">becomes meals.</span>
            </h1>

            {/* Subhead with exact break */}
            <p className="mb-8 max-w-[440px] font-sans text-base leading-[1.5] text-neutral-clayGray">
              We turn food content into meals you can actually order. Help shape the first creator-led food drops in Lagos.
            </p>

            {/* CTAs: Button + Beside Text Link on desktop */}
            <div className="mb-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center lg:justify-start">
              <a
                href={SITE_CONFIG.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] w-full sm:w-auto shrink-0 items-center justify-center rounded-brand bg-[#783323] px-7 font-sans text-base font-semibold text-white shadow-elevation1 transition-colors hover:bg-[#63291C] active:bg-[#522217]"
              >
                Join the Reelnosh Community
              </a>

              <HeroCreatorButton />
            </div>

            {/* Caption under CTAs */}
            <p className="font-sans text-xs leading-[1.4] text-neutral-clayGray text-center lg:text-left">
              We&apos;re starting small with our first Drops.
            </p>
          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[440px] xl:max-w-[460px]">
              
              {/* Starburst Badge + concentric ring motif */}
              <div className="pointer-events-none absolute -right-6 -top-7 z-30 h-24 w-24 sm:h-28 sm:w-28 drop-shadow-sm">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-neutral-lightClay/30 z-0" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-neutral-lightClay/20 z-0" />
                <img
                  src="/icons/starting-in-lagos.svg"
                  alt="Starting in Lagos"
                  width={152}
                  height={152}
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>

              {/* Outer Soft Cream Container Card */}
              <div className="rounded-[16px] border border-neutral-lightClay/80 bg-[#F7F3ED] p-4 sm:p-5 shadow-elevation2">
                
                {/* Food Image or Video */}
                <div className="relative aspect-[440/380] w-full overflow-hidden rounded-[12px] border border-neutral-lightClay bg-white">
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={mediaUrl}
                      alt={content.title || 'Featured culinary drop'}
                      fill
                      priority
                      fetchPriority="high"
                      className="object-cover"
                      sizes="(max-width: 640px) calc(100vw - 64px), (max-width: 1024px) 408px, 420px"
                    />
                  )}
                </div>

                {/* Creator attribution bar with Instagram icon link */}
                <div className="relative flex items-center justify-between pt-2 px-1">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Overlapping Avatar */}
                    <div className="relative -mt-9 sm:-mt-11 h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border-4 border-[#F7F3ED] bg-neutral-softCream shadow-elevation1 z-10">
                      <Image
                        src="/images/hero/hero-avatar.png"
                        alt={`@${creatorUsername}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-sans text-xs text-neutral-clayGray leading-tight">
                          Food by <strong className="font-semibold text-neutral-charcoal">@{creatorUsername}</strong>
                        </p>
                        <span className="text-xs text-neutral-clayGray/60">·</span>
                      </div>
                    </div>
                  </div>

                  {/* Instagram Icon */}
                  <a
                    href={sourcePostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-charcoal hover:text-clay transition-colors shrink-0 ml-2"
                    aria-label="View on Instagram"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
