'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FounderNoteItem, SITE_CONFIG } from '@/lib/constants';
import { Modal } from '@/components/ui/Modal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleCard } from './ArticleCard';
import { Button } from '@/components/ui/Button';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { getFounderNoteBody } from '@/lib/notesContent';

// Load form + its dependencies (react-hook-form, zod) only when the modal opens.
const FoodieSignupForm = dynamic(
  () => import('@/components/forms/FoodieSignupForm').then((mod) => mod.FoodieSignupForm),
  { ssr: false }
);

interface NotesListPageClientProps {
  featuredNote?: {
    id: string;
    slug: string;
    date: string;
    category: string;
    quote: string;
    title: string;
    excerpt: string;
    body_markdown?: string;
  } | null;
  notes: FounderNoteItem[];
}

export const NotesListPageClient: React.FC<NotesListPageClientProps> = ({
  featuredNote,
  notes = [],
}) => {
  const [isFoodieModalOpen, setIsFoodieModalOpen] = useState(false);
  const featuredBody = featuredNote
    ? featuredNote.body_markdown || getFounderNoteBody(featuredNote.slug, featuredNote.excerpt)
    : '';
  const featuredReadTime = featuredNote ? calculateReadingTime(featuredBody) : 0;

  const hasContent = Boolean(featuredNote) || notes.length > 0;

  return (
    <main className="min-h-screen bg-neutral-warmWhite">
      {/* 1. Hero Section */}
      <section className="bg-neutral-warmWhite px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4 md:px-12 md:pt-8 md:pb-6 min-[1120px]:px-0">
        <div
          className="relative mx-auto w-full max-w-[363px] aspect-[363/320] min-[500px]:max-w-[1072px] min-[500px]:aspect-[1072/460] overflow-hidden min-[500px]:[border-radius:30.65%_21.46%_21.46%_12.26%_/_71.43%_50%_50%_28.57%]"
        >
          {/* Layer 1: Background Vector Frame (Mobile SVG on <500px, Desktop SVG on 500px+) */}
          <picture className="pointer-events-none absolute inset-0 h-full w-full select-none dark:hidden">
            <source media="(min-width: 500px)" srcSet="/images/notes/hero-note-container.svg" />
            <img
              src="/images/notes/hero-note-image-mobile.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
            />
          </picture>
          <picture className="pointer-events-none absolute inset-0 h-full w-full select-none hidden dark:block">
            <source media="(min-width: 500px)" srcSet="/images/notes/hero-note-container-dark.svg" />
            <img
              src="/images/notes/hero-note-image-mobile-dark.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
            />
          </picture>

          {/* Layer 2: Visual Anchor — Kudirat Photo + Spicepop accent */}
          <div className="pointer-events-none absolute select-none left-[36.41%] top-0 h-[20%] w-[17.63%] min-[500px]:top-auto min-[500px]:bottom-0 min-[500px]:left-auto min-[500px]:right-[2%] min-[500px]:w-[26%] min-[500px]:h-[82%] sm:right-[2%] sm:w-[29%] sm:h-[86%] md:right-[2.5%] md:w-[32%] md:h-[88%] tablet:right-[3%] tablet:w-[34%] tablet:h-[91%] lg:right-[3.5%] lg:w-[36%] lg:h-[93%] xl:left-[54.1%] xl:right-auto xl:w-[41.04%] xl:h-full">
            {/* Spicepop background shape (desktop only, since mobile SVG contains its own background accent) */}
            <img
              src="/images/notes/hero-spicepop.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom select-none hidden min-[500px]:block"
            />

            {/* Kudirat photo: circular crop on mobile, full hero portrait locked with spicepop on desktop */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full min-[500px]:inset-auto min-[500px]:left-[8.11%] min-[500px]:w-[85.91%] min-[500px]:top-[-1.49%] min-[500px]:h-[102.61%] min-[500px]:rounded-none min-[500px]:overflow-visible select-none">
              <Image
                src="/images/notes/kudirat-hero.png"
                alt="Kudirat Ijeoma Ibeabuchi, Founder of Reelnosh"
                fill
                priority
                sizes="(max-width: 499px) 64px, (max-width: 640px) 210px, (max-width: 768px) 270px, (max-width: 1024px) 340px, 450px"
                className="object-cover object-top min-[500px]:object-contain min-[500px]:object-bottom"
              />
            </div>
          </div>

          {/* Content Layer: exactly one H1, one description, one signature */}
          <div className="relative z-10 flex h-full flex-col justify-start pt-[82px] pl-[26px] pr-5 min-[500px]:justify-center min-[500px]:pt-3 sm:pt-4 md:pt-4 lg:pt-0 min-[500px]:pl-16 sm:pl-20 md:pl-28 tablet:pl-[105px] lg:pl-[120px] xl:pl-[130px] min-[500px]:pr-3 sm:pr-4 w-full min-[500px]:w-[68%] sm:w-[65%] md:w-[60%] tablet:w-[58%] lg:w-[54%] xl:w-[50%]">
            <h1 className="font-serif text-[24px] xs:text-[26px] min-[500px]:text-[19px] sm:text-2xl md:text-[30px] lg:text-[42px] xl:text-[50px] font-semibold leading-[1.15] min-[500px]:leading-[1.35] lg:leading-[1.18] xl:leading-[1.2] text-neutral-charcoal tracking-tight">
              Building{' '}
              <span className="italic text-clay dark:text-[#D79A8A] font-normal">Reelnosh</span>
              <br />
              <span className="inline-block mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-0">publicly.</span>
            </h1>

            <p className="mt-2.5 min-[500px]:mt-2 sm:mt-2.5 md:mt-3.5 lg:mt-4 font-sans text-[12.5px] sm:text-[13.5px] md:text-[15px] lg:text-[16px] xl:text-[17px] leading-[1.42] min-[500px]:leading-[1.5] md:leading-[1.6] lg:leading-[1.65] text-neutral-clayGray max-w-[268px] min-[500px]:max-w-[465px]">
              Hi, this is where I write honestly about what we&apos;re learning while building Reelnosh: the product decisions, the Lagos food scene, what you&apos;re teaching us, and yes, what we&apos;re still getting wrong.
            </p>

            <p className="mt-3.5 min-[500px]:mt-2 sm:mt-2.5 md:mt-3.5 lg:mt-5 font-serif italic font-normal text-neutral-charcoal text-[13.5px] min-[500px]:text-[12.5px] sm:text-sm md:text-[15px] lg:text-base xl:text-[17px]">
              - Kudirat
            </p>
          </div>
        </div>
      </section>

      {/* 2. Latest Note & All Notes Sections or Empty State */}
      {!hasContent ? (
        <section className="bg-neutral-warmWhite px-5 pb-20 pt-8 sm:px-8 md:px-12 min-[1120px]:px-0">
          <div className="max-w-[1120px] mx-auto">
            <ScrollReveal className="rounded-[20px] sm:rounded-[24px] border border-neutral-lightClay/70 bg-neutral-softCream p-8 sm:p-12 text-center max-w-xl mx-auto shadow-elevation1 my-8">
              <div className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-neutral-warmWhite dark:bg-[#FFF5FA] border border-neutral-lightClay/80 dark:border-[#FFF5FA] text-clay dark:text-[#8B3A2A] shadow-elevation1">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-9 sm:h-9 text-clay dark:text-[#8B3A2A]" aria-hidden="true">
                  <path d="M28.75 17.5C28.75 17.8315 28.6183 18.1495 28.3839 18.3839C28.1495 18.6183 27.8315 18.75 27.5 18.75H17.5C17.1685 18.75 16.8505 18.6183 16.6161 18.3839C16.3817 18.1495 16.25 17.8315 16.25 17.5C16.25 17.1685 16.3817 16.8505 16.6161 16.6161C16.8505 16.3817 17.1685 16.25 17.5 16.25H27.5C27.8315 16.25 28.1495 16.3817 28.3839 16.6161C28.6183 16.8505 28.75 17.1685 28.75 17.5ZM27.5 21.25H17.5C17.1685 21.25 16.8505 21.3817 16.6161 21.6161C16.3817 21.8505 16.25 22.1685 16.25 22.5C16.25 22.8315 16.3817 23.1495 16.6161 23.3839C16.8505 23.6183 17.1685 23.75 17.5 23.75H27.5C27.8315 23.75 28.1495 23.6183 28.3839 23.3839C28.6183 23.1495 28.75 22.8315 28.75 22.5C28.75 22.1685 28.6183 21.8505 28.3839 21.6161C28.1495 21.3817 27.8315 21.25 27.5 21.25ZM35 7.5V32.5C35 33.163 34.7366 33.7989 34.2678 34.2678C33.7989 34.7366 33.163 35 32.5 35H7.5C6.83696 35 6.20107 34.7366 5.73223 34.2678C5.26339 33.7989 5 33.163 5 32.5V7.5C5 6.83696 5.26339 6.20107 5.73223 5.73223C6.20107 5.26339 6.83696 5 7.5 5H32.5C33.163 5 33.7989 5.26339 34.2678 5.73223C34.7366 6.20107 35 6.83696 35 7.5ZM7.5 32.5H11.25V7.5H7.5V32.5ZM32.5 32.5V7.5H13.75V32.5H32.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-charcoal mb-2">
                Notes are on the way.
              </h2>
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
          </div>
        </section>
      ) : (
        <>
          {featuredNote && (
            <section className="bg-neutral-warmWhite px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 md:px-12 md:pt-10 min-[1120px]:px-0">
              <div className="max-w-[1120px] mx-auto">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-neutral-charcoal mb-4">
                  LATEST NOTE
                </h2>

                <ScrollReveal className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-neutral-lightClay/70 bg-neutral-softCream shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 md:grid-cols-12">
                  <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#8B3A2A] p-8 text-white sm:p-10 md:col-span-5">
                    <div className="absolute -right-16 -bottom-16 w-56 h-56 border border-white/15 rounded-full pointer-events-none" />
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 border border-white/15 rounded-full pointer-events-none" />
                    <div className="absolute -right-0 -bottom-0 w-24 h-24 border border-white/15 rounded-full pointer-events-none" />

                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-spicePop" />
                        {featuredNote.category}
                      </span>
                    </div>

                    <blockquote className="font-serif italic text-[24px] text-white leading-snug mt-8 sm:mt-12 relative z-10">
                      {featuredNote.quote}
                    </blockquote>
                  </div>

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
                        className="font-sans text-sm font-semibold text-clay dark:text-[#F4C16D] hover:underline inline-flex items-center gap-1.5 transition-all group cursor-pointer"
                      >
                        <span>Read full note</span>
                        <span className="sr-only">: {featuredNote.title}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 pointer-events-none transition-transform group-hover:translate-x-0.5 shrink-0 text-clay dark:text-[#F4C16D]">
                          <path d="M7.99976 3L12.9998 8L7.99976 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2.99609 7.875H12.9961" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {notes.length > 0 && (
            <section className="pb-16 sm:pb-20 px-5 sm:px-8 md:px-12 min-[1120px]:px-0">
              <div className="max-w-[1120px] mx-auto">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-neutral-charcoal">
                    ALL NOTES
                  </h2>
                  <span className="font-sans text-xs font-medium text-neutral-clayGray">
                    {notes.length} of {notes.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {notes.map((note) => (
                    <ScrollReveal key={note.id} delay={(notes.indexOf(note) % 3) * 80}>
                      <ArticleCard note={note} />
                    </ScrollReveal>
                  ))}
                </div>

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
