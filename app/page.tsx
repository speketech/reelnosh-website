import { getFeaturedContent } from '@/lib/queries';
import { supabase } from '@/lib/supabase/client';
import { SEED_FOUNDER_NOTES, SEED_FEATURED_NOTE, SEED_HERO_CONTENT, FounderNoteItem } from '@/lib/constants';
import { HomePageClient } from '@/components/home/HomePageClient';

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
  // Query Supabase for Hero & Exploring content
  const heroItems = await getFeaturedContent('hero');
  const exploringItems = await getFeaturedContent('exploring');

  // Query Supabase for latest 3 published founder notes
  let notes: FounderNoteItem[] = FALLBACK_NOTES;
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
    console.warn('Using seed founder notes on homepage:', err);
  }

  const heroItem = heroItems[0] || SEED_HERO_CONTENT;

  return (
    <HomePageClient
      heroItem={heroItem}
      exploringItems={exploringItems}
      founderNotes={notes}
    />
  );
}
