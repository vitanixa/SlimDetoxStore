import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sjzdpvwzolilzdlxagsq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqemRwdnd6b2xpbHpkbHhhZ3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MTE5NDYsImV4cCI6MjA2MzI4Nzk0Nn0.Sntp9JoE4sSUO5M_D56JyBOSUaBK0f_QaW-mShlJiXk";

export const supabase = createClient(supabaseUrl, supabaseKey);

window.supabase = supabase;
