import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata: Metadata = { title: 'Terms of Service | Reelnosh', description: 'The rules for using Reelnosh during early access.' };
const sections = [
  { title: '1. Introduction', paragraphs: ['Welcome to Reelnosh. These Terms govern your use of the Reelnosh website, operated by Reelnosh Ltd. Reelnosh is currently an early-access website: you can join a waitlist, express interest in meal ideas, and read our Founder\'s Notes. The Platform does not yet process orders, payments, or deliveries.'] },
  { title: '2. What Reelnosh Is, Right Now', paragraphs: ['The Platform lets you join the Foodie or Creator waitlist, tap “I\'d order this” on meal ideas, optionally tell us what you would pay, and read our Founder\'s Notes. No purchase, order, or payment happens at this stage.'] },
  { title: '3. Who Can Use Reelnosh', paragraphs: ['You should be old enough under the laws of your country to agree to these Terms on your own behalf, or have a parent or guardian\'s permission. You\'re responsible for accurate waitlist information.'] },
  { title: '4. Your Content', paragraphs: ['If you submit information such as what you cook or what you would pay, you confirm it is accurate and give us permission to use it for the purpose submitted. You retain ownership of your cooking information. We do not use it to train an AI system without telling you first and asking permission. The Reelnosh name, logo, and website content belong to Reelnosh Ltd.'] },
  { title: '5. Acceptable Use', paragraphs: ['You agree not to use the Platform illegally or deceptively, submit false information, post harmful, offensive, or infringing content, or interfere with the security or normal functioning of the website.'] },
  { title: '6. Suspension', paragraphs: ['We may remove you from our waitlist or restrict your access if you violate these Terms. We\'ll try to tell you why where reasonably possible.'] },
  { title: '7. No Warranty, Limited Liability', paragraphs: ['The Platform is provided as it is while we\'re still building it. To the maximum extent permitted by Nigerian law, Reelnosh Ltd is not liable for indirect or consequential damages arising from your use of this early-access website.'] },
  { title: '8. Governing Law', paragraphs: ['These Terms are governed by the laws of the Federal Republic of Nigeria. Disputes will first be attempted to be resolved through good-faith conversation, and failing that, through the courts of Nigeria.'] },
  { title: '9. Changes to These Terms', paragraphs: ['As Reelnosh grows, especially once live Drops, payments, and deliveries launch, these Terms will be expanded. We\'ll notify you of material changes before they take effect.'] },
  { title: '10. Contact Us', paragraphs: ['Reelnosh Ltd, Lagos, Nigeria. Questions about these Terms: legal@reelnosh.com'] },
];
export default function TermsPage() { return <LegalPage eyebrow="TERMS OF SERVICE" title="Terms of Service" updated="September 2026" intro="Reelnosh is small and growing carefully. These terms exist so everyone knows exactly where they stand." sections={sections} />; }
