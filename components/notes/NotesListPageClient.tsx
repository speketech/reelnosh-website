'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FounderNoteItem } from '@/lib/constants';
import { Modal } from '@/components/ui/Modal';
import { FoodieSignupForm } from '@/components/forms/FoodieSignupForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleCard } from './ArticleCard';

interface NotesListPageClientProps {
  featuredNote: {
    id: string;
    slug: string;
    date: string;
    readTime: string;
    category: string;
    quote: string;
    title: string;
    excerpt: string;
  };
  notes: FounderNoteItem[];
}

export const NotesListPageClient: React.FC<NotesListPageClientProps> = ({
  featuredNote,
  notes,
}) => {
  const [isFoodieModalOpen, setIsFoodieModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-warmWhite">
      {/* 1. Hero Section */}
      <section className="bg-neutral-warmWhite px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4 md:px-8 md:pt-8 md:pb-6">
        {/* Desktop Version (md and up) */}
        <div className="relative mx-auto hidden w-full max-w-[1072px] md:block aspect-[1072/460]">
          {/* Background & Artwork SVG */}
          <img
            src="/images/notes/hero-note-image.svg"
            alt="Kudirat Ijeoma Ibeabuchi, Founder of Reelnosh"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain select-none"
          />

          {/* Content Layer */}
          <div className="relative z-10 flex h-full flex-col justify-center pl-[50px] md:pl-[75px] lg:pl-[115px] pr-6 max-w-[580px]">
            <h1 className="font-serif text-3xl md:text-[38px] lg:text-[46px] xl:text-[50px] font-semibold leading-[1.12] text-neutral-charcoal tracking-tight">
              Building{' '}
              <span className="italic text-clay font-normal">Reelnosh</span>
              <br />
              publicly.
            </h1>

            <p className="mt-4 lg:mt-5 font-sans text-xs md:text-[13px] lg:text-[15px] leading-[1.6] text-neutral-clayGray max-w-[465px]">
              Real thinking from the team, on product decisions, the Lagos food
              scene, what the community is teaching us, and what we&apos;re getting
              wrong.
            </p>

            <p className="mt-5 lg:mt-7 font-serif italic font-normal text-neutral-charcoal text-sm md:text-base lg:text-[17px]">
              - Kudirat Ijeoma Ibeabuchi
            </p>
          </div>
        </div>

        {/* Mobile Version (< md) */}
        <div className="relative mx-auto w-full max-w-[363px] md:hidden aspect-[363/320]">
          {/* Background & Avatar SVG */}
          <img
            src="/images/notes/hero-note-image-mobile.svg"
            alt="Kudirat Ijeoma Ibeabuchi"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain select-none"
          />

          {/* Content Layer */}
          <div className="relative z-10 flex h-full flex-col justify-start pt-[82px] pl-[26px] pr-5">
            <h1 className="font-serif text-[24px] xs:text-[26px] font-semibold leading-[1.15] text-neutral-charcoal tracking-tight">
              Building{' '}
              <span className="italic text-clay font-normal">Reelnosh</span>
              <br />
              publicly.
            </h1>

            <p className="mt-2.5 font-sans text-[12.5px] leading-[1.42] text-neutral-clayGray max-w-[268px]">
              Real thinking from the team — on product decisions, the Lagos food
              scene, what the community is teaching us, and what we&apos;re getting
              wrong.
            </p>

            <p className="mt-3.5 font-serif italic font-normal text-neutral-charcoal text-[13.5px]">
              - Kudirat Ijeoma Ibeabuchi
            </p>
          </div>
        </div>
      </section>

      {/* 2. Latest Note Section — DESIGN_OVERRIDES §4: Clay pull-quote treatment only */}
      <section className="bg-neutral-warmWhite px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 md:px-0 md:pt-10">
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

              {/* Top Meta */}
              <div className="relative z-10">
                <span className="text-xs text-white/80 font-medium block mb-2">
                  {featuredNote.date}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-spicePop" />
                  {featuredNote.category}
                </span>
              </div>

              {/* Bottom Quote */}
              {/* DESIGN_OVERRIDES §1: Quote role — 24px Lora italic, single size */}
              <blockquote className="font-serif italic text-[24px] text-white leading-snug mt-8 sm:mt-12 relative z-10">
                {featuredNote.quote}
              </blockquote>
            </div>

            {/* Right Side: Note Summary and CTA */}
            <div className="flex flex-col justify-between p-8 sm:p-10 md:col-span-7">
              <div>
                <span className="font-sans text-xs font-medium text-neutral-clayGray block mb-3">
                  {featuredNote.readTime}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-charcoal leading-snug mb-3 hover:text-clay transition-colors">
                  <Link href={`/founders-note/${featuredNote.slug}`}>
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
                  className="font-sans text-sm font-semibold text-clay hover:underline inline-flex items-center gap-1.5 transition-all group"
                >
                  Read full note{' '}
                  <span>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. All Notes Grid Section */}
      <section className="pb-16 sm:pb-20 px-5 sm:px-8 md:px-0">
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
            {/* Center Circle Arrow */}
            <div className="w-12 h-12 rounded-full bg-white border border-neutral-lightClay flex items-center justify-center text-clay mx-auto mb-5 shadow-xs">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-charcoal mb-2">
              You&apos;ve read them all.
            </h3>

            <p className="font-sans text-sm text-neutral-clayGray leading-relaxed mb-4">
              New notes drop as we keep building. Join the community to be the
              first to know.
            </p>

            <button
              type="button"
              onClick={() => setIsFoodieModalOpen(true)}
              className="font-sans text-sm font-semibold text-clay hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              Join the Reelnosh community ↗
            </button>
          </div>
        </div>
      </section>

      {/* Community / Foodie Signup Modal */}
      <Modal
        isOpen={isFoodieModalOpen}
        onClose={() => setIsFoodieModalOpen(false)}
        title="Stay close to what we're building"
      >
        <FoodieSignupForm
          onSuccess={() => setIsFoodieModalOpen(false)}
        />
      </Modal>
    </main>
  );
};
