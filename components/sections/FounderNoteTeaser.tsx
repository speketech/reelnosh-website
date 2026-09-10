import React from 'react';
import { FounderNoteItem, SITE_CONFIG } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleCard } from '@/components/notes/ArticleCard';

interface FounderNoteTeaserProps {
  notes: FounderNoteItem[];
}

export const FounderNoteTeaser: React.FC<FounderNoteTeaserProps> = ({ notes }) => {
  const displayNotes = notes.slice(0, 3);

  return (
    <section id="founders-note" className="bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">
        
        {/* Header Row */}
        <div className="mb-10">
          <div>
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay dark:text-[#F4A11A]">
                FOUNDER&apos;S NOTE
              </span>
            </div>

            {/* Section Headline , DESIGN_OVERRIDES §1: Title role , 36px Lora semibold */}
            <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal max-w-xl">
              What we&apos;re learning while building Reelnosh publicly.
            </h2>
          </div>
        </div>

        {/* 3-Column ArticleCard Grid or Empty State */}
        {displayNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {displayNotes.map((note, index) => (
              <ScrollReveal key={note.id} delay={index * 80}>
                <ArticleCard note={note} origin="home" />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal className="rounded-[20px] sm:rounded-[24px] border border-neutral-lightClay/70 bg-neutral-softCream p-8 sm:p-12 text-center max-w-xl mx-auto shadow-elevation1">
            <div className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-neutral-warmWhite dark:bg-[#FFF5FA] border border-neutral-lightClay/80 dark:border-[#FFF5FA] text-clay dark:text-[#8B3A2A] shadow-elevation1">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-9 sm:h-9 text-clay dark:text-[#8B3A2A]" aria-hidden="true">
                <path d="M28.75 17.5C28.75 17.8315 28.6183 18.1495 28.3839 18.3839C28.1495 18.6183 27.8315 18.75 27.5 18.75H17.5C17.1685 18.75 16.8505 18.6183 16.6161 18.3839C16.3817 18.1495 16.25 17.8315 16.25 17.5C16.25 17.1685 16.3817 16.8505 16.6161 16.6161C16.8505 16.3817 17.1685 16.25 17.5 16.25H27.5C27.8315 16.25 28.1495 16.3817 28.3839 16.6161C28.6183 16.8505 28.75 17.1685 28.75 17.5ZM27.5 21.25H17.5C17.1685 21.25 16.8505 21.3817 16.6161 21.6161C16.3817 21.8505 16.25 22.1685 16.25 22.5C16.25 22.8315 16.3817 23.1495 16.6161 23.3839C16.8505 23.6183 17.1685 23.75 17.5 23.75H27.5C27.8315 23.75 28.1495 23.6183 28.3839 23.3839C28.6183 23.1495 28.75 22.8315 28.75 22.5C28.75 22.1685 28.6183 21.8505 28.3839 21.6161C28.1495 21.3817 27.8315 21.25 27.5 21.25ZM35 7.5V32.5C35 33.163 34.7366 33.7989 34.2678 34.2678C33.7989 34.7366 33.163 35 32.5 35H7.5C6.83696 35 6.20107 34.7366 5.73223 34.2678C5.26339 33.7989 5 33.163 5 32.5V7.5C5 6.83696 5.26339 6.20107 5.73223 5.73223C6.20107 5.26339 6.83696 5 7.5 5H32.5C33.163 5 33.7989 5.26339 34.2678 5.73223C34.7366 6.20107 35 6.83696 35 7.5ZM7.5 32.5H11.25V7.5H7.5V32.5ZM32.5 32.5V7.5H13.75V32.5H32.5Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-charcoal mb-2">
              Notes are on the way.
            </h3>
            <p className="font-sans text-sm sm:text-base text-neutral-clayGray leading-relaxed max-w-md mx-auto mb-6">
              Kudirat shares candid updates about what we&apos;re learning, the Lagos food scene, and the decisions behind Reelnosh. The first note will be published soon.
            </p>
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-brand bg-[#8B3A2A] px-6 py-3 font-sans text-sm font-semibold text-white shadow-elevation1 transition-colors hover:bg-[#743022] active:bg-[#5F261A]"
            >
              Join the Reelnosh Community
            </a>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};
