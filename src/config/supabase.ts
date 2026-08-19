// this initializes a single Supabase client instance for the backend
// it uses the service role key for privileged server operations
import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// this is the shared Supabase admin client used to verify user JWTs
export const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
