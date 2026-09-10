'use client';

import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface FoodiesClubProps {
  onOpenFoodieWaitlist?: () => void;
}

interface FoodiesClubCardProps {
  compact?: boolean;
}

export const FoodiesClubCard: React.FC<FoodiesClubCardProps> = ({ compact = false }) => {
  return (
    <ScrollReveal className={`relative overflow-hidden rounded-[28px] bg-[#8B3A2A] text-center text-white shadow-elevation1 ${compact ? 'px-5 py-10 sm:px-8 sm:py-12' : 'px-6 py-16 sm:rounded-[36px] sm:px-12 md:py-20'}`}>
          
          {/* Top-right sweeping arc matching Image 1 */}
          <div className={`pointer-events-none absolute rounded-full border border-white/25 ${compact ? '-right-[110px] -top-[130px] h-[420px] w-[420px]' : '-right-[140px] -top-[160px] h-[580px] w-[580px]'}`} />
          
          {/* Bottom sweeping arc matching Image 1 */}
          <div className={`pointer-events-none absolute rounded-full border border-white/20 ${compact ? '-bottom-[210px] -right-[40px] h-[480px] w-[480px]' : '-bottom-[280px] -right-[60px] h-[640px] w-[640px]'}`} />

          {/* Centered Foodies Club Badge */}
          <div className={`relative z-10 mx-auto ${compact ? 'mb-5 h-20 w-20 sm:h-24 sm:w-24' : 'mb-8 h-28 w-28 sm:h-32 sm:w-32'}`}>
            <Image
              src="/icons/foodies-club-badge.svg"
              alt="Foodies Club"
              fill
              className="object-contain"
            />
          </div>

          {/* Headline */}
          {/* DESIGN_OVERRIDES §1: Title role , 36px Lora semibold */}
          <h2 className={`relative z-10 font-serif font-semibold leading-[1.2] text-white ${compact ? 'mb-3 text-[28px] sm:text-[32px]' : 'mb-4 text-[32px] sm:text-[40px]'}`}>
            Stay close to what <br />
            we&apos;re building.
          </h2>

          {/* Subhead */}
          <p className={`relative z-10 mx-auto max-w-lg font-sans leading-relaxed text-white/90 ${compact ? 'mb-6 text-sm' : 'mb-8 text-sm sm:text-base'}`}>
            Join the Foodies Club on WhatsApp for early Drop updates, food conversations, and a say in the experiences we explore.
          </p>

          {/* White Button with Clay Text */}
          <div className="relative z-10">
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-brand bg-white font-sans font-semibold text-[#783323] shadow-sm transition-colors hover:bg-[#F7F3ED] ${compact ? 'w-full px-6 py-3 text-sm sm:w-auto' : 'px-8 py-3.5 text-sm'}`}
            >
              Join the Reelnosh community
            </a>
          </div>

        </ScrollReveal>
  );
};

export const FoodiesClub: React.FC<FoodiesClubProps> = () => (
  <section id="foodies-club" className="relative overflow-hidden bg-neutral-softCream py-16 md:py-[120px]">
    <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">
      <FoodiesClubCard />
    </div>
  </section>
);
