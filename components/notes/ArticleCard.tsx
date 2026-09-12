import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FounderNoteItem } from '@/lib/constants';
import { calculateReadingTime } from '@/lib/utils/reading-time';

interface ArticleCardProps {
  note: FounderNoteItem;
  origin?: 'home' | 'founders-note';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ note, origin = 'founders-note' }) => {
  const rememberOrigin = () => window.sessionStorage.setItem('reelnosh:note-origin', origin);
  const body = note.body_markdown || note.excerpt || '';
  const readTime = calculateReadingTime(body);

  return (
    <article className="flex h-[440px] flex-col justify-between overflow-hidden rounded-[20px] border border-neutral-lightClay/70 bg-[var(--color-warm-white)] shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 group">
      {/* Note Image (Fixed 210px height) */}
      <Link
        href={`/founders-note/${note.slug}`}
        onClick={rememberOrigin}
        aria-label={`Read note: ${note.title}`}
        className="relative w-full h-[210px] shrink-0 overflow-hidden bg-neutral-lightClay/20 block"
      >
        {note.image ? (
          <Image
            src={note.image}
            alt={note.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-softCream/60 p-4 text-center">
            <span className="font-serif text-sm font-medium text-neutral-clayGray">Reelnosh Founder&apos;s Note</span>
          </div>
        )}
      </Link>

      {/* Card Body (Flex 1, with title clamped to 2 lines) */}
      <div className="p-6 flex flex-col justify-between flex-1 min-h-0">
        <div>
          {/* Category & Read Meta */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {note.category && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-softCream text-clay text-[11px] font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-spicePop" />
                {note.category}
              </span>
            )}
            <span className="font-sans text-xs text-neutral-clayGray font-normal ml-auto">
              {note.date} · {readTime} min read
            </span>
          </div>

          {/* DESIGN_OVERRIDES §1: Card title role , 22px Figtree semibold, clamped to 2 lines */}
          <h3 className="font-sans text-[22px] font-semibold text-neutral-charcoal leading-[1.3] line-clamp-2 group-hover:text-clay transition-colors mb-2">
            <Link href={`/founders-note/${note.slug}`} onClick={rememberOrigin}>
              {note.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-xs sm:text-sm text-neutral-clayGray leading-relaxed line-clamp-3">
            {note.excerpt}
          </p>
        </div>
      </div>
    </article>
  );
};
