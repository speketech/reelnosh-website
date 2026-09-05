import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Reelnosh',
  description: 'How Reelnosh collects, protects, and respects your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-warmWhite px-5 py-14 md:py-20 font-sans">
      <div className="max-w-[760px] mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-clayGray">
          <Link href="/" className="hover:text-clay transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-clay font-medium">Privacy Policy</span>
        </nav>

        <header className="pb-6 border-b border-surface-divider space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-charcoal">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-clayGray">
            Effective Date: August 2026
          </p>
        </header>

        <div className="space-y-6 text-sm sm:text-base text-neutral-charcoal leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              1. Information We Collect
            </h2>
            <p className="text-neutral-clayGray">
              When you join our early access waitlist, apply as a food creator, or express interest in upcoming meal drops, we collect relevant contact information including your name, email address, phone/WhatsApp number, and location in Lagos.
            </p>
            <p className="text-neutral-clayGray">
              [COPY NEEDED: Full legal privacy notice details]
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              2. How We Use Your Data
            </h2>
            <p className="text-neutral-clayGray">
              We use your information exclusively to notify you about upcoming drops, calibrate batch demand in specific Lagos delivery zones, and coordinate creator partnerships. We never sell your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">
              3. Contact
            </h2>
            <p className="text-neutral-clayGray">
              For any privacy-related questions, reach out to us at{' '}
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
