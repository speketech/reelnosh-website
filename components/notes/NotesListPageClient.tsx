'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FounderNoteItem } from '@/lib/constants';
import { Modal } from '@/components/ui/Modal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleCard } from './ArticleCard';
import { Button } from '@/components/ui/Button';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { getFounderNoteBody, FOUNDERS_NOTES_INDEX_CONTENT } from '@/lib/notesContent';
import { EmptyNoteState } from '@/components/notes/EmptyNoteState';

// Load form + its dependencies (react-hook-form, zod) only when the modal opens.
const FoodieSignupForm = dynamic(
  () => import('@/components/forms/FoodieSignupForm').then((mod) => mod.FoodieSignupForm),
  { ssr: false }
);


interface NotesListPageClientProps {
  featuredNote: {
    id: string;
    slug: string;
    date: string;
    category?: string;
    quote?: string;
    title: string;
    excerpt: string;
    body_markdown?: string;
  } | null;
  notes: FounderNoteItem[];
}

export const NotesListPageClient: React.FC<NotesListPageClientProps> = ({
  featuredNote,
  notes,
}) => {
  const [isFoodieModalOpen, setIsFoodieModalOpen] = useState(false);
  const featuredBody = featuredNote ? (featuredNote.body_markdown || getFounderNoteBody(featuredNote.slug, featuredNote.excerpt)) : '';
  const featuredReadTime = featuredNote ? calculateReadingTime(featuredBody) : 1;

  const hasNotes = Boolean(featuredNote || notes.length > 0);

  return (
    <main className="min-h-screen bg-neutral-warmWhite">
      {/* 1. Hero Section (Consolidated single DOM structure for all viewports) */}
      <section className="bg-neutral-warmWhite px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4 md:px-12 md:pt-8 md:pb-6 min-[1120px]:px-0">
        <div
          className="relative mx-auto w-full max-w-[363px] min-[500px]:max-w-[1072px] overflow-hidden rounded-[24px] min-[500px]:rounded-none border border-neutral-lightClay/70 bg-neutral-softCream shadow-elevation1 min-[500px]:border-none min-[500px]:bg-transparent min-[500px]:shadow-none aspect-[363/340] min-[500px]:aspect-[1072/460]"
          style={{
            borderRadius: '30.65% 21.46% 21.46% 12.26% / 71.43% 50% 50% 28.57%',
          }}
        >
          {/* Layer 1: Background Vector Frame for Desktop (Adaptive to dark mode surface) */}
          <svg
            viewBox="0 0 1072 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain select-none min-[500px]:block"
            aria-hidden="true"
          >
            <path
              d="M0 328.571C0 147.106 147.106 0 328.571 0H842C969.026 0 1072 102.975 1072 230C1072 357.025 969.026 460 842 460H131.429C58.8426 460 0 401.157 0 328.571Z"
              className="fill-neutral-softCream"
            />
            <path
              d="M0 328.571C0 147.106 147.106 0 328.571 0H842C969.026 0 1072 102.975 1072 230C1072 357.025 969.026 460 842 460H131.429C58.8426 460 0 401.157 0 328.571Z"
              className="stroke-neutral-lightClay/70"
              strokeWidth="1.5"
            />
          </svg>

          {/* Mobile accent circle */}
          <div
            className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-accent-spicePop/25 min-[500px]:hidden"
            aria-hidden="true"
          />

          {/* Layer 2: Visual Anchor — Kudirat photo & Desktop Spicepop Shape (Single Render) */}
          <div className="pointer-events-none absolute select-none top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden border-2 border-accent-spicePop/60 min-[500px]:border-none min-[500px]:rounded-none min-[500px]:top-auto min-[500px]:left-auto min-[500px]:translate-x-0 min-[500px]:bottom-0 min-[500px]:right-[2%] min-[500px]:w-[26%] min-[500px]:h-[82%] sm:right-[2%] sm:w-[29%] sm:h-[86%] md:right-[2.5%] md:w-[32%] md:h-[88%] tablet:right-[3%] tablet:w-[34%] tablet:h-[91%] lg:right-[3.5%] lg:w-[36%] lg:h-[93%] lg:left-auto xl:left-[54.1%] xl:right-auto xl:w-[41.04%] xl:h-full">
            {/* Spicepop background shape (desktop only) */}
            <img
              src="/images/notes/hero-spicepop.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain object-bottom select-none min-[500px]:block"
            />

            {/* Kudirat photo */}
            <div className="relative h-full w-full min-[500px]:absolute min-[500px]:left-[8.11%] min-[500px]:w-[85.91%] min-[500px]:top-[-1.49%] min-[500px]:h-[102.61%]">
              <Image
                src="/images/notes/kudirat-hero.png"
                alt="Kudirat Ijeoma Ibeabuchi, Founder of Reelnosh"
                fill
                priority
                sizes="(max-width: 500px) 64px, (max-width: 640px) 210px, (max-width: 768px) 270px, (max-width: 1024px) 340px, 450px"
                className="object-cover object-top min-[500px]:object-contain min-[500px]:object-bottom"
              />
            </div>
          </div>

          {/* Content Layer (Single responsive block) */}
          <div className="relative z-10 flex h-full flex-col justify-start pt-[88px] px-6 min-[500px]:justify-center min-[500px]:pt-3 sm:pt-4 md:pt-4 lg:pt-0 pl-6 min-[500px]:pl-16 sm:pl-20 md:pl-28 tablet:pl-[105px] lg:pl-[120px] xl:pl-[130px] pr-4 w-full min-[500px]:w-[68%] sm:w-[65%] md:w-[60%] tablet:w-[58%] lg:w-[54%] xl:w-[50%]">
            <h1 className="font-serif text-[24px] xs:text-[26px] min-[500px]:text-[19px] sm:text-2xl md:text-[30px] lg:text-[42px] xl:text-[50px] font-semibold leading-[1.2] min-[500px]:leading-[1.35] lg:leading-[1.18] xl:leading-[1.2] text-neutral-charcoal tracking-tight">
              {FOUNDERS_NOTES_INDEX_CONTENT.headingPart1}
              <span className="italic text-clay font-normal">{FOUNDERS_NOTES_INDEX_CONTENT.brandWord}</span>
              <br />
              <span className="inline-block mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-0">{FOUNDERS_NOTES_INDEX_CONTENT.headingPart2}</span>
            </h1>

            <p className="mt-2.5 min-[500px]:mt-2 sm:mt-2.5 md:mt-3.5 lg:mt-4 font-sans text-[12.5px] min-[500px]:text-[12.5px] sm:text-[13.5px] md:text-[15px] lg:text-[16px] xl:text-[17px] leading-[1.45] min-[500px]:leading-[1.5] md:leading-[1.6] lg:leading-[1.65] text-neutral-clayGray max-w-[268px] min-[500px]:max-w-[465px]">
              {FOUNDERS_NOTES_INDEX_CONTENT.description}
            </p>

            <p className="mt-3 min-[500px]:mt-2 sm:mt-2.5 md:mt-3.5 lg:mt-5 font-serif italic font-normal text-neutral-charcoal text-[13.5px] min-[500px]:text-[12.5px] sm:text-sm md:text-[15px] lg:text-base xl:text-[17px]">
              {FOUNDERS_NOTES_INDEX_CONTENT.author}
            </p>
          </div>
        </div>
      </section>

      {!hasNotes ? (
        /* Empty state when zero notes are published */
        <section className="bg-neutral-warmWhite px-5 py-12 sm:py-16 md:px-12">
          <EmptyNoteState onAction={() => setIsFoodieModalOpen(true)} />
        </section>
      ) : (
        <>
          {/* 2. Latest Note Section , DESIGN_OVERRIDES §4: Clay pull-quote treatment only */}
          {featuredNote && (
            <section className="bg-neutral-warmWhite px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 md:px-12 md:pt-10 min-[1120px]:px-0">
              <div className="max-w-[1120px] mx-auto">
                {/* Eyebrow */}
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-neutral-charcoal dark:text-accent-spicePop mb-4">
                  LATEST NOTE
                </h2>

                {/* Featured Split Card */}
                <ScrollReveal className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-neutral-lightClay/70 bg-neutral-softCream shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 md:grid-cols-12">
                  {/* Left Side: Deep Clay Quote Box */}
                  <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-clay p-8 text-white sm:p-10 md:col-span-5">
                    {/* Concentric Decorative Circular Lines */}
                    <div className="absolute -right-16 -bottom-16 w-56 h-56 border border-white/15 rounded-full pointer-events-none" />
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 border border-white/15 rounded-full pointer-events-none" />
                    <div className="absolute -right-0 -bottom-0 w-24 h-24 border border-white/15 rounded-full pointer-events-none" />

                    {/* Top Meta: Category Badge */}
                    <div className="relative z-10">
                      {featuredNote.category && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold tracking-wide uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-spicePop" />
                          {featuredNote.category}
                        </span>
                      )}
                    </div>

                    {/* Bottom Quote */}
                    <blockquote className="font-serif italic text-[24px] text-white leading-snug mt-8 sm:mt-12 relative z-10">
                      {featuredNote.quote || featuredNote.excerpt}
                    </blockquote>
                  </div>

                  {/* Right Side: Note Summary and CTA */}
                  <div className="flex flex-col justify-between p-8 sm:p-10 md:col-span-7">
                    <div>
                      <span className="font-sans text-xs font-medium text-neutral-clayGray block mb-3">
                        {featuredNote.date} · {featuredReadTime} min read
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-charcoal leading-snug mb-3 hover:text-clay transition-colors">
                        <Link href={`/founders-note/${featuredNote.slug}`} onClick={() => window.sessionStorage.setItem('reelnosh:note-origin', 'founders-note')}>
                          {featuredNote.title}
                        </Link>
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-neutral-clayGray leading-relaxed">
                        {featuredNote.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 sm:pt-8 mt-auto">
                      <Link
                        href={`/founders-note/${featuredNote.slug}`}
                        onClick={() => window.sessionStorage.setItem('reelnosh:note-origin', 'founders-note')}
                        aria-label={`Read full note: ${featuredNote.title}`}
                        className="font-sans text-sm font-semibold text-clay hover:underline inline-flex items-center gap-1.5 transition-all group cursor-pointer dark:text-white dark:hover:text-white/90"
                      >
                        <span>Read full note</span>
                        <span className="sr-only">: {featuredNote.title}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="h-4 w-4 pointer-events-none transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        >
                          <path d="M7.99976 3L12.9998 8L7.99976 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2.99609 7.875H12.9961" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* 3. All Notes Grid Section */}
          {notes.length > 0 && (
            <section className="pb-16 sm:pb-20 px-5 sm:px-8 md:px-12 min-[1120px]:px-0">
              <div className="max-w-[1120px] mx-auto">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-neutral-charcoal dark:text-accent-spicePop">
                    ALL NOTES
                  </h2>
                  <span className="font-sans text-xs font-medium text-neutral-clayGray">
                    {notes.length} of {notes.length}
                  </span>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {notes.map((note) => (
                    <ScrollReveal key={note.id} delay={(notes.indexOf(note) % 3) * 80}>
                      <ArticleCard note={note} />
                    </ScrollReveal>
                  ))}
                </div>

                {/* 4. Pre-Footer Callout ("You've read them all.") */}
                <div className="mt-20 sm:mt-28 mb-8 text-center max-w-lg mx-auto">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-charcoal mb-2">
                    You&apos;ve read them all.
                  </h3>

                  <p className="font-sans text-sm text-neutral-clayGray leading-relaxed mb-4">
                    New notes drop as we keep building. Join the community to be the
                    first to know.
                  </p>

                  <Button
                    type="button"
                    onClick={() => setIsFoodieModalOpen(true)}
                    variant="primary"
                    size="md"
                  >
                    Join the Reelnosh community
                  </Button>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Community / Foodie Signup Modal */}
      <Modal
        isOpen={isFoodieModalOpen}
        onClose={() => setIsFoodieModalOpen(false)}
        title="Stay close to what we're building"
      >
        {isFoodieModalOpen && (
          <FoodieSignupForm
            onSuccess={() => setIsFoodieModalOpen(false)}
          />
        )}
      </Modal>
    </main>
  );
};
