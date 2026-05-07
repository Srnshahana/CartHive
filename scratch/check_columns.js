import { createClient } from '@supabase/supabase-base';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  const { data, error } = await supabase.from('homepage_content').select('*').limit(1);
  if (error) {
    console.error('Error fetching homepage_content:', error);
  } else {
    console.log('Columns in homepage_content:', Object.keys(data[0] || {}));
  }
}

checkColumns();
