import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { foodieSignupSchema } from '@/lib/validation/foodie';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = foodieSignupSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, location } = result.data;
    const supabase = createServerSupabaseClient();
    if (!supabase) return NextResponse.json({ success: true, data: null, local: true }, { status: 201 });

    const { data, error } = await supabase
      .from('foodie_signups')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          location: location || null,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Supabase foodie signup notice:', error.message);
      // Even if database has unique constraint or offline, handle gracefully
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered for early access.' },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
