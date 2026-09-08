import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Reelnosh',
  description: 'Transparency, Protection, and Data Dignity',
};

const sections: LegalSection[] = [
  {
    title: '1. Introduction and Our Commitment',
    paragraphs: [
      'Welcome to Reelnosh. We\'re building Africa\'s creator-led food marketplace, starting small, with a simple early-access waitlist while we get the first Drops right.',
      'We believe your data deserves the same care as anything else we\'re building. This Privacy Policy explains how Reelnosh Ltd ("we," "us," or "our") collects, uses, and protects the personal data of the Foodies and Creators who join our waitlist, and of visitors who use our website. By using our website, you agree to the practices described here.',
      'A note on where we are right now: Reelnosh does not yet process payments, orders, or deliveries, and does not yet operate a live marketplace. This policy reflects our current stage, an early-access website, and will be updated as the platform grows.',
    ],
  },
  {
    title: '2. Data We Collect',
    paragraphs: [
      'We only collect what\'s necessary to run this website and respond to your interest in Reelnosh.',
    ],
    table: {
      headers: ['Category', 'What We Collect', 'Why'],
      rows: [
        [
          'Foodie waitlist data',
          'Name, email address, and optionally your phone number and general location in Lagos',
          'To let you know when the first Drops are ready, and to understand where in Lagos to launch first',
        ],
        [
          'Creator waitlist data',
          'Name, Instagram handle, a phone number or email, and a description of what you cook or sell',
          'To reach out when we\'re ready to open Drops to creators, and to understand the kinds of food our community wants',
        ],
        [
          'Interest signals',
          'Anonymous taps on "I\'d order this" (no personal data, just a session identifier and which meal idea you tapped)',
          'To gauge genuine demand for meal ideas before committing creator time to them',
        ],
        [
          'Optional interest details',
          'If you choose to share it: an amount you\'d be willing to pay, and optional contact information',
          'To help us plan realistic pricing for future Drops, entirely optional, and never required to register your interest',
        ],
        [
          'Technical data',
          'Browser type, device information, and general usage patterns, only if you\'ve consented to analytics cookies (see our Cookie Policy)',
          'To understand how the website is performing and fix what isn\'t working',
        ],
      ],
    },
    customContent: (
      <p className="mt-4 text-neutral-clayGray leading-relaxed">
        <strong className="text-neutral-charcoal font-semibold">What we do not currently collect:</strong> payment or transaction data, delivery addresses, government-issued identification, or health and allergen information. We will update this policy before collecting any of these, if and when we introduce features that require them (for example, once Drops become a live, ordered, paid experience).
      </p>
    ),
  },
  {
    title: '3. How We Use Your Data',
    paragraphs: [
      'We rely on the following lawful bases under the Nigeria Data Protection Act (NDPA) 2023:',
    ],
    orderedList: [
      'Steps toward a future contract: processing your waitlist details so we can offer you early access once Drops open.',
      'Consent: for analytics cookies and any future marketing communications, which you can withdraw at any time.',
      'Legitimate interests: understanding aggregate interest in meal ideas (via anonymous interest taps) to decide what to build next.',
      'Legal obligation: where Nigerian law requires us to retain or disclose specific records.',
    ],
  },
  {
    title: '4. Data Sharing',
    paragraphs: [
      'We do not sell your personal data. We share it only in these limited ways:',
    ],
    bulletList: [
      'Infrastructure providers: we use Supabase to securely store waitlist and interest data. Supabase acts as our data processor and is contractually bound to protect your information.',
      'Legal requirements: if required by Nigerian law or a valid legal request.',
    ],
    customContent: (
      <p className="mt-4 text-neutral-clayGray leading-relaxed">
        We do not currently share your data with other businesses, advertisers, or third-party AI systems. If this changes as the platform grows, we\'ll update this policy and, where required, ask for your consent first.
      </p>
    ),
  },
  {
    title: '5. Your Rights as a Data Subject',
    paragraphs: [
      'Under the NDPA 2023, you can contact our team at privacy@reelnosh.com to:',
    ],
    bulletList: [
      'Access a copy of the data we hold about you',
      'Correct any inaccurate or incomplete information',
      'Delete your data (we\'ll remove it from our waitlist and systems, subject to any legal retention requirement)',
      'Object to us using your data for any future marketing communications',
    ],
  },
  {
    title: '6. Data Security and Retention',
    paragraphs: [
      'We use industry-standard security practices (including those provided by our infrastructure partners) to protect your data. We retain waitlist and interest data for as long as you remain on our waitlist, or until you ask us to delete it, whichever comes first.',
    ],
  },
  {
    title: '7. International Data Storage',
    paragraphs: [
      'Our infrastructure provider may store data on servers located outside Nigeria. Where this is the case, we take reasonable steps to ensure your data is protected to a standard consistent with the NDPA.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    paragraphs: [
      'As Reelnosh grows, particularly once we introduce live Drops, payments, or delivery, this policy will be updated to reflect new data practices, and we\'ll let you know when that happens.',
    ],
  },
  {
    title: '9. Contact Us',
    paragraphs: [
      'Questions about this policy or your data? Reach us anytime at hello@reelnosh.com.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY POLICY"
      title="Privacy Policy"
      subtitle="Transparency, Protection, and Data Dignity"
      updated="September 2026"
      intro="We collect only what we need to make Drops work, and we'll always tell you why."
      sections={sections}
    />
  );
}
