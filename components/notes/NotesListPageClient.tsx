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
import { getFounderNoteBody } from '@/lib/notesContent';

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
    category: string;
    quote: string;
    title: string;
    excerpt: string;
    body_markdown?: string;
  };
  notes: FounderNoteItem[];
}

export const NotesListPageClient: React.FC<NotesListPageClientProps> = ({
  featuredNote,
  notes,
}) => {
  const [isFoodieModalOpen, setIsFoodieModalOpen] = useState(false);
  const featuredBody = featuredNote.body_markdown || getFounderNoteBody(featuredNote.slug, featuredNote.excerpt);
  const featuredReadTime = calculateReadingTime(featuredBody);

  return (
    <main className="min-h-screen bg-neutral-warmWhite">
      {/* 1. Hero Section */}
      <section className="bg-neutral-warmWhite px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4 md:px-12 md:pt-8 md:pb-6 min-[1120px]:px-0">
        {/* Desktop Version (sm and up — covers tablets & iPad Mini) */}
        <div
          className="relative mx-auto hidden w-full max-w-[1072px] sm:block aspect-[1072/460] overflow-hidden"
          style={{
            borderRadius: '30.65% 21.46% 21.46% 12.26% / 71.43% 50% 50% 28.57%',
          }}
        >
          {/* Layer 1: Background Vector Frame (Cream container with border) */}
          <img
            src="/images/notes/hero-note-container.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain select-none"
          />

          {/* Layer 2: Visual Anchor — Spicepop accent + Kudirat photo
              - Desktop (lg+): original size (41.04% width, left-[54.1%])
              - Tablet / iPad Mini (sm to md): sized smaller (~28%–30% width) to accommodate smaller container sizes gracefully */}
          <div className="pointer-events-none absolute bottom-0 select-none sm:right-[2%] sm:w-[28%] sm:h-[85%] md:right-[3%] md:w-[30%] md:h-[88%] lg:left-[54.1%] lg:right-auto lg:w-[41.04%] lg:h-full">
            {/* Spicepop background shape */}
            <img
              src="/images/notes/hero-spicepop.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom select-none"
            />

            {/* Kudirat photo locked proportionally with spicepop shape */}
            <div className="pointer-events-none absolute left-[8.11%] w-[85.91%] top-[-1.49%] h-[102.61%] select-none">
              <Image
                src="/images/notes/kudirat-hero.png"
                alt="Kudirat Ijeoma Ibeabuchi, Founder of Reelnosh"
                fill
                priority
                sizes="(max-width: 768px) 250px, (max-width: 1024px) 320px, 450px"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Content Layer:
              - Left padding: pl-10 sm:pl-16 md:pl-24 lg:pl-[95px] xl:pl-[115px] to completely clear the top-left curve on iPad Mini & tablet
              - Heading leading: leading-[1.25] for clean, un-cramped line height
              - Max-width: w-[66%] sm:w-[66%] md:w-[62%] lg:w-[52%] */}
          <div className="relative z-10 flex h-full flex-col justify-center pl-8 sm:pl-16 md:pl-24 lg:pl-[95px] xl:pl-[115px] pr-4 w-[66%] sm:w-[66%] md:w-[62%] lg:w-[52%]">
            <h1 className="font-serif text-xl sm:text-2xl md:text-[30px] lg:text-[44px] xl:text-[50px] font-semibold leading-[1.25] text-neutral-charcoal tracking-tight">
              Building{' '}
              <span className="italic text-clay font-normal">Reelnosh</span>
              <br />
              publicly.
            </h1>

            <p className="mt-2.5 sm:mt-3 md:mt-4 lg:mt-5 font-sans text-xs sm:text-[13px] lg:text-[15px] leading-[1.5] lg:leading-[1.6] text-neutral-clayGray max-w-[465px]">
              Hi, this is where I write honestly about what we&apos;re learning while building Reelnosh: the product decisions, the Lagos food scene, what you&apos;re teaching us, and yes, what we&apos;re still getting wrong.
            </p>

            <p className="mt-2.5 sm:mt-3.5 md:mt-5 lg:mt-7 font-serif italic font-normal text-neutral-charcoal text-xs sm:text-sm md:text-base lg:text-[17px]">
              - Kudirat
            </p>
          </div>
        </div>

        {/* Mobile Version (< sm) */}
        <div className="relative mx-auto w-full max-w-[363px] sm:hidden aspect-[363/320]">
          {/* Layer 1: Background Vector Frame & Yellow Accent */}
          <img
            src="/images/notes/hero-note-image-mobile.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain select-none"
          />

          {/* Layer 2: Real Photo in Coded Circular Container */}
          <div className="pointer-events-none absolute left-[36.41%] top-[0%] h-[20%] w-[17.63%] overflow-hidden rounded-full select-none">
            <Image
              src="/images/notes/kudirat-hero.png"
              alt="Kudirat Ijeoma Ibeabuchi"
              fill
              priority
              sizes="64px"
              className="object-cover object-top"
            />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex h-full flex-col justify-start pt-[82px] pl-[26px] pr-5">
            <h1 className="font-serif text-[24px] xs:text-[26px] font-semibold leading-[1.15] text-neutral-charcoal tracking-tight">
              Building{' '}
              <span className="italic text-clay font-normal">Reelnosh</span>
              <br />
              publicly.
            </h1>

            <p className="mt-2.5 font-sans text-[12.5px] leading-[1.42] text-neutral-clayGray max-w-[268px]">
              Hi, this is where I write honestly about what we&apos;re learning while building Reelnosh: the product decisions, the Lagos food scene, what you&apos;re teaching us, and yes, what we&apos;re still getting wrong.
            </p>

            <p className="mt-3.5 font-serif italic font-normal text-neutral-charcoal text-[13.5px]">
              - Kudirat
            </p>
          </div>
        </div>
      </section>

      {/* 2. Latest Note Section , DESIGN_OVERRIDES §4: Clay pull-quote treatment only */}
      <section className="bg-neutral-warmWhite px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 md:px-12 md:pt-10 min-[1120px]:px-0">
        <div className="max-w-[1120px] mx-auto">
          {/* Eyebrow */}
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-neutral-charcoal mb-4">
            LATEST NOTE
          </h2>

          {/* Featured Split Card */}
          <ScrollReveal className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-neutral-lightClay/70 bg-[#F7F3ED] shadow-elevation1 transition-shadow duration-300 hover:shadow-elevation2 md:grid-cols-12">
            {/* Left Side: Deep Clay Quote Box */}
            <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-clay p-8 text-white sm:p-10 md:col-span-5">
              {/* Concentric Decorative Circular Lines */}
              <div className="absolute -right-16 -bottom-16 w-56 h-56 border border-white/15 rounded-full pointer-events-none" />
              <div className="absolute -right-8 -bottom-8 w-40 h-40 border border-white/15 rounded-full pointer-events-none" />
              <div className="absolute -right-0 -bottom-0 w-24 h-24 border border-white/15 rounded-full pointer-events-none" />

              {/* Top Meta: Category Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-spicePop" />
                  {featuredNote.category}
                </span>
              </div>

              {/* Bottom Quote */}
              {/* DESIGN_OVERRIDES §1: Quote role , 24px Lora italic, single size */}
              <blockquote className="font-serif italic text-[24px] text-white leading-snug mt-8 sm:mt-12 relative z-10">
                {featuredNote.quote}
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
                  className="font-sans text-sm font-semibold text-clay hover:underline inline-flex items-center gap-1.5 transition-all group cursor-pointer"
                >
                  <span>Read full note</span>
                  <span className="sr-only">: {featuredNote.title}</span>
                  <img src="/icons/forward-arrow.svg" alt="" aria-hidden="true" className="h-4 w-4 pointer-events-none transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. All Notes Grid Section */}
      <section className="pb-16 sm:pb-20 px-5 sm:px-8 md:px-12 min-[1120px]:px-0">
        <div className="max-w-[1120px] mx-auto">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[1.5px] text-neutral-charcoal">
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
