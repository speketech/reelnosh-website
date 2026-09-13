import { createClient } from '@supabase/supabase-js';

export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (
    !supabaseUrl ||
    !supabaseServiceKey ||
    supabaseUrl.includes('your-project-id') ||
    supabaseServiceKey.includes('your-service-role-key')
  ) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
    global: {
      fetch: (url, options = {}) => {
        // Enforce a 15-second timeout so remote queries never stall server rendering
        const timeoutSignal = AbortSignal.timeout(15000);
        const signal = options.signal
          ? (typeof AbortSignal.any === 'function' ? AbortSignal.any([options.signal, timeoutSignal]) : options.signal)
          : timeoutSignal;
        return fetch(url, { ...options, signal });
      },
    },
  });
};
