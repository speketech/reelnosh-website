'use client';

import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface FoodiesClubProps {
  onOpenFoodieWaitlist?: () => void;
}

export const FoodiesClub: React.FC<FoodiesClubProps> = ({ onOpenFoodieWaitlist }) => {
  return (
    <section id="foodies-club" className="relative overflow-hidden bg-[#F7F3ED] py-16 md:py-[120px]">
      
      {/* Outer subtle concentric decorative lines extending to right edge matching Figma */}
      <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-neutral-lightClay/80 pointer-events-none" />
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-[940px] h-[940px] rounded-full border border-neutral-lightClay/50 pointer-events-none" />

      <div className="max-w-[1120px] mx-auto px-5 md:px-0 relative z-10">
        
        {/* Banner Card */}
        <ScrollReveal className="relative overflow-hidden rounded-[8px_32px_8px_8px] bg-[#8B3A2A] px-6 py-16 text-center text-white shadow-sm sm:px-12 md:px-20">
          
          {/* Inner decorative circular arcs matching reference image */}
          <div className="absolute -top-32 -right-32 w-[380px] h-[380px] rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute -top-52 -right-52 w-[540px] h-[540px] rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full border border-white/15 pointer-events-none" />

          {/* Badge at top */}
          <div className="relative w-28 h-28 mx-auto mb-7">
            <Image
              src="/icons/foodies-club-badge.svg"
              alt="Foodies Club"
              fill
              className="object-contain"
            />
          </div>

          {/* Headline */}
          {/* DESIGN_OVERRIDES §1: Title role — 36px Lora semibold */}
          <h2 className="relative z-10 mb-5 font-serif text-[36px] font-semibold leading-[1.2] text-white">
            Stay close to what we&apos;re<br />
            building.
          </h2>

          {/* Subhead */}
          <p className="font-sans text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed mb-8 relative z-10">
            Join the Foodies Club on WhatsApp for early Drop updates, food<br className="hidden sm:inline" /> conversations, and a say in the experiences we explore.
          </p>

          {/* Primary Button */}
          <div className="relative z-10">
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-clay font-sans text-sm font-semibold rounded-brand hover:bg-[#F7F3ED] transition-colors shadow-sm"
            >
              Join the Reelnosh community
            </a>
          </div>

        </ScrollReveal>

      </div>
    </section>
  );
};
