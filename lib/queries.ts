import { supabase } from '@/lib/supabase/client';
import {
  FeaturedContentItem,
  SEED_HERO_CONTENT,
  SEED_EXPLORING_ITEMS,
} from './constants';

export async function getFeaturedContent(
  placement: 'hero' | 'exploring'
): Promise<FeaturedContentItem[]> {
  try {
    let query = supabase
      .from('featured_content')
      .select('*')
      .eq('placement', placement);

    if (placement === 'exploring') {
      query = query
        .order('is_featured', { ascending: false })
        .order('display_order', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (placement === 'hero') {
        return [SEED_HERO_CONTENT];
      }
      return SEED_EXPLORING_ITEMS;
    }

    return data as FeaturedContentItem[];
  } catch (err) {
    console.warn(`Error fetching featured content for ${placement}, using seed fallback:`, err);
    if (placement === 'hero') {
      return [SEED_HERO_CONTENT];
    }
    return SEED_EXPLORING_ITEMS;
  }
}
