import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://odosdhsejeqyhbktsioy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kb3NkaHNlamVxeWhia3RzaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTk0MTcsImV4cCI6MjA5NjgzNTQxN30.KRQ0MK8DTenyhXjhXKbl_1Rsryz77FmOAjVWnLn9taI";

export const supabase = createClient(supabaseUrl, supabaseKey);
