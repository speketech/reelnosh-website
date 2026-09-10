import React from 'react';
import Link from 'next/link';

export interface LegalSection {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  bulletList?: string[];
  orderedList?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  customContent?: React.ReactNode;
}

export function LegalPage({
  eyebrow,
  title,
  subtitle,
  updated,
  effectiveDate,
  intro,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  updated: string;
  effectiveDate?: string;
  intro?: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-warmWhite px-5 py-14 font-sans md:py-20">
      <div className="mx-auto max-w-[776px]">
        <nav className="mb-10 flex items-center gap-2 text-xs text-neutral-clayGray">
          <Link href="/" className="hover:text-clay dark:hover:text-[#F4C16D]">
            Home
          </Link>
          <span>/</span>
          <span className="text-clay dark:text-[#F4C16D]">{title}</span>
        </nav>

        <header className="border-b border-neutral-lightClay/70 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[1.2px] text-clay dark:text-[#F4A11A]">
            {eyebrow}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-charcoal">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 font-serif text-xl sm:text-2xl text-neutral-charcoal/90 font-medium">
              {subtitle}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-clayGray">
            <span>
              <strong className="text-neutral-charcoal font-semibold">Last Updated:</strong>{' '}
              {updated}
            </span>
          </div>
          {intro && (
            <p className="mt-6 max-w-[680px] font-serif text-lg sm:text-xl italic leading-relaxed text-neutral-clayGray">
              {intro}
            </p>
          )}
        </header>

        {children}

        <div className="mt-10 space-y-12 text-base leading-relaxed text-neutral-charcoal">
          {sections.map((section) => (
            <section key={section.title} className="scroll-mt-12">
              <h2 className="mb-4 border-l-2 border-clay pl-3 font-serif text-xl font-semibold text-neutral-charcoal">
                {section.title}
              </h2>

              {section.subtitle && (
                <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-neutral-charcoal">
                  {section.subtitle}
                </p>
              )}

              {section.paragraphs?.map((paragraph, pIdx) => (
                <p key={pIdx} className="mb-4 text-neutral-clayGray leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {section.bulletList && (
                <ul className="mb-4 list-disc pl-5 space-y-2 text-neutral-clayGray">
                  {section.bulletList.map((item, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.orderedList && (
                <ol className="mb-4 list-decimal pl-5 space-y-2 text-neutral-clayGray">
                  {section.orderedList.map((item, oIdx) => (
                    <li key={oIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              )}

              {section.table && (
                <div className="my-6 overflow-x-auto rounded-xl border border-neutral-lightClay/70 shadow-xs">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-softCream text-neutral-charcoal font-semibold border-b border-neutral-lightClay/70">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-lightClay/40 bg-[var(--color-warm-white)]">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-neutral-warmWhite/50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3.5 text-neutral-clayGray align-top ${
                                cIdx === 0 ? 'font-semibold text-neutral-charcoal whitespace-nowrap' : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.customContent}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}