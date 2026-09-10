import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com';
  let notes: Array<{ slug: string; published_at: string }> = [];

  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('founder_notes')
        .select('slug, published_at')
        .lte('published_at', new Date().toISOString());
      if (!error && data) {
        notes = data;
      }
    }
  } catch {
    // Keep notes empty on connection failure
  }

  return buildSitemap(baseUrl, notes);
}

function buildSitemap(baseUrl: string, notes: Array<{ slug: string; published_at: string }>): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/founders-note`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const notePages: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/founders-note/${note.slug}`,
    lastModified: new Date(note.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...notePages];
}
