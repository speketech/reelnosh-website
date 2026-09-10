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
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay dark:text-accent-spicePop">
                FOUNDER&apos;S NOTE
              </span>
            </div>

            {/* Section Headline — DESIGN_OVERRIDES §1: Title role — 36px Lora semibold */}
            <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal max-w-xl">
              What we&apos;re learning while building Reelnosh publicly.
            </h2>
          </div>
        </div>

        {/* 3-Column ArticleCard Grid or Empty State */}
        {displayNotes.length === 0 ? (
          <div className="rounded-2xl border border-neutral-lightClay/60 bg-neutral-softCream/60 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
            <p className="font-serif text-xl font-semibold text-neutral-charcoal mb-2">
              Our first note is in the oven.
            </p>
            <p className="text-sm text-neutral-clayGray font-sans leading-relaxed mb-6">
              We&apos;re currently documenting our early journey, tasting loops, and lessons building Reelnosh in Lagos. Join our community to be the first to read when our dispatch goes live.
            </p>
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-brand bg-[#8B3A2A] px-5 py-2.5 text-sm font-medium text-[#FFF5FA] transition-colors hover:bg-[#743022] active:bg-[#5A2418]"
            >
              Join WhatsApp Community
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {displayNotes.map((note, index) => (
              <ScrollReveal key={note.id} delay={index * 80}>
                <ArticleCard note={note} origin="home" />
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

