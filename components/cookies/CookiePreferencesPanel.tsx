'use client';

import React, { useState } from 'react';

export function CookiePreferencesPanel() {
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
            <span className="block font-sans text-sm font-semibold text-neutral-charcoal">
              Analytics cookies (Google Analytics)
            </span>
            <span className="block text-sm text-neutral-clayGray">
              Helps us understand site traffic and usage. Off by default.
            </span>
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
            className="rounded-brand bg-clay px-5 py-3 text-sm font-semibold text-white hover:bg-clay-hover transition-colors"
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
  );
}
