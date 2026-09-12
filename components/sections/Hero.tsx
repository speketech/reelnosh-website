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
      <div className="mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex max-w-[540px] flex-col justify-center text-center lg:text-left items-center lg:items-start mx-auto lg:mx-0">
            {/* Eyebrow label */}
            <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay dark:text-accent-spicePop">
              A NEW WAY TO EXPERIENCE CREATOR-MADE FOOD
            </p>

            {/* H1 with exact line breaks matching reference */}
            <h1 className="mb-6 font-serif text-[36px] font-semibold leading-[1.15] text-neutral-charcoal tablet:text-[40px] sm:text-[48px]">
              Where food content <span className="font-medium italic text-[#8B3A2A] dark:text-[#D79A8A]">becomes meals.</span>
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
                className="inline-flex h-[52px] w-full sm:w-auto shrink-0 items-center justify-center rounded-brand bg-[#8B3A2A] px-7 font-sans text-base font-semibold text-[#FFF5FA] shadow-elevation1 transition-colors hover:bg-[#743022] active:bg-[#5A2418]"
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
              
              {/* Decorative Ring positioned at the back of the hero image container (hidden on mobile) */}
              <div className="pointer-events-none absolute -right-4 -top-6 sm:-right-7 sm:-top-8 z-0 h-24 w-24 sm:h-[126px] sm:w-[126px]">
                <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98px] h-[98px] sm:w-[130px] sm:h-[130px] rounded-full border-[0.3px] border-neutral-lightClay/20 dark:border-neutral-lightClay/10 pointer-events-none" />
              </div>

              {/* Starburst Badge in front of hero container */}
              <div className="pointer-events-none absolute -right-4 -top-6 sm:-right-7 sm:-top-8 z-30 h-24 w-24 sm:h-[126px] sm:w-[126px] drop-shadow-sm">
                <img
                  src="/icons/starting-in-lagos.svg"
                  alt="Starting in Lagos"
                  width={152}
                  height={152}
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>

              {/* Outer Soft Cream Container Card */}
              <div className="relative z-10 rounded-[16px] border border-neutral-lightClay/80 bg-neutral-softCream p-4 sm:p-5 shadow-elevation2">
                
                {/* Food Image or Video with Creator Handle Pill Overlay */}
                <div className="relative aspect-[440/380] w-full overflow-hidden rounded-[12px] border border-neutral-lightClay bg-neutral-softCream">
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

                  {/* Gradient Overlay for Handle */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                  {/* Creator Handle Pill (Unified exactly as Exploring meal cards) */}
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
                      @{creatorUsername}
                    </span>
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
