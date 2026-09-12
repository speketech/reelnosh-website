import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase/client';
import { FounderNoteItem } from '@/lib/constants';
import { NotesListPageClient } from '@/components/notes/NotesListPageClient';

export const revalidate = 300; // ISR, 5-minute refresh per specification

export const metadata: Metadata = {
  title: "Founder's Note | Reelnosh",
  description:
    'Real thinking from the team, on product decisions, the Lagos food scene, what the community is teaching us, and what we\'re getting wrong.',
};

export default async function FoundersNoteIndexPage() {
  let notes: FounderNoteItem[] = [];
  let featuredNote: (FounderNoteItem & { quote?: string }) | null = null;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('id, title, slug, excerpt, published_at, category, image, body_markdown, quote')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedNotes = data.map((item, idx) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt || '',
          quote: item.quote || item.excerpt || '',
          category: item.category || 'COMMUNITY',
          image: item.image || `/images/notes/note-${((idx % 3) + 1)}.png`,
          published_at: item.published_at,
          date: new Date(item.published_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          body_markdown: item.body_markdown || '',
        }));

        featuredNote = mappedNotes[0] || null;
        notes = mappedNotes.slice(1);
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
