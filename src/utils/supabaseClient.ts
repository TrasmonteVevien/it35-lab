import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lbmptucbkfjnmsakgxbp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibXB0dWNia2Zqbm1zYWtneGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjAzNDMsImV4cCI6MjA1ODQzNjM0M30.qLIJBbK9-pujjkyPsR79G7EwV-ngRNIHlDKEwAAQedo';

export const supabase = createClient(supabaseUrl, supabaseKey);