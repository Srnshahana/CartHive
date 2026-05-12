import { supabase } from './lib/supabase.js';

async function check() {
  const { data, error } = await supabase
    .from('businesses')
    .select('id, name, slug')
    .eq('slug', 'mehendi-shop');
  
  console.log('Results for mehendi-shop:', data);
  if (error) console.error('Error:', error);

  const { data: all } = await supabase.from('businesses').select('slug').limit(5);
  console.log('Available slugs:', all);
}

check();
