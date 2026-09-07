import { createServerSupabaseClient } from './server';

export interface UpdateFeaturedResult {
  updated: boolean;
  reason: string;
  currentFeaturedId?: string;
  newFeaturedId?: string;
  currentCount?: number;
  newCount?: number;
}

/**
 * Evaluates exploring items and dynamically updates is_featured based on tap_count.
 * 
 * Stability Rule:
 * Only promote a new leader if:
 * 1. candidate.tap_count > current.tap_count * 1.2 (at least 20% more taps)
 * 2. candidate.tap_count >= current.tap_count + 5 (at least 5 absolute taps ahead)
 * 
 * Cold start: If all items have 0 taps, retain existing order / is_featured flag.
 */
export async function updateFeaturedContent(): Promise<UpdateFeaturedResult> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { updated: false, reason: 'Supabase is not configured' };

  const { data: items, error } = await supabase
    .from('featured_content')
    .select('id, title, tap_count, is_featured, display_order')
    .eq('placement', 'exploring');

  if (error || !items || items.length === 0) {
    return {
      updated: false,
      reason: error ? `Database error: ${error.message}` : 'No exploring items found',
    };
  }

  // Find the currently featured item
  const currentFeatured = items.find((item) => item.is_featured);
  const currentCount = currentFeatured?.tap_count ?? 0;

  // Find the item with highest tap_count
  const sortedByTaps = [...items].sort((a, b) => (b.tap_count ?? 0) - (a.tap_count ?? 0));
  const candidate = sortedByTaps[0];
  const candidateCount = candidate?.tap_count ?? 0;

  // Cold-start condition: if top candidate has 0 or fewer taps, no change needed
  if (candidateCount <= 0) {
    return {
      updated: false,
      reason: 'Cold start: tap count is 0, keeping default order',
      currentFeaturedId: currentFeatured?.id,
      currentCount,
    };
  }

  // If top candidate is already featured, nothing to change
  if (currentFeatured && candidate.id === currentFeatured.id) {
    return {
      updated: false,
      reason: 'Current featured item remains the leader',
      currentFeaturedId: currentFeatured.id,
      currentCount,
    };
  }

  // Stability rule evaluation:
  // Must exceed current leader by at least 20% AND at least 5 absolute taps
  const percentExceeded = candidateCount > currentCount * 1.2;
  const absoluteExceeded = candidateCount >= currentCount + 5;

  if (!percentExceeded || !absoluteExceeded) {
    return {
      updated: false,
      reason: `Candidate ${candidate.id} (${candidateCount} taps) did not meet stability threshold over current ${currentFeatured?.id} (${currentCount} taps). Required: >${Math.floor(currentCount * 1.2)} AND >=${currentCount + 5}`,
      currentFeaturedId: currentFeatured?.id,
      newFeaturedId: candidate.id,
      currentCount,
      newCount: candidateCount,
    };
  }

  // Apply update: set all exploring items is_featured = false, then set candidate to true
  const { error: clearError } = await supabase
    .from('featured_content')
    .update({ is_featured: false })
    .eq('placement', 'exploring');

  if (clearError) {
    return {
      updated: false,
      reason: `Failed to clear current featured: ${clearError.message}`,
    };
  }

  const { error: updateError } = await supabase
    .from('featured_content')
    .update({ is_featured: true })
    .eq('id', candidate.id);

  if (updateError) {
    return {
      updated: false,
      reason: `Failed to set candidate as featured: ${updateError.message}`,
    };
  }

  return {
    updated: true,
    reason: `Promoted ${candidate.title || candidate.id} (${candidateCount} taps) over previous (${currentCount} taps)`,
    currentFeaturedId: currentFeatured?.id,
    newFeaturedId: candidate.id,
    currentCount,
    newCount: candidateCount,
  };
}
