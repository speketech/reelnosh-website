'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FounderNoteItem } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface FoundersNoteFeedProps {
  initialNotes: FounderNoteItem[];
}

export const FoundersNoteFeed: React.FC<FoundersNoteFeedProps> = ({ initialNotes }) => {
  const [notes, setNotes] = useState<FounderNoteItem[]>(initialNotes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialNotes.length >= 10);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMoreNotes = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/notes?offset=${notes.length}&limit=10`);
      const data = await res.json();

      if (data.notes && data.notes.length > 0) {
        const formatted = data.notes.map((n: any) => ({
          ...n,
          date: new Date(n.published_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
        }));
        setNotes((prev) => [...prev, ...formatted]);
        if (data.notes.length < 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreNotes();
      },
      { rootMargin: '240px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, notes.length, isLoading]);

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <ScrollReveal key={note.slug} delay={(notes.indexOf(note) % 3) * 80}>
          <article className="rounded-card border border-neutral-lightClay bg-neutral-softCream p-6 shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 group sm:p-7">
          <Link href={`/founders-note/${note.slug}`} onClick={() => window.sessionStorage.setItem('reelnosh:note-origin', 'founders-note')} className="block space-y-3">
            <span className="font-sans text-xs text-neutral-clayGray">
              {note.date}
            </span>
            <h2 className="font-serif text-2xl font-semibold text-neutral-charcoal group-hover:text-clay transition-colors leading-snug">
              {note.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-clayGray leading-relaxed">
              {note.excerpt}
            </p>
            <div className="pt-2 text-xs font-semibold text-clay font-sans inline-flex items-center gap-1.5">
              <span>Read more</span>
              <img src="/icons/forward-arrow.svg" alt="" aria-hidden="true" className="h-4 w-4" />
            </div>
          </Link>
          </article>
        </ScrollReveal>
      ))}

      {hasMore && (
        <div ref={loadMoreRef} className="pt-6 text-center">
          <button
            onClick={loadMoreNotes}
            disabled={isLoading}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-clay border border-clay/30 rounded-brand hover:bg-clay/5 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading more...' : 'Load more notes'}
          </button>
        </div>
      )}
    </div>
  );
};
