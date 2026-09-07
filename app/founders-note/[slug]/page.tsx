import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase/client';
import { SEED_FOUNDER_NOTES, SEED_FEATURED_NOTE, FounderNoteItem } from '@/lib/constants';
import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';

export const revalidate = 300; // ISR, 5-minute refresh per specification

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seed = SEED_FOUNDER_NOTES.find((n) => n.slug === slug);
  return {
    title: `${seed ? seed.title : "Founder's Note"} | Reelnosh`,
    description: seed?.excerpt || "What we're learning while building Reelnosh publicly.",
  };
}

export default async function SingleFoundersNotePage({ params }: PageProps) {
  const { slug } = await params;

  let note: FounderNoteItem | null =
    SEED_FOUNDER_NOTES.find((n) => n.slug === slug) ||
    (SEED_FEATURED_NOTE.slug === slug
      ? { ...SEED_FEATURED_NOTE, image: '/images/drops/smokey-jollof.jpg' }
      : null);

  try {
    if (!supabase) throw new Error('Supabase is not configured');
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
        body_markdown: data.body_markdown || '',
        published_at: data.published_at,
        date: new Date(data.published_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      };
    }
  } catch (err) {
    console.warn('Using seed note for single founder note:', err);
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
      date: 'Aug 2026',
      published_at: new Date().toISOString(),
      body_markdown: `
What we're learning while building Reelnosh publicly.

[COPY NEEDED: Full editorial body text for this note]
      `.trim(),
    };
  }

  const relatedNotes = [
    ...SEED_FOUNDER_NOTES,
    { ...SEED_FEATURED_NOTE, image: '/images/drops/smokey-jollof.jpg' },
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
