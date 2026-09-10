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
          <Link
            href={`/founders-note/${note.slug}`}
            onClick={() => window.sessionStorage.setItem('reelnosh:note-origin', 'founders-note')}
            aria-label={`Read note: ${note.title}`}
            className="block space-y-3"
          >
            <span className="font-sans text-xs text-neutral-clayGray">
              {note.date}
            </span>
            <h2 className="font-serif text-2xl font-semibold text-neutral-charcoal group-hover:text-clay transition-colors leading-snug">
              {note.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-clayGray leading-relaxed">
              {note.excerpt}
            </p>
            <div className="pt-2 text-xs font-semibold text-clay dark:text-[#F4C16D] font-sans inline-flex items-center gap-1.5 group-hover:underline">
              <span>Read more</span>
              <span className="sr-only">: {note.title}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 pointer-events-none transition-transform group-hover:translate-x-0.5 shrink-0 text-clay dark:text-[#F4C16D]">
                <path d="M7.99976 3L12.9998 8L7.99976 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.99609 7.875H12.9961" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
