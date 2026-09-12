import { createServerSupabaseClient } from './server';
import {
  FeaturedContentItem,
  FounderNoteItem,
} from '@/lib/constants';

export async function getFeaturedContent(
  placement: 'hero' | 'exploring'
): Promise<FeaturedContentItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('featured_content')
      .select('*')
      .eq('placement', placement)
      .eq('permission_confirmed', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.warn(`Error fetching featured content for ${placement}:`, error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((row: any) => ({
      ...row,
      creator_username: row.creator_username || row.creator_handle?.replace(/^@/, '') || '',
      source_post_url: row.source_post_url || row.creator_profile_url || '',
      public_url: row.public_url || row.media_url || '',
      media_url: row.media_url || row.public_url || '',
      media_type: (row.media_type as 'image' | 'video') || 'image',
    })) as FeaturedContentItem[];
  } catch (err) {
    console.warn(`Exception querying featured_content for ${placement}:`, err);
    return [];
  }
}

export async function getFounderNotes(limit?: number): Promise<FounderNoteItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return [];

    let query = supabase
      .from('founder_notes')
      .select('*')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Error fetching founder notes:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt || '',
      category: row.category || '',
      image: row.cover_image_url || row.image || '',
      published_at: row.published_at,
      date: new Date(row.published_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      body_markdown: row.body_markdown || '',
      quote: row.quote || row.excerpt || '',
      likes_count: row.likes_count || 0,
    }));
  } catch (err) {
    console.warn('Exception querying founder_notes:', err);
    return [];
  }
}

export async function getFounderNoteBySlug(slug: string): Promise<FounderNoteItem | null> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('founder_notes')
      .select('*')
      .eq('slug', slug)
      .lte('published_at', new Date().toISOString())
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn(`Error fetching note for slug ${slug}:`, error.message);
      return null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || '',
      category: data.category || '',
      image: data.cover_image_url || data.image || '',
      published_at: data.published_at,
      date: new Date(data.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      body_markdown: data.body_markdown || '',
      quote: data.quote || data.excerpt || '',
      likes_count: data.likes_count || 0,
    };
  } catch (err) {
    console.warn(`Exception querying founder note by slug ${slug}:`, err);
    return null;
  }
}

export async function getRelatedFounderNotes(
  currentSlug: string,
  limit: number = 3
): Promise<FounderNoteItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('founder_notes')
      .select('*')
      .neq('slug', currentSlug)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error || !data) {
      if (error) console.warn('Error fetching related notes:', error.message);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt || '',
      category: row.category || '',
      image: row.cover_image_url || row.image || '',
      published_at: row.published_at,
      date: new Date(row.published_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      body_markdown: row.body_markdown || '',
      quote: row.quote || row.excerpt || '',
      likes_count: row.likes_count || 0,
    }));
  } catch (err) {
    console.warn('Exception querying related founder notes:', err);
    return [];
  }
}
