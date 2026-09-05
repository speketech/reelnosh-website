import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center bg-neutral-warmWhite">
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-charcoal mb-4">
        Page not found
      </h1>
      <p className="font-sans text-base text-neutral-clayGray max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-clay text-white font-sans text-sm font-semibold rounded-brand hover:bg-clay-hover transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
