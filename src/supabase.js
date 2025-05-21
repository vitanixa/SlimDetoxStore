import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'public-anon-key'; // Replace with your actual key (env recommended)
export const supabase = createClient(supabaseUrl, supabaseKey);
