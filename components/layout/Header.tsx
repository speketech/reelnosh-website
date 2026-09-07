'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onOpenEarlyAccess?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEarlyAccess }) => {
  const pathname = usePathname();
  const isNotesActive = pathname?.startsWith('/founders-note');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const updateNavHeight = () => {
      document.documentElement.style.setProperty(
        '--nav-height',
        `${header.getBoundingClientRect().height}px`
      );
    };
    const resizeObserver = new ResizeObserver(updateNavHeight);
    resizeObserver.observe(header);
    updateNavHeight();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    intersectionObserver.observe(sentinel);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveAnchor(null);
      return;
    }

    const updateActiveAnchor = () => {
      const navHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      ) || 72;
      const sections = ['how-it-works', 'for-creators']
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((section): section is { id: string; element: HTMLElement } => Boolean(section.element));
      const passedSections = sections.filter(
        ({ element }) => element.getBoundingClientRect().top <= navHeight + 24
      );
      setActiveAnchor(passedSections.at(-1)?.id || null);
    };

    updateActiveAnchor();
    window.addEventListener('scroll', updateActiveAnchor, { passive: true });
    window.addEventListener('resize', updateActiveAnchor);
    return () => {
      window.removeEventListener('scroll', updateActiveAnchor);
      window.removeEventListener('resize', updateActiveAnchor);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/' || !window.location.hash) return;

    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const offset = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      ) || 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const handleHomeAnchor = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname !== '/') return;

    event.preventDefault();
    setActiveAnchor(id);
    const target = document.getElementById(id);
    if (!target) return;
    const offset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    ) || 0;
    window.history.pushState(null, '', `/#${id}`);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  };

  const navLinkClass = (isActive: boolean) =>
    `rounded-brand px-2 py-1 transition-colors duration-200 ${
      isActive ? 'text-clay' : 'hover:bg-neutral-softCream hover:text-clay'
    }`;

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-px" />
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
          isScrolled
            ? 'bg-neutral-warmWhite/95 backdrop-blur-md border-b border-surface-divider shadow-elevation1 h-[72px] py-3'
            : 'bg-neutral-warmWhite h-[72px] py-3'
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-5 md:px-0 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Reelnosh Home">
            <div className="relative h-8 w-32 sm:h-9 sm:w-36">
              <Image
                src="/brand/logo-primary.svg"
                alt="Reelnosh"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-5 font-sans text-base font-medium text-neutral-charcoal md:flex">
            <Link
              href="/#how-it-works"
              onClick={(event) => handleHomeAnchor(event, 'how-it-works')}
              className={navLinkClass(pathname === '/' && activeAnchor === 'how-it-works')}
            >
              How it works
            </Link>
            <Link
              href="/#for-creators"
              onClick={(event) => handleHomeAnchor(event, 'for-creators')}
              className={navLinkClass(pathname === '/' && activeAnchor === 'for-creators')}
            >
              For creators
            </Link>
            <Link
              href="/founders-note"
              className={navLinkClass(Boolean(isNotesActive))}
            >
              Founder&apos;s note
            </Link>
          </nav>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Full-size CTA , desktop only */}
            <Button
              onClick={onOpenEarlyAccess}
              size="md"
              className="hidden sm:inline-flex"
            >
              Join Early Access
            </Button>

            {/* Compact CTA , mobile only, always visible in header bar (DESIGN_OVERRIDES §6) */}
            <button
              type="button"
              onClick={onOpenEarlyAccess}
              className="sm:hidden inline-flex items-center justify-center rounded-brand bg-clay px-3 py-1.5 font-sans text-xs font-semibold text-white transition-colors hover:bg-clay-hover active:bg-clay-pressed"
            >
              Join Early Access
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-neutral-charcoal hover:text-clay rounded-md transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-charcoal/60 backdrop-blur-sm md:hidden transition-opacity">
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-neutral-warmWhite p-6 shadow-elevation2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-surface-divider">
                <div className="relative h-7 w-28">
                  <Image
                    src="/brand/logo-primary.svg"
                    alt="Reelnosh"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-neutral-charcoal hover:text-clay"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="py-6 flex flex-col gap-5 text-base font-sans font-medium text-neutral-charcoal">
                <Link
                  href="/#how-it-works"
                  onClick={(event) => {
                    setIsMobileMenuOpen(false);
                    handleHomeAnchor(event, 'how-it-works');
                  }}
                  className={navLinkClass(pathname === '/' && activeAnchor === 'how-it-works')}
                >
                  How it works
                </Link>
                <Link
                  href="/#for-creators"
                  onClick={(event) => {
                    setIsMobileMenuOpen(false);
                    handleHomeAnchor(event, 'for-creators');
                  }}
                  className={navLinkClass(pathname === '/' && activeAnchor === 'for-creators')}
                >
                  For creators
                </Link>
                <Link
                  href="/founders-note"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={navLinkClass(Boolean(isNotesActive))}
                >
                  Founder&apos;s note
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-divider">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenEarlyAccess) onOpenEarlyAccess();
                }}
                className="w-full"
              >
                Join Early Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
