import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!supabase) {
      return NextResponse.json({ notes: [], total: 0 });
    }

    const { data, error, count } = await supabase
      .from('founder_notes')
      .select('id, title, slug, excerpt, cover_image_url, published_at', { count: 'exact' })
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      notes: data || [],
      total: count ?? (data?.length || 0),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
