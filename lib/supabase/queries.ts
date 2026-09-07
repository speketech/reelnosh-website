import { createServerSupabaseClient } from './server';
import {
  FeaturedContentItem,
  SEED_HERO_CONTENT,
  SEED_EXPLORING_ITEMS,
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
      creator_username: row.creator_username || row.creator_handle?.replace(/^@/, '') || 'kudiratijeoma',
      source_post_url: row.source_post_url || row.creator_profile_url || 'https://instagram.com/kudiratijeoma',
      public_url: row.public_url || row.media_url || (placement === 'hero' ? SEED_HERO_CONTENT.public_url : '/images/drops/smokey-jollof.jpg'),
      media_url: row.media_url || row.public_url || (placement === 'hero' ? SEED_HERO_CONTENT.media_url : '/images/drops/smokey-jollof.jpg'),
      media_type: (row.media_type as 'image' | 'video') || 'image',
    })) as FeaturedContentItem[];
  } catch (err) {
    console.warn(`Exception querying featured_content for ${placement}:`, err);
    return [];
  }
}
