'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/faq';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-neutral-warmWhite dark:bg-[#1E1B18] py-16 md:py-[120px] transition-colors">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 md:px-12 min-[1120px]:px-0 md:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <div className="max-w-md">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#F4A11A]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-[#8B3A2A] dark:text-[#F4A11A]">CLEAR BEFORE CLAY</span>
          </div>
          <h2 className="font-serif text-[36px] font-semibold leading-[1.2] text-neutral-charcoal dark:text-[#FFFEFA]">Frequently Asked Questions</h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-neutral-clayGray dark:text-[#B9ADA4]">Everything in this first version is designed to help us learn, with you.</p>
        </div>

        <div className="border-t border-neutral-lightClay dark:border-[#4A352E]">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-neutral-lightClay dark:border-[#4A352E] py-5 sm:py-6">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-start justify-between gap-6 text-left group">
                  <span className="font-serif text-xl font-medium leading-snug text-neutral-charcoal dark:text-[#FFFEFA] group-hover:text-clay dark:group-hover:text-white transition-colors">{item.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F9F3F1] border border-[#E7DED5] text-[#8B3A2A] dark:bg-[#3C2B25] dark:border-[#4A352E] dark:text-white font-sans text-lg font-semibold leading-none transition-colors" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="mt-3 max-w-[680px] font-sans text-base leading-relaxed text-neutral-clayGray dark:text-[#B9ADA4]">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};