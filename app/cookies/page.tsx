import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { COOKIE_POLICY_CONTENT, getLegalMetadata } from '@/lib/legalContent';
import { CookiePreferencesPanel } from '@/components/cookies/CookiePreferencesPanel';

export const metadata: Metadata = getLegalMetadata(COOKIE_POLICY_CONTENT, '/cookies');

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow={COOKIE_POLICY_CONTENT.eyebrow}
      title={COOKIE_POLICY_CONTENT.title}
      subtitle={COOKIE_POLICY_CONTENT.subtitle}
      updated={COOKIE_POLICY_CONTENT.updated}
      intro={COOKIE_POLICY_CONTENT.intro}
      sections={COOKIE_POLICY_CONTENT.sections}
    >
      <CookiePreferencesPanel />
    </LegalPage>
  );
}
