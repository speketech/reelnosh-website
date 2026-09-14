'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { FounderNoteItem } from '@/lib/constants';
import { OriginAwareBackButton } from '@/components/notes/OriginAwareBackButton';
import { FoodiesClubCard } from '@/components/sections/FoodiesClub';
import { MarkdownLink } from '@/components/notes/MarkdownLink';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { LikeButton } from '@/components/notes/LikeButton';
import { JourneyBox } from '@/components/notes/JourneyBox';

/**
 * MermaidDiagram is loaded via next/dynamic so its ~570 KB (gzipped) bundle
 * is only fetched for the specific notes that contain a mermaid fence block.
 * Every other note pays exactly zero bytes for this feature.
 */
const MermaidDiagram = dynamic(
  () => import('@/components/notes/MermaidDiagram').then((m) => m.MermaidDiagram),
  { ssr: false, loading: () => <div className="my-8 h-24 animate-pulse rounded-[10px] bg-[var(--rn-bg-surface)]" /> },
);

interface NoteDetailPageClientProps {
  note: FounderNoteItem;
  relatedNotes: FounderNoteItem[];
}

export const NoteDetailPageClient: React.FC<NoteDetailPageClientProps> = ({ note, relatedNotes }) => {
  const body = note.body_markdown || note.excerpt || '';
  const readTime = calculateReadingTime(body);

  return (
    <main className="bg-neutral-warmWhite min-h-screen">
      <article>
        {/* Article header */}
        <section className="px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 md:px-8 md:pb-16 md:pt-10">
          <div className="mx-auto max-w-[800px]">
            {/* Back Button */}
            <div className="mb-6 mt-2 sm:mb-8 sm:mt-4">
              <OriginAwareBackButton fallbackHref="/founders-note" />
            </div>

            {/* Metadata Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2.5 font-sans text-xs text-neutral-clayGray">
              {note.category && (
                <span className="rounded-full bg-[#8B3A2A]/10 dark:bg-[#C06B54]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.2px] text-clay">
                  {note.category}
                </span>
              )}
              <span>{new Date(note.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <span className="text-neutral-lightClay">•</span>
              <span>{readTime} min read</span>
            </div>

            {/* Article Title */}
            <h1 className="font-serif text-3xl font-semibold leading-[1.32] text-neutral-charcoal sm:text-4xl md:text-[52px] sm:leading-[1.24] md:leading-[1.2] tracking-tight">
              {note.title}
            </h1>

            {/* Excerpt — secondary caption, distinct from the body lead paragraph */}
            {note.excerpt && (
              <p className="mt-3 font-sans text-sm italic text-neutral-clayGray/80 leading-relaxed max-w-[680px]">
                {note.excerpt}
              </p>
            )}

            {/* Author Row */}
            <div className="mt-6 flex items-center gap-3 sm:mt-7">
              <Image
                src="/images/notes/kudirat-avatar.png"
                alt="Kudirat Ijeoma Ibeabuchi"
                width={48}
                height={48}
                className="rounded-full bg-[#F4C16D] object-cover shrink-0"
              />
              <div>
                <p className="font-sans text-sm sm:text-[15px] font-semibold text-neutral-charcoal leading-snug">
                  Kudirat
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-clayGray">
                  Founder &amp; CEO, Reelnosh
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {note.image && (
          <section className="px-4 pb-12 sm:px-6 md:px-8 md:pb-16">
            <div className="relative mx-auto max-w-[960px] aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-[20px] sm:rounded-[24px] shadow-elevation1">
              <Image
                src={note.image}
                alt={note.title || "Founder's note header cover"}
                fill
                priority
                quality={75}
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover"
              />
            </div>
            {note.image_credit && (
              <div className="mx-auto max-w-[960px] mt-3 sm:mt-4 text-center sm:text-right px-2">
                <p className="font-sans text-[11px] text-neutral-clayGray/80 tracking-wide">
                  Image: {note.image_credit}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Editorial Body Content */}
        <section className="px-4 pb-14 sm:px-6 md:px-8 md:pb-20">
          <div className="mx-auto max-w-[760px] font-sans text-[17px] leading-[1.8] text-neutral-charcoal">
            {/*
              Wrapper anchors the lead-paragraph treatment to the first <p> of
              body_markdown — not the excerpt, which lives in a separate section above.
            */}
            <div className="[&>p:first-child]:mb-9 [&>p:first-child]:border-b [&>p:first-child]:border-neutral-lightClay [&>p:first-child]:pb-8 [&>p:first-child]:font-serif [&>p:first-child]:text-xl [&>p:first-child]:leading-[1.45]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-12 mb-5 border-l-2 border-clay pl-3 font-serif text-[21px] font-semibold leading-tight text-neutral-charcoal">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="my-5 leading-[1.8] text-neutral-charcoal">
                    {children}
                  </p>
                ),
                a: ({ href = '', title, children }) => (
                  <MarkdownLink href={href} title={title}>
                    {children}
                  </MarkdownLink>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="relative my-10 overflow-hidden rounded-[12px] bg-neutral-softCream px-5 py-7 text-center shadow-xs sm:px-8 sm:py-8 [&_p]:my-0">
                    {/* Decorative quote mark in top-left */}
                    <div
                      className="pointer-events-none absolute left-4 top-3 select-none opacity-[0.08]"
                      aria-hidden="true"
                    >
                      <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                        <path
                          d="M14.5 3C12.97 3.88 11.73 4.64 10.79 5.3C9.84 5.92 8.88 6.75 7.91 7.79C7 8.76 6.3 9.79 5.81 10.86C5.32 11.94 4.98 13.32 4.78 15.01H7.13C9.15 15.01 10.72 15.52 11.86 16.53C13.04 17.5 13.62 18.95 13.62 20.87C13.62 22.24 13.1 23.53 12.06 24.73C11.05 25.9 9.65 26.49 7.86 26.49C5.06 26.49 3.06 25.57 1.85 23.75C0.65 21.9 0.05 19.47 0.05 16.48C0.05 14.36 0.5 12.44 1.41 10.72C2.33 8.96 3.43 7.4 4.73 6.03C6.07 4.63 7.49 3.44 8.98 2.47C10.48 1.49 11.73 0.69 12.74 0.07L14.5 3ZM32.57 3C31.04 3.88 29.8 4.64 28.86 5.3C27.91 5.92 26.95 6.75 25.97 7.79C25.03 8.8 24.31 9.84 23.83 10.91C23.37 11.96 23.05 13.32 22.85 15.01H25.19C27.21 15.01 28.79 15.52 29.93 16.53C31.1 17.5 31.69 18.95 31.69 20.87C31.69 22.24 31.17 23.53 30.13 24.73C29.12 25.9 27.72 26.49 25.93 26.49C23.13 26.49 21.12 25.57 19.92 23.75C18.72 21.9 18.11 19.47 18.11 16.48C18.11 14.36 18.57 12.44 19.48 10.72C20.39 8.96 21.5 7.4 22.8 6.03C24.14 4.63 25.55 3.44 27.05 2.47C28.55 1.49 29.8 0.69 30.81 0.07L32.57 3Z"
                          fill="var(--color-clay)"
                        />
                      </svg>
                    </div>

                    {/* Quote text: dynamic height based on text length */}
                    <div className="relative z-10 mx-auto max-w-[560px] font-serif text-[21px] italic leading-[1.55] text-neutral-charcoal">
                      {children}
                    </div>

                    {/* Decorative center divider */}
                    <div
                      className="relative z-10 mt-4 flex items-center justify-center gap-2"
                      aria-hidden="true"
                    >
                      <span className="h-[1px] w-5 bg-[#C9A090]" />
                      <span className="h-1 w-1 rounded-full bg-clay opacity-50" />
                      <span className="h-[1px] w-5 bg-[#C9A090]" />
                    </div>
                  </blockquote>
                ),
                // `pre` wraps every fenced code block. We intercept here
                // (not in `code`) because react-markdown v10 always renders
                // the outer <pre> even when the `code` override returns a div,
                // producing invalid HTML and preventing MermaidDiagram from
                // mounting. Detecting mermaid at the pre level lets us
                // short-circuit the entire <pre><code> pair cleanly.
                pre: ({ children }) => {
                  // Children of <pre> from react-markdown is always a single
                  // <code> element for fenced blocks.
                  const child = React.Children.toArray(children)[0] as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
                  if (child && typeof child === 'object' && 'props' in child) {
                    const lang = /language-(\w+)/.exec(child.props.className ?? '')?.[1];
                    if (lang === 'mermaid') {
                      return (
                        <MermaidDiagram
                          chart={String(child.props.children ?? '').replace(/\n$/, '')}
                        />
                      );
                    }
                    if (lang === 'box' || lang === 'journey' || lang === 'steps' || lang === 'flow') {
                      return (
                        <JourneyBox
                          content={String(child.props.children ?? '').replace(/\n$/, '')}
                        />
                      );
                    }
                  }
                  // Default: styled preformatted block for non-mermaid fences.
                  return (
                    <pre className="my-6 overflow-x-auto rounded-[10px] bg-[var(--rn-bg-surface)] p-5 font-mono text-sm leading-relaxed text-[var(--rn-text-secondary)]">
                      {children}
                    </pre>
                  );
                },
                code: ({ className, children }) => {
                  // This handles inline `code` only (no className on inline snippets).
                  // Fenced block code elements are intercepted via `pre` above.
                  if (!className) {
                    return (
                      <code className="rounded-[5px] bg-[var(--rn-bg-surface)] px-[0.35em] py-[0.15em] font-mono text-[0.9em] text-[var(--rn-text-secondary)]">
                        {children}
                      </code>
                    );
                  }
                  // Pass through for non-mermaid fenced blocks (handled by pre above).
                  return <code className={className}>{children}</code>;
                },
              }}
            >
              {body}
            </ReactMarkdown>
            </div>

            {/* Like Action */}
            <div className="mt-12 flex items-center gap-4 border-t border-neutral-lightClay/60 pt-8">
              <span className="font-sans text-[14px] font-semibold text-neutral-charcoal uppercase tracking-[1px]">
                Did you like this note?
              </span>
              <LikeButton slug={note.slug} initialLikes={note.likes_count || 0} className="scale-[1.15] origin-left" />
            </div>

            {/* Same Foodies Club card as the homepage, resized for the article column. */}
            <div className="mt-14">
              <FoodiesClubCard compact />
            </div>
          </div>
        </section>

        {/* More Notes Section */}
        {relatedNotes.length > 0 && (
          <section className="bg-neutral-softCream px-4 py-16 sm:px-6 md:px-8 md:py-20">
            <div className="mx-auto max-w-[1120px]">
              <div className="mb-8 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                <span className="text-accent-spicePop">•</span> MORE NOTES
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedNotes.map((related) => (
                  <article
                    key={related.id}
                    className="group relative overflow-hidden rounded-[16px] border border-neutral-lightClay bg-neutral-warmWhite shadow-elevation1 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation2 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[1.5] w-full overflow-hidden bg-neutral-softCream">
                      <Link
                        href={`/founders-note/${related.slug}`}
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.sessionStorage.setItem('reelnosh:note-origin', 'founders-note');
                            window.sessionStorage.setItem('reelnosh:note-origin-url', window.location.pathname + window.location.search);
                            window.sessionStorage.setItem('reelnosh:note-origin-scroll', window.scrollY.toString());
                          }
                        }}
                        aria-label={`Read note: ${related.title}`}
                        className="absolute inset-0 z-0 block"
                      >
                        {related.image ? (
                          <Image
                            src={related.image}
                            alt={related.title || "Founder's note preview"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center p-4 text-center">
                            <span className="font-serif text-xs text-neutral-clayGray">Reelnosh Note</span>
                          </div>
                        )}
                      </Link>
                      <div className="absolute bottom-3 left-3 z-10">
                        <LikeButton slug={related.slug} initialLikes={related.likes_count || 0} variant="floating" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        {related.category && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-softCream px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-clay">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-spicePop" />
                            {related.category}
                          </span>
                        )}
                        <h3 className="mt-3 font-serif text-lg sm:text-xl font-semibold leading-snug text-neutral-charcoal group-hover:text-clay dark:group-hover:text-[#F4A11A] transition-colors">
                          <Link
                            href={`/founders-note/${related.slug}`}
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                window.sessionStorage.setItem('reelnosh:note-origin', 'founders-note');
                                window.sessionStorage.setItem('reelnosh:note-origin-url', window.location.pathname + window.location.search);
                                window.sessionStorage.setItem('reelnosh:note-origin-scroll', window.scrollY.toString());
                              }
                            }}
                          >
                            {related.title}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-4 font-sans text-xs text-neutral-clayGray">
                        {related.date} · {calculateReadingTime(related.body_markdown || related.excerpt || '')} min read
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

    </main>
  );
};
