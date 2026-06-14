import { createClient } from '@supabase/supabase-js';

const VITE_SUPABASE_URL = "https://gmxkdtakhbpdqdqrpqmk.supabase.co";
const VITE_SUPABASE_ANON_KEY = "sb_publishable_gerFyLwlkxDUUNRrif1LeA_aRrrjjE-";

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

async function getUsers() {
  const { data, error } = await supabase.from('users').select('*');
  console.log("Users:", data);
  if (error) console.error("Error:", error);
}
getUsers();
