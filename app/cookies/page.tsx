'use client';

import { useState } from 'react';
import { LegalPage, LegalSection } from '@/components/layout/LegalPage';

const sections: LegalSection[] = [
  {
    title: '1. What Are Cookies?',
    paragraphs: [
      'Cookies are small text files stored on your device when you visit a website. They help the site remember certain information about your visit and how the site is generally being used.',
      'At this stage, Reelnosh is a simple early-access website: a waitlist, some meal ideas, and a place to read what we\'re learning as we build. We use cookies only in ways that match that scope.',
    ],
  },
  {
    title: '2. Types of Cookies We Use',
    paragraphs: [
      'Essential cookies are required for the website to function correctly and are always on. Analytics cookies help us understand, in aggregate, how visitors use the site; they are optional and off by default.',
      'That\'s the complete list right now. We don\'t currently use functional cookies or marketing and advertising cookies.',
    ],
  },
  {
    title: '3. How We Use Cookies',
    bulletList: [
      'Remembering your preference: so we don\'t ask you about your cookie preferences on every visit.',
      'Understanding site performance: if you\'ve turned on analytics cookies, we use Google Analytics to understand how visitors use the website and improve the experience.',
    ],
    customContent: (
      <p className="mt-3 text-neutral-clayGray leading-relaxed">
        You can withdraw your consent to analytics cookies at any time through the Cookie Preferences panel below.
      </p>
    ),
  },
  {
    title: '4. Your Choices and Consent',
    paragraphs: [
      'You can manage your cookie preferences on this page at any time. Essential cookies cannot be turned off; analytics cookies are entirely your choice and start off. You can also manage or delete cookies through your browser settings.',
    ],
  },
  {
    title: '5. Third-Party Cookies',
    paragraphs: [
      'If you choose to enable analytics cookies, we use Google Analytics (GA4), a service provided by Google LLC, to collect aggregate insights on how visitors navigate and interact with our pages.',
      'Google Analytics uses cookies to gather pseudonymized usage information. It is strictly optional, completely off by default, and never loaded unless you explicitly toggle on Analytics cookies in the Cookie Preferences panel below.',
      'In addition, we use Vercel Analytics for core platform health and traffic measurement. Vercel Analytics is entirely cookieless, does not collect personal data, and does not require consent cookies.',
      'We do not currently use payment, delivery, advertising, or social-media tracking cookies on this website. As we add features that involve third-party services, we\'ll update this policy to reflect them.',
    ],
  },
  {
    title: '6. Updates to This Policy',
    paragraphs: [
      'As Reelnosh grows, this policy will be updated to reflect any new cookies or tracking. Updates will be reflected here with a new Last Updated date.',
    ],
  },
  {
    title: '7. Contact Us',
    paragraphs: ['Questions about our use of cookies? Reach us anytime at hello@reelnosh.com.'],
  },
];

export default function CookiesPage() {
  const [analytics, setAnalytics] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('reelnosh-analytics-consent') === 'granted'
  );
  const [saved, setSaved] = useState(false);

  const handleToggle = (checked: boolean) => {
    setAnalytics(checked);
    localStorage.setItem('reelnosh-analytics-consent', checked ? 'granted' : 'denied');
    window.dispatchEvent(new CustomEvent('reelnosh-consent-change', { detail: { granted: checked } }));
  };

  const savePreferences = () => {
    localStorage.setItem('reelnosh-analytics-consent', analytics ? 'granted' : 'denied');
    window.dispatchEvent(new CustomEvent('reelnosh-consent-change', { detail: { granted: analytics } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <LegalPage
      eyebrow="COOKIE POLICY"
      title="Cookie Policy"
      subtitle="Transparency and Control Over Your Browsing Data"
      updated="September 2026"
      intro="A few small files help this site remember you. Here's exactly what they do, and you can turn off anything that isn't essential."
      sections={sections}
    >
      <div className="mt-8 rounded-[16px] bg-neutral-softCream p-6 border border-neutral-lightClay/70">
        <h2 className="font-serif text-xl font-semibold text-neutral-charcoal">Cookie preferences</h2>
        <div className="mt-5 space-y-5">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="font-sans text-sm font-semibold text-neutral-charcoal">Essential cookies</p>
              <p className="text-sm text-neutral-clayGray">Required for the site to work</p>
            </div>
            <span className="rounded-full bg-neutral-lightClay px-3 py-1 text-xs font-semibold text-neutral-clayGray">
              Always on
            </span>
          </div>
          <label className="flex cursor-pointer items-center justify-between gap-5">
            <div>
              <span className="block font-sans text-sm font-semibold text-neutral-charcoal">Analytics cookies (Google Analytics)</span>
              <span className="block text-sm text-neutral-clayGray">Helps us understand site traffic and usage. Off by default.</span>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => handleToggle(event.target.checked)}
              className="h-5 w-5 accent-clay"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={savePreferences}
              className="rounded-brand bg-[#8B3A2A] px-5 py-3 text-sm font-semibold text-white shadow-elevation1 hover:bg-[#743022] active:bg-[#5F261A] transition-colors"
            >
              {saved ? 'Preferences saved' : 'Save preferences'}
            </button>
            {saved && (
              <span className="text-sm text-accent-herbGreen font-medium">
                Saved successfully
              </span>
            )}
          </div>
        </div>
      </div>
    </LegalPage>
  );
}
