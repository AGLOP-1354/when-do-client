import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '@env';

export const supabase = createClient(
  PUBLIC_SUPABASE_URL || '',
  PUBLIC_SUPABASE_ANON_KEY || '',
);
