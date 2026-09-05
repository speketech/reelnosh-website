import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Reelnosh',
  description: 'Terms and conditions governing use of the Reelnosh platform.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-warmWhite px-5 py-14 md:py-20 font-sans">
      <div className="max-w-[760px] mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-clayGray">
          <Link href="/" className="hover:text-clay transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-clay font-medium">Terms of Service</span>
        </nav>

        <header className="pb-6 border-b border-surface-divider space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-charcoal">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-clayGray">
            Effective Date: August 2026
          </p>
        </header>

        <div className="space-y-6 text-sm sm:text-base text-neutral-charcoal leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              1. Platform Overview
            </h2>
            <p className="text-neutral-clayGray">
              Reelnosh facilitates limited-edition culinary drops in Lagos, Nigeria, partnering with independent food creators. By accessing our platform, you agree to these terms.
            </p>
            <p className="text-neutral-clayGray">
              [COPY NEEDED: Full legal terms of service]
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              2. Drop Orders & Reservations
            </h2>
            <p className="text-neutral-clayGray">
              Drops are strictly limited batch experiences. Reservation windows open for specified durations and close automatically once batch limits are reached.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              3. Inquiries
            </h2>
            <p className="text-neutral-clayGray">
              Questions regarding these terms may be directed to{' '}
              <a href="mailto:enquiries@reelnosh.com" className="text-clay hover:underline">
                enquiries@reelnosh.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
