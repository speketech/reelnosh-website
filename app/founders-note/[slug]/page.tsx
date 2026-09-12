import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFounderNoteBySlug, getRelatedFounderNotes } from '@/lib/supabase/queries';
import { NoteDetailPageClient } from '@/components/notes/NoteDetailPageClient';

export const revalidate = 300; // ISR, 5-minute refresh

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getFounderNoteBySlug(slug);

  if (!note) {
    return {
      title: "Note Not Found",
      description: "The requested Founder's Note could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com';
  const noteUrl = `${siteUrl}/founders-note/${note.slug}`;
  const imageUrl = note.image?.startsWith('http')
    ? note.image
    : `${siteUrl}${note.image || '/images/notes/kudirat-hero.png'}`;

  return {
    title: note.title,
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
  const note = await getFounderNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const relatedNotes = await getRelatedFounderNotes(slug, 3);

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
