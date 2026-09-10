import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { FounderNoteItem } from '@/lib/constants';
import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';
import { getFounderNoteBody } from '@/lib/notesContent';

export const revalidate = 300; // ISR, 5-minute refresh per specification

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageUrl = `https://reelnosh.com/founders-note/${slug}`;

  let title = "Founder's Note";
  let description = "What we're learning while building Reelnosh publicly.";
  let imageUrl = 'https://reelnosh.com/images/notes/note-detail-hero.png';
  let publishedAt: string | undefined = undefined;

  if (supabase) {
    try {
      const { data } = await supabase
        .from('founder_notes')
        .select('title, excerpt, cover_image_url, published_at')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        if (data.title) title = data.title;
        if (data.excerpt) description = data.excerpt;
        if (data.published_at) publishedAt = data.published_at;
        if (data.cover_image_url) {
          imageUrl = data.cover_image_url.startsWith('http')
            ? data.cover_image_url
            : `https://reelnosh.com${data.cover_image_url.startsWith('/') ? '' : '/'}${data.cover_image_url}`;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch founder note metadata from Supabase:', err);
    }
  }

  const fullTitle = `${title} | Reelnosh`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: 'Reelnosh',
      locale: 'en_NG',
      type: 'article',
      publishedTime: publishedAt,
      authors: ['Kudirat Ijeoma Ibeabuchi'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SingleFoundersNotePage({ params }: PageProps) {
  const { slug } = await params;

  if (!supabase) {
    notFound();
  }

  let note: FounderNoteItem | null = null;
  let relatedNotes: FounderNoteItem[] = [];

  try {
    const { data, error } = await supabase
      .from('founder_notes')
      .select('id, title, slug, excerpt, body_markdown, cover_image_url, published_at')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      notFound();
    }

    note = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || '',
      category: (data as any).category || 'PRODUCT THINKING',
      image: data.cover_image_url || '/images/notes/note-detail-hero.png',
      body_markdown: data.body_markdown || getFounderNoteBody(slug, data.excerpt),
      published_at: data.published_at,
      date: new Date(data.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const { data: otherNotes } = await supabase
      .from('founder_notes')
      .select('id, title, slug, excerpt, cover_image_url, published_at')
      .neq('slug', slug)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3);

    if (otherNotes) {
      relatedNotes = otherNotes.map((o, idx) => ({
        id: o.id,
        slug: o.slug,
        title: o.title,
        excerpt: o.excerpt || '',
        category: (o as any).category || 'COMMUNITY',
        image: o.cover_image_url || `/images/notes/note-${idx + 1}.png`,
        published_at: o.published_at,
        date: new Date(o.published_at).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        body_markdown: (o as any).body_markdown || getFounderNoteBody(o.slug, o.excerpt),
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch founder note from Supabase:', (err as Error)?.message || err);
    notFound();
  }

  if (!note) {
    notFound();
  }

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
