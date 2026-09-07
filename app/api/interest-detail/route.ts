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

    let parsedAmount: number | null = null;
    if (typeof amount_willing_to_pay === 'number') {
      parsedAmount = amount_willing_to_pay;
    } else if (typeof amount_willing_to_pay === 'string' && amount_willing_to_pay.trim() !== '') {
      const digits = amount_willing_to_pay.replace(/[^0-9]/g, '');
      parsedAmount = digits ? parseInt(digits, 10) : null;
    }

    if (!supabase) return NextResponse.json({ success: true, data: null, local: true }, { status: 201 });

    const { data, error } = await supabase
      .from('interest_details')
      .insert([
        {
          meal_id,
          session_id: session_id || null,
          amount_willing_to_pay: parsedAmount,
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
