import type { Metadata } from 'next';
import { getFounderNotes } from '@/lib/supabase/queries';
import { NotesListPageClient } from '@/components/notes/NotesListPageClient';
import { FOUNDERS_NOTES_INDEX_CONTENT } from '@/lib/notesContent';

export const revalidate = 300; // ISR, 5-minute refresh per specification

export const metadata: Metadata = {
  title: FOUNDERS_NOTES_INDEX_CONTENT.title,
  description: FOUNDERS_NOTES_INDEX_CONTENT.description,
  alternates: {
    canonical: '/founders-note',
  },
  openGraph: {
    title: `${FOUNDERS_NOTES_INDEX_CONTENT.title} | Reelnosh`,
    description: FOUNDERS_NOTES_INDEX_CONTENT.description,
    url: '/founders-note',
    siteName: 'Reelnosh',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${FOUNDERS_NOTES_INDEX_CONTENT.title} | Reelnosh`,
    description: FOUNDERS_NOTES_INDEX_CONTENT.description,
  },
};

export default async function FoundersNoteIndexPage() {
  const allNotes = await getFounderNotes();

  const featuredNote = allNotes.length > 0 ? allNotes[0] : null;
  const notes = allNotes.length > 1 ? allNotes.slice(1) : [];

  return (
    <NotesListPageClient
      featuredNote={featuredNote}
      notes={notes}
    />
  );
}
