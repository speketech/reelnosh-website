import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { FounderNoteItem } from '@/lib/constants';
import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';
import { getFounderNoteBody } from '@/lib/notesContent';

export const revalidate = 300; // ISR, 5-minute refresh

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getNoteBySlug(slug: string): Promise<FounderNoteItem | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('founder_notes')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || '',
      category: data.category || 'THE ROADMAP',
      image: data.image || data.cover_image_url || '/images/notes/note-detail-hero.png',
      body_markdown: data.body_markdown || getFounderNoteBody(slug, data.excerpt),
      published_at: data.published_at,
      date: new Date(data.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };
  } catch (err) {
    console.warn('Failed to fetch founder note from Supabase:', (err as Error)?.message || err);
    return null;
  }
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
        .select('id, title, slug, excerpt, published_at, category, image')
        .neq('slug', slug)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data && data.length > 0) {
        relatedNotes = data.map((item, idx) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt || '',
          category: item.category || 'COMMUNITY',
          image: item.image || `/images/notes/note-${((idx % 3) + 1)}.png`,
          published_at: item.published_at,
          date: new Date(item.published_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          body_markdown: '',
        }));
      }
    } catch (err) {
      console.warn('Failed to fetch related notes from Supabase:', (err as Error)?.message || err);
    }
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
