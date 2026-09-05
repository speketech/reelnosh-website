import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { interestDetailSchema } from '@/lib/validation/interest';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = interestDetailSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { meal_id, session_id, amount_willing_to_pay, contact } = result.data;
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('interest_details')
      .insert([
        {
          meal_id,
          session_id: session_id || null,
          amount_willing_to_pay: amount_willing_to_pay ?? null,
          contact: contact || null,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Supabase interest detail notice:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
