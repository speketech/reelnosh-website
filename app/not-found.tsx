import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Reelnosh',
  description: "This page must still be in the kitchen. We couldn't find what you were looking for.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-neutral-warmWhite px-5 text-center">
      <div className="pointer-events-none absolute left-[12%] top-[18%] h-32 w-32 rounded-full border border-clay/10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[15%] right-[10%] h-48 w-48 rounded-full border border-clay/10" aria-hidden="true" />
      <div className="relative z-10 flex max-w-lg flex-col items-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-softCream border border-neutral-lightClay/70 font-serif text-2xl font-semibold text-clay shadow-xs">R</div>
        <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">404</p>
        <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-neutral-charcoal sm:text-5xl">
          This page must still be in the kitchen.
        </h1>
        <p className="mb-8 max-w-md font-sans text-base leading-relaxed text-neutral-clayGray">
          We couldn&apos;t find what you were looking for , but there&apos;s plenty else cooking. Head back home, or see what we&apos;re exploring.
        </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#8B3A2A] text-white font-sans text-sm font-semibold rounded-brand hover:bg-[#743022] active:bg-[#5F261A] transition-colors shadow-elevation1"
      >
        Back to Home
      </Link>
      <Link href="/#exploring" className="mt-5 font-sans text-sm text-clay underline underline-offset-4">See what we&apos;re exploring</Link>
      </div>
    </main>
  );
}
