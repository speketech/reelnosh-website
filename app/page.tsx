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

export const revalidate = 300; // ISR, 5-minute refresh per specification

export default async function HomePage() {
  const [notes, heroItems, exploringItems] = await Promise.all([
    getFounderNotes(3),
    getFeaturedContent('hero'),
    getFeaturedContent('exploring'),
  ]);

  return (
    <HomePageClient
      hero={<Hero content={heroItems[0]} />}
      exploring={<Exploring items={exploringItems} />}
      founderNotes={notes}
    />
  );
}
