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
    'Real thinking from the team, on product decisions, the Lagos food scene, what the community is teaching us, and what we\'re getting wrong.',
};

export default async function FoundersNoteIndexPage() {
  let notes: FounderNoteItem[] = SEED_FOUNDER_NOTES;
  let featuredNote: (FounderNoteItem & { quote?: string }) | null = SEED_FEATURED_NOTE;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('id, title, slug, excerpt, published_at')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (!error && data) {
        if (data.length === 0) {
          notes = [];
          featuredNote = null;
        } else {
          const mappedNotes = data.map((item, idx) => {
            const seedMatch =
              SEED_FOUNDER_NOTES.find((s) => s.slug === item.slug || s.id === item.id) ||
              (SEED_FEATURED_NOTE.slug === item.slug ? SEED_FEATURED_NOTE : null);

            return {
              id: item.id,
              slug: item.slug,
              title: item.title,
              excerpt: item.excerpt || '',
              quote: (seedMatch && 'quote' in seedMatch) ? (seedMatch as { quote?: string }).quote : item.excerpt || '',
              category: seedMatch?.category || 'COMMUNITY',
              image: seedMatch?.image || `/images/notes/note-${((idx % 3) + 1)}.png`,
              published_at: item.published_at,
              date: new Date(item.published_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              }),
              body_markdown: seedMatch?.body_markdown || '',
            };
          });

          featuredNote = mappedNotes[0] || null;
          notes = mappedNotes.slice(1);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch founder notes from Supabase:', (err as Error)?.message || err);
    }
  }

  return (
    <NotesListPageClient
      featuredNote={featuredNote}
      notes={notes}
    />
  );
}
