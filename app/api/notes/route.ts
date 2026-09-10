import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { SEED_FOUNDER_NOTES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!supabase) {
      const paginatedSeed = SEED_FOUNDER_NOTES.slice(offset, offset + limit);
      return NextResponse.json({ notes: paginatedSeed, total: SEED_FOUNDER_NOTES.length });
    }

    const { data, error } = await supabase
      .from('founder_notes')
      .select('id, title, slug, excerpt, cover_image_url, published_at')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // Return seed notes if database errors or unconfigured
      const paginatedSeed = SEED_FOUNDER_NOTES.slice(offset, offset + limit);
      return NextResponse.json({ notes: paginatedSeed, total: SEED_FOUNDER_NOTES.length });
    }

    return NextResponse.json({ notes: data || [], total: data?.length || 0 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
