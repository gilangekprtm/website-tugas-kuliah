// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const missingVariables = [
  ['PUBLIC_SUPABASE_URL', supabaseUrl],
  ['PUBLIC_SUPABASE_PUBLISHABLE_KEY', supabasePublishableKey],
]
  .filter(([, value]) => !value?.trim())
  .map(([name]) => name);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing Supabase environment variable(s): ${missingVariables.join(', ')}. ` +
    'Copy .env.example to .env in the project root, fill in your Supabase project URL and publishable key, then restart Astro.'
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);