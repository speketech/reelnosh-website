import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { PRIVACY_POLICY_CONTENT, getLegalMetadata } from '@/lib/legalContent';

export const metadata: Metadata = getLegalMetadata(PRIVACY_POLICY_CONTENT, '/privacy');

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow={PRIVACY_POLICY_CONTENT.eyebrow}
      title={PRIVACY_POLICY_CONTENT.title}
      subtitle={PRIVACY_POLICY_CONTENT.subtitle}
      updated={PRIVACY_POLICY_CONTENT.updated}
      intro={PRIVACY_POLICY_CONTENT.intro}
      sections={PRIVACY_POLICY_CONTENT.sections}
    />
  );
}
