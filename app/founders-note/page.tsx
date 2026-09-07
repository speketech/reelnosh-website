import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase/client';
import {
  SEED_FOUNDER_NOTES,
  SEED_FEATURED_NOTE,
  FounderNoteItem,
} from '@/lib/constants';
import { NotesListPageClient } from '@/components/notes/NotesListPageClient';

export const revalidate = 300; // ISR, 5-minute refresh per specification

export const metadata: Metadata = {
  title: "Founder's Note | Reelnosh",
  description:
    'Real thinking from the team , on product decisions, the Lagos food scene, what the community is teaching us, and what we\'re getting wrong.',
};

export default async function FoundersNoteIndexPage() {
  let notes: FounderNoteItem[] = SEED_FOUNDER_NOTES;
  const featuredNote = SEED_FEATURED_NOTE;

  try {
    if (!supabase) throw new Error('Supabase is not configured');
    const { data, error } = await supabase
      .from('founder_notes')
      .select('id, title, slug, excerpt, published_at')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Merge supabase notes with seed data so images and categories are preserved
      notes = SEED_FOUNDER_NOTES.map((seed, idx) => {
        const dbMatch = data.find((d) => d.slug === seed.slug || d.id === seed.id);
        if (dbMatch) {
          return {
            ...seed,
            title: dbMatch.title || seed.title,
            excerpt: dbMatch.excerpt || seed.excerpt,
            published_at: dbMatch.published_at || seed.published_at,
          };
        }
        return seed;
      });
    }
  } catch (err) {
    console.warn('Using seed notes for founders-note index:', err);
  }

  return (
    <NotesListPageClient
      featuredNote={featuredNote}
      notes={notes}
    />
  );
}
