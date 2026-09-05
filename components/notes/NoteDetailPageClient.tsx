'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { FounderNoteItem } from '@/lib/constants';
import { Modal } from '@/components/ui/Modal';
import { FoodieSignupForm } from '@/components/forms/FoodieSignupForm';
import { OriginAwareBackButton } from '@/components/notes/OriginAwareBackButton';

interface NoteDetailPageClientProps {
  note: FounderNoteItem;
  relatedNotes: FounderNoteItem[];
}

const defaultDeliveryNote = `
Building food discovery in Lagos without delivery feels like building half a car. We hear it every week: “When can I actually order through Reelnosh?”

The honest answer: delivery is a solved problem that breaks in complicated ways. Anyone can hire dispatch riders. Anyone can build a tracking screen. What nobody has solved in Lagos is trust between a food creator and someone who loves their food.

Logistics isn’t the moat. Consistency is. We’ve watched brilliant food businesses in Lagos get crushed by the weight of dispatch logistics before they even knew if their product-market fit was real. We refused to let that happen to the creators on Reelnosh.

## Why we cap the Drop instead of scaling the fleet

A typical food platform wants infinite volume. More orders, more riders, more commission. Reelnosh is built on the opposite premise: artificial scarcity creates real value. When a Drop is limited to 100 orders, quality stays uncompromised and the creator doesn’t burn out.

> "When a Drop is limited to 100 orders, quality stays uncompromised and the creator doesn't burn out."

Every Drop teaches us something that dispatch data never could: which dishes travel well, which packaging survives third mainland bridge, and which creators have an audience that actually shows up.

## What comes next: drops first, dispatch later

We will build delivery when the food experiences we’re enabling demand it — not because it’s the default thing a food tech company is supposed to do. Right now, pickup points and scheduled collection are teaching us more than a fleet of motorbikes ever could.

When we do build dispatch, it won’t look like the delivery apps you use today. It will be built specifically for time-sensitive, limited-quantity food drops where the handoff is part of the experience, not an afterthought.

If that sounds slow, good. We’d rather build something permanent than something fast that falls apart when it rains.
`;

const fallbackBody = (note: FounderNoteItem) => {
  if (
    note.slug === 'why-we-are-not-building-delivery-yet' ||
    note.title.toLowerCase().includes('delivery')
  ) {
    return defaultDeliveryNote.trim();
  }

  return `
${note.excerpt}

## What we're learning

${note.excerpt} This note captures the questions, conversations, and small decisions shaping Reelnosh as we build in public.

## The work behind the decision

We are taking this one step at a time. The useful answers come from real conversations with creators and diners, not assumptions made from a distance. Each Drop, reply, and moment of feedback helps us understand what should come next.

> Building carefully is still building. The constraint is the research.

## What comes next

We will keep listening, testing, and sharing what changes our minds. The work is deliberately open because the people this is for should help shape what Reelnosh becomes.
`.trim();
};

export const NoteDetailPageClient: React.FC<NoteDetailPageClientProps> = ({ note, relatedNotes }) => {
  const [isFoodieModalOpen, setIsFoodieModalOpen] = useState(false);
  const body = note.body_markdown || fallbackBody(note);

  return (
    <main className="bg-neutral-warmWhite min-h-screen">
      <article>
        {/* Top Section: Hero Image & Article Header */}
        <section className="px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 md:px-8 md:pb-16 md:pt-10">
          <div className="mx-auto max-w-[800px]">
            {/* Hero Image */}
            <picture className="mx-auto block w-full overflow-hidden rounded-[20px] sm:rounded-[32px] shadow-elevation1">
              <source media="(max-width: 767px)" srcSet="/images/notes/note-detail-hero-mobile.png" />
              <img
                src="/images/notes/note-detail-hero.png"
                alt={note.title}
                className="h-auto w-full object-cover"
              />
            </picture>

            {/* Back Button */}
            <div className="mb-6 mt-6 sm:mb-8 sm:mt-8">
              <OriginAwareBackButton fallbackHref="/founders-note" />
            </div>

            {/* Metadata Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2.5 font-sans text-xs text-neutral-clayGray">
              <span className="rounded-full bg-[#FCEEEA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.2px] text-clay">
                {note.category || 'THE ROADMAP'}
              </span>
              <span>{note.date}</span>
              <span className="text-neutral-lightClay">•</span>
              <span>{note.readTime || '5 min read'}</span>
            </div>

            {/* Article Title */}
            <h1 className="font-serif text-3xl font-semibold leading-[1.14] text-neutral-charcoal sm:text-4xl md:text-[46px] tracking-tight">
              {note.title}
            </h1>

            {/* Author Row */}
            <div className="mt-6 flex items-center gap-3 sm:mt-7">
              <Image
                src="/images/notes/kudirat-avatar.png"
                alt="Kudirat Ijeoma Ibeabuchi"
                width={48}
                height={48}
                className="rounded-full object-cover shrink-0"
              />
              <div>
                <p className="font-sans text-sm sm:text-[15px] font-semibold text-neutral-charcoal leading-snug">
                  Kudirat Ijeoma Ibeabuchi
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-clayGray">
                  Founder &amp; CEO, Reelnosh
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Body Content */}
        <section className="px-4 pb-14 sm:px-6 md:px-8 md:pb-20">
          <div className="mx-auto max-w-[800px] font-sans text-base leading-[1.8] text-neutral-charcoal sm:text-[17px]">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-10 mb-5 border-l-2 border-clay pl-4 font-serif text-xl sm:text-2xl font-semibold leading-tight text-neutral-charcoal">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="my-5 leading-[1.75] text-neutral-charcoal/90">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="relative my-9 overflow-hidden rounded-[16px] bg-[#F7F3ED] px-6 py-8 sm:px-12 sm:py-10 text-center shadow-xs">
                    {/* Decorative quote mark in top-left */}
                    <div
                      className="pointer-events-none absolute left-4 top-3 select-none opacity-[0.08]"
                      aria-hidden="true"
                    >
                      <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                        <path
                          d="M14.5 3C12.97 3.88 11.73 4.64 10.79 5.3C9.84 5.92 8.88 6.75 7.91 7.79C7 8.76 6.3 9.79 5.81 10.86C5.32 11.94 4.98 13.32 4.78 15.01H7.13C9.15 15.01 10.72 15.52 11.86 16.53C13.04 17.5 13.62 18.95 13.62 20.87C13.62 22.24 13.1 23.53 12.06 24.73C11.05 25.9 9.65 26.49 7.86 26.49C5.06 26.49 3.06 25.57 1.85 23.75C0.65 21.9 0.05 19.47 0.05 16.48C0.05 14.36 0.5 12.44 1.41 10.72C2.33 8.96 3.43 7.4 4.73 6.03C6.07 4.63 7.49 3.44 8.98 2.47C10.48 1.49 11.73 0.69 12.74 0.07L14.5 3ZM32.57 3C31.04 3.88 29.8 4.64 28.86 5.3C27.91 5.92 26.95 6.75 25.97 7.79C25.03 8.8 24.31 9.84 23.83 10.91C23.37 11.96 23.05 13.32 22.85 15.01H25.19C27.21 15.01 28.79 15.52 29.93 16.53C31.1 17.5 31.69 18.95 31.69 20.87C31.69 22.24 31.17 23.53 30.13 24.73C29.12 25.9 27.72 26.49 25.93 26.49C23.13 26.49 21.12 25.57 19.92 23.75C18.72 21.9 18.11 19.47 18.11 16.48C18.11 14.36 18.57 12.44 19.48 10.72C20.39 8.96 21.5 7.4 22.8 6.03C24.14 4.63 25.55 3.44 27.05 2.47C28.55 1.49 29.8 0.69 30.81 0.07L32.57 3Z"
                          fill="#8B3A2A"
                        />
                      </svg>
                    </div>

                    {/* Quote text: dynamic height based on text length */}
                    <div className="relative z-10 font-serif text-lg sm:text-[21px] italic leading-[1.6] text-neutral-charcoal max-w-[540px] mx-auto">
                      {children}
                    </div>

                    {/* Decorative center divider */}
                    <div
                      className="mt-6 flex items-center justify-center gap-2 relative z-10"
                      aria-hidden="true"
                    >
                      <span className="h-[1px] w-8 bg-[#C9A090]" />
                      <span className="h-1 w-1 rounded-full bg-clay opacity-50" />
                      <span className="h-[1px] w-8 bg-[#C9A090]" />
                    </div>
                  </blockquote>
                ),
              }}
            >
              {body}
            </ReactMarkdown>

            {/* Foodies Club Community Banner */}
            <div className="mt-14 rounded-[16px] bg-clay px-6 py-8 text-white sm:px-10 shadow-elevation1">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[1.2px] text-white/80">
                • FOODIES CLUB
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold sm:text-3xl">
                Join the community that&apos;s shaping Reelnosh.
              </h2>
              <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/80 max-w-xl">
                Get early access to food Drops, vote on what gets built, and be part
                of the conversations that happen before anything is announced.
              </p>
              <button
                type="button"
                onClick={() => setIsFoodieModalOpen(true)}
                className="mt-6 w-full rounded-brand bg-white px-6 py-3 font-sans text-sm font-semibold text-clay transition-colors hover:bg-[#F7F3ED] sm:w-auto cursor-pointer"
              >
                Join the Foodies Club
              </button>
            </div>
          </div>
        </section>

        {/* More Notes Section */}
        <section className="bg-[#F7F3ED] px-4 py-16 sm:px-6 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-8 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
              <span className="text-accent-spicePop">•</span> MORE NOTES
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNotes.map((related) => (
                <Link
                  key={related.id}
                  href={`/founders-note/${related.slug}`}
                  className="group overflow-hidden rounded-[16px] border border-neutral-lightClay bg-neutral-warmWhite shadow-elevation1 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation2 flex flex-col justify-between"
                >
                  <div className="relative aspect-[1.5] w-full overflow-hidden">
                    <Image
                      src={related.image || '/images/notes/note-1.png'}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[1.2px] text-clay">
                        • {related.category || 'COMMUNITY'}
                      </span>
                      <h3 className="mt-3 font-serif text-lg sm:text-xl font-semibold leading-snug text-neutral-charcoal group-hover:text-clay transition-colors">
                        {related.title}
                      </h3>
                    </div>
                    <p className="mt-4 font-sans text-xs text-neutral-clayGray">
                      {related.date} · {related.readTime || '5 min read'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* Community / Foodie Signup Modal */}
      <Modal
        isOpen={isFoodieModalOpen}
        onClose={() => setIsFoodieModalOpen(false)}
        title="Join the Foodies Club"
      >
        <FoodieSignupForm onSuccess={() => setIsFoodieModalOpen(false)} />
      </Modal>
    </main>
  );
};

