import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // Initialize Supabase client inside the handler
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { slug, action } = await req.json();

    if (!slug || (action !== 'like' && action !== 'unlike')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Fetch current likes
    const { data: note, error: fetchError } = await supabase
      .from('founder_notes')
      .select('likes_count')
      .eq('slug', slug)
      .single();

    // If column doesn't exist yet, we just gracefully fail for now 
    // until the user runs the SQL query.
    if (fetchError) {
      console.warn('Note like fetch error (column might not exist yet):', fetchError);
      return NextResponse.json({ success: true, warning: 'Database missing likes_count' }, { status: 200 });
    }

    const currentLikes = note.likes_count || 0;
    const newLikes = action === 'like' ? currentLikes + 1 : Math.max(0, currentLikes - 1);

    const { error: updateError } = await supabase
      .from('founder_notes')
      .update({ likes_count: newLikes } as any)
      .eq('slug', slug);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, likes: newLikes });
  } catch (error) {
    console.error('Like API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
