import { supabase } from '@/lib/supabase/client';
import { SEED_FOUNDER_NOTES, SEED_FEATURED_NOTE, FounderNoteItem } from '@/lib/constants';
import { HomePageClient } from '@/components/home/HomePageClient';
import { Hero } from '@/components/sections/Hero';
import { Exploring } from '@/components/sections/Exploring';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reelnosh , Where Food Content Becomes Meals',
  description: 'Explore creator-led meal ideas, join early access, and help shape the first Reelnosh food Drops in Lagos.',
};

export const revalidate = 300; // ISR, 5-minute refresh per specification

// The featured note is shown first, then latest 2 from the seed list
const FALLBACK_NOTES: FounderNoteItem[] = [
  {
    id: SEED_FEATURED_NOTE.id,
    slug: SEED_FEATURED_NOTE.slug,
    title: SEED_FEATURED_NOTE.title,
    excerpt: SEED_FEATURED_NOTE.excerpt,
    date: SEED_FEATURED_NOTE.date,
    published_at: SEED_FEATURED_NOTE.published_at,
  },
  ...SEED_FOUNDER_NOTES.slice(0, 2),
];

export default async function HomePage() {
  // Query Supabase for latest 3 published founder notes
  let notes: FounderNoteItem[] = FALLBACK_NOTES;
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('id, title, slug, excerpt, published_at')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data && data.length > 0) {
        notes = data.map((item) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt || '',
          published_at: item.published_at,
          date: new Date(item.published_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
        }));
      }
    } catch (err) {
      console.warn('Failed to fetch founder notes from Supabase:', (err as Error)?.message || err);
    }
  }

  return (
    <HomePageClient
      hero={<Hero />}
      exploring={<Exploring />}
      founderNotes={notes}
    />
  );
}
