import React from 'react';
import type { Metadata } from 'next';
import { LegalSection } from '@/components/layout/LegalPage';

export interface LegalPolicyContent {
  eyebrow: string;
  title: string;
  subtitle?: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function getLegalMetadata(policy: LegalPolicyContent, pathname: string): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com';
  const canonicalUrl = `${siteUrl}${pathname}`;
  const pageTitle = `${policy.title} | Reelnosh`;
  const description = policy.intro || policy.subtitle || policy.title;

  return {
    title: policy.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: 'Reelnosh',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description,
    },
  };
}

export const COOKIE_POLICY_CONTENT: LegalPolicyContent = {
  eyebrow: 'COOKIE POLICY',
  title: 'Cookie Policy',
  subtitle: 'Transparency and Control Over Your Browsing Data',
  updated: 'September 2026',
  intro:
    "A few small files help this site remember you. Here's exactly what they do, and you can turn off anything that isn't essential.",
  sections: [
    {
      title: '1. What Are Cookies?',
      paragraphs: [
        'Cookies are small text files stored on your device when you visit a website. They help the site remember certain information about your visit and how the site is generally being used.',
        "At this stage, Reelnosh is a simple early-access website: a waitlist, some meal ideas, and a place to read what we're learning as we build. We use cookies only in ways that match that scope.",
      ],
    },
    {
      title: '2. Types of Cookies We Use',
      paragraphs: [
        'Essential cookies are required for the website to function correctly and are always on. Analytics cookies help us understand, in aggregate, how visitors use the site; they are optional and off by default.',
        "That's the complete list right now. We don't currently use functional cookies or marketing and advertising cookies.",
      ],
    },
    {
      title: '3. How We Use Cookies',
      bulletList: [
        "Remembering your preference: so we don't ask you about your cookie preferences on every visit.",
        "Understanding site performance: if you've turned on analytics cookies, we use Google Analytics to understand how visitors use the website and improve the experience.",
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
        "We do not currently use payment, delivery, advertising, or social-media tracking cookies on this website. As we add features that involve third-party services, we'll update this policy to reflect them.",
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
  ],
};

export const PRIVACY_POLICY_CONTENT: LegalPolicyContent = {
  eyebrow: 'PRIVACY POLICY',
  title: 'Privacy Policy',
  subtitle: 'Transparency, Protection, and Data Dignity',
  updated: 'September 2026',
  intro: "We collect only what we need to make Drops work, and we'll always tell you why.",
  sections: [
    {
      title: '1. Introduction and Our Commitment',
      paragraphs: [
        "Welcome to Reelnosh. We're building Africa's creator-led food marketplace, starting small, with a simple early-access waitlist while we get the first Drops right.",
        'We believe your data deserves the same care as anything else we\'re building. This Privacy Policy explains how Reelnosh Ltd ("we," "us," or "our") collects, uses, and protects the personal data of the Foodies and Creators who join our waitlist, and of visitors who use our website. By using our website, you agree to the practices described here.',
        'A note on where we are right now: Reelnosh does not yet process payments, orders, or deliveries, and does not yet operate a live marketplace. This policy reflects our current stage, an early-access website, and will be updated as the platform grows.',
      ],
    },
    {
      title: '2. Data We Collect',
      paragraphs: [
        "We only collect what's necessary to run this website and respond to your interest in Reelnosh.",
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
          We do not currently share your data with other businesses, advertisers, or third-party AI systems. If this changes as the platform grows, we'll update this policy and, where required, ask for your consent first.
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
  ],
};

export const TERMS_OF_SERVICE_CONTENT: LegalPolicyContent = {
  eyebrow: 'TERMS OF SERVICE',
  title: 'Terms of Service',
  subtitle: 'Where Content Becomes Meals: The Rules for Now',
  updated: 'September 2026',
  intro: 'Reelnosh is small and growing carefully. These terms exist so everyone knows exactly where they stand.',
  sections: [
    {
      title: '1. Introduction',
      paragraphs: [
        'Welcome to Reelnosh. These Terms of Service ("Terms") govern your use of the Reelnosh website (the "Platform"), operated by Reelnosh Ltd ("we," "us," or "our").',
        "Where we are right now: Reelnosh is currently an early-access website. You can join a waitlist as a Foodie or a Creator, express interest in meal ideas, and read our Founder's Notes. The Platform does not yet process orders, payments, or deliveries, that comes later, and these Terms will be expanded when it does. By using the Platform today, you agree to these Terms as they apply to this current stage.",
      ],
    },
    {
      title: '2. What Reelnosh Is, Right Now',
      paragraphs: [
        'Reelnosh is building toward a marketplace connecting food Creators with the people who want their meals. Today, the Platform lets you:',
      ],
      bulletList: [
        'Join the Foodie waitlist to hear about future Drops',
        "Join the Creator waitlist if you make food you'd like to sell through Reelnosh",
        'Tap "I\'d order this" on meal ideas we\'re exploring, and optionally tell us what you\'d pay',
        "Read our Founder's Notes",
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
        "You should be old enough, under the laws of your country, to agree to these Terms on your own behalf, or have a parent or guardian's permission to do so. You're responsible for providing accurate information when you join our waitlist.",
      ],
    },
    {
      title: '4. Your Content',
      paragraphs: [
        "If you submit information to us, like a description of what you cook, or an amount you'd pay for a meal idea, you're confirming it's your own accurate information, and you're giving us permission to use it for the purpose you submitted it for (reaching out to you, understanding demand, planning future Drops).",
        "You retain ownership of anything you tell us about your own cooking or recipes. We don't claim ownership over it, and we don't use it to train any AI system without telling you first and asking for your permission.",
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
        "We may remove you from our waitlist or restrict your access to the Platform if you violate these Terms. We'll try to tell you why, where reasonably possible.",
      ],
    },
    {
      title: '7. No Warranty, Limited Liability',
      paragraphs: [
        "The Platform is provided as it is, while we're still building it. To the maximum extent permitted by Nigerian law, Reelnosh Ltd is not liable for indirect or consequential damages arising from your use of this early-access website. Since no purchases happen on the Platform at this stage, there is currently no payment amount to base a liability cap on, we'll define one clearly once transactions begin.",
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
        "As Reelnosh grows, especially once live Drops, payments, and deliveries launch, these Terms will be substantially expanded to cover them. We'll notify you of material changes before they take effect.",
      ],
    },
    {
      title: '10. Contact Us',
      paragraphs: [
        'Questions about these Terms? Reach us anytime at hello@reelnosh.com.',
      ],
    },
  ],
};
