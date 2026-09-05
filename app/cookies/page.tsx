import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Reelnosh',
  description: 'How Reelnosh uses cookies and local storage.',
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-neutral-warmWhite px-5 py-14 md:py-20 font-sans">
      <div className="max-w-[760px] mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-clayGray">
          <Link href="/" className="hover:text-clay transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-clay font-medium">Cookie Policy</span>
        </nav>

        <header className="pb-6 border-b border-surface-divider space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-charcoal">
            Cookie Policy
          </h1>
          <p className="text-sm text-neutral-clayGray">
            Effective Date: August 2026
          </p>
        </header>

        <div className="space-y-6 text-sm sm:text-base text-neutral-charcoal leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              1. What Are Cookies?
            </h2>
            <p className="text-neutral-clayGray">
              Cookies are small data files placed on your device to remember user sessions, keep track of interactions, and enhance site performance.
            </p>
            <p className="text-neutral-clayGray">
              [COPY NEEDED: Full cookie and analytics policy]
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              2. How We Use Them
            </h2>
            <p className="text-neutral-clayGray">
              We use essential session tokens to remember when you have expressed interest in a meal drop so you don&apos;t have to re-enter details repeatedly.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
