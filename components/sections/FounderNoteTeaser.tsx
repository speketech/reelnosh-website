import React from 'react';
import Link from 'next/link';
import { FounderNoteItem } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleCard } from '@/components/notes/ArticleCard';

interface FounderNoteTeaserProps {
  notes: FounderNoteItem[];
}

export const FounderNoteTeaser: React.FC<FounderNoteTeaserProps> = ({ notes }) => {
  const displayNotes = notes.slice(0, 3);

  return (
    <section id="founders-note" className="bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-0">
        
        {/* Header Row */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                FOUNDER&apos;S NOTE
              </span>
            </div>

            {/* Section Headline — DESIGN_OVERRIDES §1: Title role — 36px Lora semibold */}
            <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal max-w-xl">
              What we&apos;re learning while building Reelnosh publicly.
            </h2>
          </div>

          <div className="shrink-0 pb-1">
            <Link
              href="/founders-note"
              className="group inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-clay hover:underline"
            >
              <span>View all notes</span>
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 3-Column ArticleCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayNotes.map((note, index) => (
            <ScrollReveal key={note.id} delay={index * 80}>
              <ArticleCard note={note} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
