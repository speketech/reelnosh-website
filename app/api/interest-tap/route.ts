import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { interestTapSchema } from '@/lib/validation/interest';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = interestTapSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { meal_id, session_id } = result.data;
    const supabase = createServerSupabaseClient();
    if (!supabase) return NextResponse.json({ success: true, data: null, local: true }, { status: 201 });

    const { data, error } = await supabase
      .from('interest_taps')
      .insert([
        {
          meal_id,
          session_id: session_id || null,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Supabase interest tap notice:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Non-blocking: increment tap_count on featured_content row
    (async () => {
      try {
        const { error: rpcError } = await supabase.rpc('increment_featured_tap_count', {
          p_meal_id: meal_id,
        });

        if (rpcError) {
          // Fallback if RPC function is not created yet
          const { data: item } = await supabase
            .from('featured_content')
            .select('tap_count')
            .eq('id', meal_id)
            .maybeSingle();

          if (item) {
            const currentTaps = typeof item.tap_count === 'number' ? item.tap_count : 0;
            await supabase
              .from('featured_content')
              .update({ tap_count: currentTaps + 1 })
              .eq('id', meal_id);
          }
        }
      } catch (e) {
        console.warn('Non-blocking tap_count increment notice:', e);
      }
    })();

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
