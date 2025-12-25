import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pjjvfuvesekvlmeipzuu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqanZmdXZlc2VrdmxtZWlwenV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1OTEzMDMsImV4cCI6MjA4MjE2NzMwM30.Bk4CncTvVQL1zegoov6n-YOOSOtU6luR9eoY40zTx3g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
