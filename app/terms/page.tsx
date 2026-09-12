import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { TERMS_OF_SERVICE_CONTENT, getLegalMetadata } from '@/lib/legalContent';

export const metadata: Metadata = getLegalMetadata(TERMS_OF_SERVICE_CONTENT, '/terms');

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow={TERMS_OF_SERVICE_CONTENT.eyebrow}
      title={TERMS_OF_SERVICE_CONTENT.title}
      subtitle={TERMS_OF_SERVICE_CONTENT.subtitle}
      updated={TERMS_OF_SERVICE_CONTENT.updated}
      intro={TERMS_OF_SERVICE_CONTENT.intro}
      sections={TERMS_OF_SERVICE_CONTENT.sections}
    />
  );
}
