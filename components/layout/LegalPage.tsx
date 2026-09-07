import Link from 'next/link';

export interface LegalSection { title: string; paragraphs: string[] }

export function LegalPage({ eyebrow, title, updated, intro, sections, children }: { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[]; children?: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-neutral-warmWhite px-5 py-14 font-sans md:py-20">
      <div className="mx-auto max-w-[776px]">
        <nav className="mb-10 flex items-center gap-2 text-xs text-neutral-clayGray"><Link href="/" className="hover:text-clay">Home</Link><span>/</span><span className="text-clay">{title}</span></nav>
        <header className="border-b border-surface-divider pb-8"><p className="mb-3 text-xs font-semibold uppercase tracking-[1.2px] text-clay">{eyebrow}</p><h1 className="font-serif text-4xl font-semibold text-neutral-charcoal">{title}</h1><p className="mt-3 text-sm text-neutral-clayGray">Last Updated: {updated}</p><p className="mt-8 max-w-[680px] font-serif text-xl italic leading-relaxed text-neutral-clayGray">{intro}</p></header>
        {children}
        <div className="mt-10 space-y-10 text-base leading-relaxed text-neutral-charcoal">{sections.map((section) => <section key={section.title}><h2 className="mb-4 border-l-2 border-clay pl-3 font-serif text-xl font-semibold">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-3 text-neutral-clayGray">{paragraph}</p>)}</section>)}</div>
      </div>
    </main>
  );
}