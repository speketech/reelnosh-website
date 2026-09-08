import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase/client';
import { SEED_FOUNDER_NOTES, SEED_FEATURED_NOTE, FounderNoteItem } from '@/lib/constants';
import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';
import { getFounderNoteBody } from '@/lib/notesContent';

export const revalidate = 300; // ISR, 5-minute refresh per specification

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seed = SEED_FOUNDER_NOTES.find((n) => n.slug === slug) ||
    (SEED_FEATURED_NOTE.slug === slug ? SEED_FEATURED_NOTE : null);
  return {
    title: `${seed ? seed.title : "Founder's Note"} | Reelnosh`,
    description: seed?.excerpt || "What we're learning while building Reelnosh publicly.",
  };
}

export default async function SingleFoundersNotePage({ params }: PageProps) {
  const { slug } = await params;

  const matchedSeed =
    SEED_FOUNDER_NOTES.find((n) => n.slug === slug) ||
    (SEED_FEATURED_NOTE.slug === slug ? SEED_FEATURED_NOTE : null);

  let note: FounderNoteItem | null = matchedSeed
    ? {
        ...matchedSeed,
        body_markdown: matchedSeed.body_markdown || getFounderNoteBody(slug, matchedSeed.excerpt),
      }
    : null;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        note = {
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || '',
          category: data.category || matchedSeed?.category || 'THE ROADMAP',
          image: data.image || matchedSeed?.image || '/images/notes/note-1.png',
          body_markdown: data.body_markdown || getFounderNoteBody(slug, data.excerpt || matchedSeed?.excerpt),
          published_at: data.published_at,
          date: new Date(data.published_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        };
      }
    } catch (err) {
      console.warn('Failed to fetch founder note from Supabase:', (err as Error)?.message || err);
    }
  }

  if (!note) {
    note = {
      id: slug,
      slug,
      title: slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      excerpt: '',
      image: '/images/notes/note-1.png',
      date: 'Aug 2026',
      published_at: new Date().toISOString(),
      body_markdown: getFounderNoteBody(slug),
    };
  }

  const relatedNotes = [
    ...SEED_FOUNDER_NOTES,
    SEED_FEATURED_NOTE,
  ].filter((related) => related.slug !== slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.excerpt,
    datePublished: note.published_at,
    author: { '@type': 'Person', name: 'Kudirat Ijeoma Ibeabuchi' },
    publisher: { '@type': 'Organization', name: 'Reelnosh', logo: { '@type': 'ImageObject', url: 'https://reelnosh.com/brand/icon-mark.svg' } },
    mainEntityOfPage: `https://reelnosh.com/founders-note/${note.slug}`,
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><NoteDetailPageClient note={note} relatedNotes={relatedNotes} /></>;
}
