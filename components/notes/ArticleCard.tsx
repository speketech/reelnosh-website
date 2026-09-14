import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FounderNoteItem } from '@/lib/constants';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { LikeButton } from './LikeButton';

interface ArticleCardProps {
  note: FounderNoteItem;
  origin?: 'home' | 'founders-note' | 'detail';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ note, origin = 'founders-note' }) => {
  const rememberOrigin = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('reelnosh:note-origin', origin);
      window.sessionStorage.setItem(
        'reelnosh:note-origin-url',
        window.location.pathname + window.location.search + (origin === 'home' ? '#founders-note' : window.location.hash)
      );
      window.sessionStorage.setItem('reelnosh:note-origin-scroll', window.scrollY.toString());
    }
  };
  const body = note.body_markdown || note.excerpt || '';
  const readTime = calculateReadingTime(body);

  return (
    <article className="flex h-[440px] flex-col justify-between overflow-hidden rounded-[20px] border border-neutral-lightClay/70 bg-[var(--color-warm-white)] shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 group">
      {/* Note Image (Fixed 210px height) */}
      <div className="relative w-full h-[210px] shrink-0 overflow-hidden bg-neutral-lightClay/20 block">
        <Link
          href={`/founders-note/${note.slug}`}
          onClick={rememberOrigin}
          aria-label={`Read note: ${note.title}`}
          className="absolute inset-0 z-0 block"
        >
          {note.image ? (
            <Image
              src={note.image}
              alt={note.image_alt || note.title || "Founder's note cover image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-softCream/60 p-4 text-center">
              <span className="font-serif text-sm font-medium text-neutral-clayGray">Reelnosh Founder&apos;s Note</span>
            </div>
          )}
        </Link>
        <div className="absolute bottom-3 left-3 z-10">
          <LikeButton slug={note.slug} initialLikes={note.likes_count || 0} variant="floating" />
        </div>
      </div>

      {/* Card Body (Flex 1, with title clamped to 2 lines, timestamp at bottom) */}
      <div className="p-6 flex flex-col justify-between flex-1 min-h-0">
        <div>
          {/* Category */}
          <div className="flex items-center mb-3">
            {note.category && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-softCream text-clay dark:bg-[#3A241D] dark:text-[#FFA07A] dark:border dark:border-[#5A382D] text-[11px] font-semibold tracking-wide uppercase max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-spicePop shrink-0" />
                <span className="truncate">{note.category}</span>
              </span>
            )}
          </div>

          {/* DESIGN_OVERRIDES §1: Card title role , 22px Figtree semibold, clamped to 2 lines */}
          <h3 className="font-sans text-[22px] font-semibold text-neutral-charcoal leading-[1.3] line-clamp-2 group-hover:text-clay dark:group-hover:text-[#F4A11A] transition-colors mb-2">
            <Link href={`/founders-note/${note.slug}`} onClick={rememberOrigin}>
              {note.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-xs sm:text-sm text-neutral-clayGray leading-relaxed line-clamp-2">
            {note.excerpt}
          </p>
        </div>

        {/* Timestamp & Reading Time at Bottom */}
        <div className="pt-3 mt-auto border-t border-neutral-lightClay/40 dark:border-white/5 flex items-center justify-between text-xs text-neutral-clayGray font-normal">
          <span>{note.date}</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </article>
  );
};
