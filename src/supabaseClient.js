import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sjzdpvwzolilzdlxagsq.supabase.co";
const supabaseKey = "sb_publishable_X_feMrt0bIbEpTq-K47blg_50G_Ccgq";

export const supabase = createClient(supabaseUrl, supabaseKey);
