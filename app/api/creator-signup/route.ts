import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { creatorSignupSchema } from '@/lib/validation/creator';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = creatorSignupSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, instagram_handle, phone_or_email, what_they_cook } = result.data;
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('creator_signups')
      .insert([
        {
          name,
          instagram_handle,
          phone_or_email,
          what_they_cook: what_they_cook || null,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Supabase creator signup notice:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
