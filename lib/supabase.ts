import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avyozwwgjoprnpjhopog.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2eW96d3dnam9wcm5wamhvcG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDQ3NTMsImV4cCI6MjEwMTQ4MDc1M30.C27zRjxGOAe_hsOHDXvr1BmCnFrr_aQJ2hNoiPcLJdg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
