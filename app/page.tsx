import { getFounderNotes, getFeaturedContent } from '@/lib/supabase/queries';
import { HomePageClient } from '@/components/home/HomePageClient';
import { Hero } from '@/components/sections/Hero';
import { Exploring } from '@/components/sections/Exploring';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [notes, heroItems, exploringItems] = await Promise.all([
    getFounderNotes(3),
    getFeaturedContent('hero'),
    getFeaturedContent('exploring'),
  ]);

  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <>
      <div className="bg-yellow-500 text-black text-center py-2 text-sm z-50 relative">
        DEBUG INFO: ServiceKey={hasServiceKey ? 'YES' : 'NO'}, URL={hasUrl ? 'YES' : 'NO'}, HeroItems={heroItems.length}, ExploringItems={exploringItems.length}
      </div>
      <HomePageClient
        hero={<Hero content={heroItems[0]} />}
        exploring={<Exploring items={exploringItems} />}
        founderNotes={notes}
      />
    </>
  );
}
