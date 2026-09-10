import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase/client';
import {
  FeaturedFounderNoteItem,
  FounderNoteItem,
} from '@/lib/constants';
import { NotesListPageClient } from '@/components/notes/NotesListPageClient';
import { getFounderNoteBody } from '@/lib/notesContent';

export const revalidate = 300; // ISR, 5-minute refresh per specification

export const metadata: Metadata = {
  title: "Founder's Note | Reelnosh",
  description:
    'Real thinking from the team, on product decisions, the Lagos food scene, what the community is teaching us, and what we\'re getting wrong.',
  alternates: {
    canonical: 'https://reelnosh.com/founders-note',
  },
  openGraph: {
    title: "Founder's Note | Reelnosh",
    description:
      'Real thinking from the team, on product decisions, the Lagos food scene, what the community is teaching us, and what we\'re getting wrong.',
    url: 'https://reelnosh.com/founders-note',
    siteName: 'Reelnosh',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: 'https://reelnosh.com/images/notes/hero-note-image.png',
        width: 1200,
        height: 630,
        alt: "Founder's Note | Reelnosh",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Founder's Note | Reelnosh",
    description:
      'Real thinking from the team, on product decisions, the Lagos food scene, what the community is teaching us, and what we\'re getting wrong.',
    images: ['https://reelnosh.com/images/notes/hero-note-image.png'],
  },
};

export default async function FoundersNoteIndexPage() {
  let featuredNote: FeaturedFounderNoteItem | null = null;
  let notes: FounderNoteItem[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('id, title, slug, excerpt, body_markdown, cover_image_url, published_at')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formattedNotes: FounderNoteItem[] = data.map((item, idx) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt || '',
          category: (item as any).category || 'PRODUCT THINKING',
          image: item.cover_image_url || `/images/notes/note-${idx + 1}.png`,
          published_at: item.published_at,
          date: new Date(item.published_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          body_markdown: item.body_markdown || getFounderNoteBody(item.slug, item.excerpt),
        }));

        const first = formattedNotes[0];
        featuredNote = {
          ...first,
          quote: first.excerpt ? `"${first.excerpt.slice(0, 120)}..."` : `"${first.title}"`,
          category: first.category || 'PRODUCT THINKING',
        };
        notes = formattedNotes.slice(1);
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
