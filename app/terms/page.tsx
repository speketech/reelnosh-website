import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | Reelnosh',
  description: 'Where Content Becomes Meals: The Rules for Now',
};

const sections: LegalSection[] = [
  {
    title: '1. Introduction',
    paragraphs: [
      'Welcome to Reelnosh. These Terms of Service ("Terms") govern your use of the Reelnosh website (the "Platform"), operated by Reelnosh Ltd ("we," "us," or "our").',
      'Where we are right now: Reelnosh is currently an early-access website. You can join a waitlist as a Foodie or a Creator, express interest in meal ideas, and read our Founder\'s Notes. The Platform does not yet process orders, payments, or deliveries, that comes later, and these Terms will be expanded when it does. By using the Platform today, you agree to these Terms as they apply to this current stage.',
    ],
  },
  {
    title: '2. What Reelnosh Is, Right Now',
    paragraphs: [
      'Reelnosh is building toward a marketplace connecting food Creators with the people who want their meals. Today, the Platform lets you:',
    ],
    bulletList: [
      'Join the Foodie waitlist to hear about future Drops',
      'Join the Creator waitlist if you make food you\'d like to sell through Reelnosh',
      'Tap "I\'d order this" on meal ideas we\'re exploring, and optionally tell us what you\'d pay',
      'Read our Founder\'s Notes',
    ],
    customContent: (
      <p className="mt-4 text-neutral-clayGray leading-relaxed">
        No purchase, order, or payment happens on the Platform at this stage. Nothing you do here creates a transaction or a delivery.
      </p>
    ),
  },
  {
    title: '3. Who Can Use Reelnosh',
    paragraphs: [
      'You should be old enough, under the laws of your country, to agree to these Terms on your own behalf, or have a parent or guardian\'s permission to do so. You\'re responsible for providing accurate information when you join our waitlist.',
    ],
  },
  {
    title: '4. Your Content',
    paragraphs: [
      'If you submit information to us, like a description of what you cook, or an amount you\'d pay for a meal idea, you\'re confirming it\'s your own accurate information, and you\'re giving us permission to use it for the purpose you submitted it for (reaching out to you, understanding demand, planning future Drops).',
      'You retain ownership of anything you tell us about your own cooking or recipes. We don\'t claim ownership over it, and we don\'t use it to train any AI system without telling you first and asking for your permission.',
      'Our content: the Reelnosh name, logo, and website content belong to Reelnosh Ltd.',
    ],
  },
  {
    title: '5. Acceptable Use',
    paragraphs: ['You agree not to:'],
    bulletList: [
      'Use the Platform for any illegal purpose or to deceive others',
      'Submit false or misleading information when joining our waitlist',
      'Post harmful, offensive, or infringing content anywhere on the Platform',
      'Interfere with the security or normal functioning of the website',
    ],
  },
  {
    title: '6. Suspension',
    paragraphs: [
      'We may remove you from our waitlist or restrict your access to the Platform if you violate these Terms. We\'ll try to tell you why, where reasonably possible.',
    ],
  },
  {
    title: '7. No Warranty, Limited Liability',
    paragraphs: [
      'The Platform is provided as it is, while we\'re still building it. To the maximum extent permitted by Nigerian law, Reelnosh Ltd is not liable for indirect or consequential damages arising from your use of this early-access website. Since no purchases happen on the Platform at this stage, there is currently no payment amount to base a liability cap on, we\'ll define one clearly once transactions begin.',
    ],
  },
  {
    title: '8. Governing Law',
    paragraphs: [
      'These Terms are governed by the laws of the Federal Republic of Nigeria. Disputes will first be attempted to be resolved through good-faith conversation, and failing that, through the courts of Nigeria.',
    ],
  },
  {
    title: '9. Changes to These Terms',
    paragraphs: [
      'As Reelnosh grows, especially once live Drops, payments, and deliveries launch, these Terms will be substantially expanded to cover them. We\'ll notify you of material changes before they take effect.',
    ],
  },
  {
    title: '10. Contact Us',
    paragraphs: [
      'Questions about these Terms? Reach us at:',
    ],
    customContent: (
      <div className="rounded-xl border border-neutral-lightClay/70 bg-[#F7F3ED] p-5">
        <p className="font-serif font-semibold text-neutral-charcoal">Reelnosh Ltd</p>
        <p className="text-sm text-neutral-clayGray">Lagos, Nigeria</p>
        <p className="mt-2 text-sm text-neutral-charcoal">
          Email:{' '}
          <a href="mailto:legal@reelnosh.com" className="text-clay font-medium hover:underline">
            legal@reelnosh.com
          </a>
        </p>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS OF SERVICE"
      title="Terms of Service"
      subtitle="Where Content Becomes Meals: The Rules for Now"
      updated="September 2026"
      effectiveDate="Upon website launch"
      intro="Reelnosh is small and growing carefully. These terms exist so everyone knows exactly where they stand."
      sections={sections}
    />
  );
}
