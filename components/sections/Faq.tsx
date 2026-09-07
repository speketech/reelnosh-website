'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/faq';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-neutral-warmWhite px-5 py-16 md:py-[120px]">
      <div className="mx-auto grid max-w-[1120px] gap-12 md:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <div className="max-w-md">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent-spicePop" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">CLEAR BEFORE CLEVER</span>
          </div>
          <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal">Frequently Asked Questions</h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-neutral-clayGray">Everything in this first version is designed to help us learn, with you.</p>
        </div>

        <div className="border-t border-neutral-lightClay">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-neutral-lightClay py-5 sm:py-6">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-start justify-between gap-6 text-left">
                  <span className="font-serif text-xl font-medium leading-snug text-neutral-charcoal">{item.question}</span>
                  <span className="shrink-0 font-sans text-2xl leading-none text-clay" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="mt-3 max-w-[680px] font-sans text-base leading-relaxed text-neutral-clayGray">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};