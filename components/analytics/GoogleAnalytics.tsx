'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const CONSENT_STORAGE_KEY = 'reelnosh-analytics-consent';
const SCRIPT_ID = 'google-analytics-gtag';
const INLINE_SCRIPT_ID = 'google-analytics-init';

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-REELNOSH01';
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    // Check initial consent state
    const checkConsent = () => {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      setHasConsent(stored === 'granted');
    };

    checkConsent();

    // Listen for custom event triggered from /cookies page
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ granted?: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.granted === 'boolean') {
        setHasConsent(customEvent.detail.granted);
      } else {
        checkConsent();
      }
    };

    // Listen for cross-tab or storage changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) {
        setHasConsent(e.newValue === 'granted');
      }
    };

    window.addEventListener('reelnosh-consent-change', handleConsentChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('reelnosh-consent-change', handleConsentChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!measurementId) return;

    if (hasConsent) {
      // 1. Enable tracking
      window[`ga-disable-${measurementId}`] = false;

      // 2. Inject gtag.js script if not present
      if (!document.getElementById(SCRIPT_ID)) {
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.appendChild(script);
      }

      // 3. Initialize dataLayer & gtag function if not present
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      if (!window.gtag) {
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
      }

      if (!document.getElementById(INLINE_SCRIPT_ID)) {
        const inlineScript = document.createElement('script');
        inlineScript.id = INLINE_SCRIPT_ID;
        inlineScript.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: true,
            anonymize_ip: true
          });
        `;
        document.head.appendChild(inlineScript);
      } else {
        // If script was already present, fire config
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
          send_page_view: true,
          anonymize_ip: true,
        });
      }
    } else {
      // TEARDOWN when consent is revoked or unset:
      // 1. Set Google Analytics disable flag
      window[`ga-disable-${measurementId}`] = true;

      // 2. Remove script tags from DOM
      const gtagScript = document.getElementById(SCRIPT_ID);
      if (gtagScript && gtagScript.parentNode) {
        gtagScript.parentNode.removeChild(gtagScript);
      }

      const inlineScript = document.getElementById(INLINE_SCRIPT_ID);
      if (inlineScript && inlineScript.parentNode) {
        inlineScript.parentNode.removeChild(inlineScript);
      }
    }
  }, [hasConsent, measurementId]);

  return null;
}
