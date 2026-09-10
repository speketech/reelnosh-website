import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { SEED_FOUNDER_NOTES, SEED_FEATURED_NOTE, FounderNoteItem } from '@/lib/constants';
import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';
import { getFounderNoteBody } from '@/lib/notesContent';

export const revalidate = 300; // ISR, 5-minute refresh

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getNoteBySlug(slug: string): Promise<FounderNoteItem | null> {
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
          image: data.image || matchedSeed?.image || '/images/notes/note-detail-hero.png',
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

  return note;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Note Not Found | Reelnosh",
      description: "The requested Founder's Note could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com';
  const noteUrl = `${siteUrl}/founders-note/${note.slug}`;
  const imageUrl = note.image?.startsWith('http')
    ? note.image
    : `${siteUrl}${note.image || '/images/notes/note-detail-hero.png'}`;

  return {
    title: `${note.title} | Reelnosh`,
    description: note.excerpt || "What we're learning while building Reelnosh publicly in Lagos.",
    alternates: {
      canonical: noteUrl,
    },
    openGraph: {
      title: note.title,
      description: note.excerpt || "What we're learning while building Reelnosh publicly in Lagos.",
      url: noteUrl,
      siteName: 'Reelnosh',
      type: 'article',
      publishedTime: note.published_at,
      authors: ['Kudirat Ijeoma Ibeabuchi'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.excerpt || "What we're learning while building Reelnosh publicly in Lagos.",
      images: [imageUrl],
      creator: '@reelnosh',
    },
  };
}

export default async function SingleFoundersNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  let relatedNotes: FounderNoteItem[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('id, title, slug, excerpt, published_at')
        .neq('slug', slug)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data && data.length > 0) {
        relatedNotes = data.map((item, idx) => {
          const seedMatch =
            SEED_FOUNDER_NOTES.find((n) => n.slug === item.slug) ||
            (SEED_FEATURED_NOTE.slug === item.slug ? SEED_FEATURED_NOTE : null);
          return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt || '',
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
      }
    } catch {
      // Fallback below
    }
  }

  if (relatedNotes.length === 0) {
    relatedNotes = [
      ...SEED_FOUNDER_NOTES,
      SEED_FEATURED_NOTE,
    ].filter((related) => related.slug !== slug).slice(0, 3);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.excerpt,
    datePublished: note.published_at,
    author: { '@type': 'Person', name: 'Kudirat Ijeoma Ibeabuchi' },
    publisher: {
      '@type': 'Organization',
      name: 'Reelnosh',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/brand/icon-mark.svg` },
    },
    mainEntityOfPage: `${siteUrl}/founders-note/${note.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <NoteDetailPageClient note={note} relatedNotes={relatedNotes} />
    </>
  );
}
