import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-neutral-warmWhite px-5 pt-4 sm:pt-6 md:pt-8 pb-14 sm:pb-18 text-center">
      <div className="pointer-events-none absolute left-[12%] top-[12%] h-32 w-32 rounded-full border border-clay/10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[15%] right-[10%] h-48 w-48 rounded-full border border-clay/10" aria-hidden="true" />
      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <div className="relative mb-6 h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
          <Image
            src="/images/404-light.webp"
            alt="Page not found illustration"
            fill
            priority
            sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
            className="object-contain dark:hidden"
          />
          <Image
            src="/images/404-dark.webp"
            alt="Page not found illustration"
            fill
            priority
            sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
            className="hidden object-contain dark:block"
          />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-semibold leading-tight text-neutral-charcoal sm:text-4xl lg:text-5xl">
          This page must still be in the kitchen.
        </h1>
        <p className="mb-8 max-w-md font-sans text-base leading-relaxed text-neutral-clayGray">
          We couldn&apos;t find what you were looking for, but there&apos;s plenty else cooking. Head back home, or see what we&apos;re exploring.
        </p>
        {/* CTAs side-by-side with slight space between */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-brand bg-[#8B3A2A] px-7 py-3.5 font-sans text-sm font-semibold text-[#FFFEFA] shadow-elevation1 transition-colors hover:bg-[#743022] active:bg-[#5A2418]"
          >
            Back to Home
          </Link>
          <Link
            href="/#exploring"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-brand border border-secondaryCta-border dark:border-[#D79A8A] bg-transparent hover:bg-secondaryCta-hoverBackground dark:hover:bg-[#342620] px-7 py-3.5 font-sans text-sm font-semibold text-clay dark:text-white transition-colors"
          >
            See what we&apos;re exploring
          </Link>
        </div>
      </div>
    </main>
  );
}
