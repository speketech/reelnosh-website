'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_STORAGE_KEY = 'reelnosh-analytics-consent';

export const CookieConsentBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    // Only permanently suppress if consent was explicitly accepted ('granted')
    // If user hasn't accepted (declined or new session), banner reappears on reload/visit
    if (stored !== 'granted') {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ granted: boolean }>;
      if (customEvent.detail?.granted) {
        setIsClosing(true);
        setTimeout(() => setVisible(false), 200);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY && e.newValue === 'granted') {
        setIsClosing(true);
        setTimeout(() => setVisible(false), 200);
      }
    };

    window.addEventListener('reelnosh-consent-change', handleConsentChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('reelnosh-consent-change', handleConsentChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDecision = (granted: boolean) => {
    setIsClosing(true);
    if (granted) {
      // User accepted: permanently store so banner never appears on reloads or future visits
      localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    } else {
      // User declined: do not permanently save 'granted', so banner reappears on next reload/visit
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    }
    window.dispatchEvent(
      new CustomEvent('reelnosh-consent-change', { detail: { granted } })
    );
    setTimeout(() => setVisible(false), 200);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className={`fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-3xl z-[60] transition-all duration-300 ease-out ${
        isClosing
          ? 'translate-y-4 opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* 
        Solid, opaque container (no transparency) with rounded edges (rounded-brand, not pill shape)
        High contrast on both light and dark backgrounds
      */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 rounded-brand bg-white dark:bg-[#241E1C] px-6 py-4 sm:py-3.5 border border-[#E7DED5] dark:border-[#4A403A] shadow-elevation2 dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
        {/* Copy with high-contrast text in both themes: on dark mode 'Cookie Policy' CTA changes to white */}
        <p className="font-sans text-sm leading-relaxed text-center sm:text-left text-[#1E1B18] dark:text-[#FFFEFA]">
          We use cookies to improve your experience. By continuing, you agree to our{' '}
          <Link
            href="/cookies"
            className="font-semibold text-clay dark:text-white underline underline-offset-2 hover:text-clay-hover dark:hover:text-white/90 transition-colors"
          >
            Cookie Policy
          </Link>
          .
        </p>

        {/* Action buttons with rounded edges (not pill) and solid backgrounds (no transparent buttons) */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
          {/* Decline button: exact "I'd order this" button properties */}
          <button
            type="button"
            onClick={() => handleDecision(false)}
            className="flex-1 sm:flex-none h-[46px] px-5 text-sm font-semibold rounded-brand border border-[#D8B2A8] text-[#743022] bg-white hover:bg-secondaryCta-hoverBackground dark:bg-[#241E1C] dark:border-[#D79A8A] dark:text-white dark:hover:bg-[#342620] dark:hover:text-white dark:hover:border-white transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing"
          >
            Decline
          </button>

          {/* Accept button: primary deep clay */}
          <button
            type="button"
            onClick={() => handleDecision(true)}
            className="flex-1 sm:flex-none h-[46px] px-6 text-sm font-semibold rounded-brand bg-[#8B3A2A] hover:bg-[#743022] active:bg-[#5A2418] text-[#FFFEFA] shadow-elevation1 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
};
