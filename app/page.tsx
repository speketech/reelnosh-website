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

  return (
    <>
      {!hasServiceKey && (
        <div className="bg-red-500 text-white text-center py-2 text-sm z-50 relative">
          WARNING: SUPABASE_SERVICE_ROLE_KEY is missing from Vercel environment variables. Data cannot be fetched.
        </div>
      )}
      <HomePageClient
        hero={<Hero content={heroItems[0]} />}
        exploring={<Exploring items={exploringItems} />}
        founderNotes={notes}
      />
    </>
  );
}
