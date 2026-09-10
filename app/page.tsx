import { supabase } from '@/lib/supabase/client';
import { FounderNoteItem } from '@/lib/constants';
import { getFounderNoteBody } from '@/lib/notesContent';
import { HomePageClient } from '@/components/home/HomePageClient';
import { Hero } from '@/components/sections/Hero';
import { Exploring } from '@/components/sections/Exploring';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reelnosh , Where Food Content Becomes Meals',
  description: 'Explore creator-led meal ideas, join early access, and help shape the first Reelnosh food Drops in Lagos.',
};

export const revalidate = 300; // ISR, 5-minute refresh per specification

export default async function HomePage() {
  // Query Supabase for latest 3 published founder notes
  let notes: FounderNoteItem[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('id, title, slug, excerpt, cover_image_url, published_at')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        notes = data.map((item, idx) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt || '',
          category: (item as any).category || 'COMMUNITY',
          image: item.cover_image_url || `/images/notes/note-${idx + 1}.png`,
          published_at: item.published_at,
          date: new Date(item.published_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          body_markdown: (item as any).body_markdown || getFounderNoteBody(item.slug, item.excerpt),
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
