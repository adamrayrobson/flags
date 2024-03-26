import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_APP_SUPABASE_url;
const key = import.meta.env.VITE_APP_SUPABASE_KEY;

export const client = createClient(url, key);
