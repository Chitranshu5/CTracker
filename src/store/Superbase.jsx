import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zarceugacnciuyqrguxx.supabase.co';
const supabaseAnonKey = 'sb_publishable_n3mWR99kyiacT9mll2ZSyA_rK88X8k8';



export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);