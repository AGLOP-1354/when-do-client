import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ilsrfizpwswsqvvtxlwp.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsc3JmaXpwd3N3c3F2dnR4bHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NTkyMTAsImV4cCI6MjAzMjUzNTIxMH0.Cf1Zbu6mo-VO0yXK4o3tjjoyavuVZcmC3Mv-wOCfVE0');
