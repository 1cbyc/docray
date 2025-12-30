import { createClient } from '@supabase/storage-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function uploadToSupabase(path: string, file: File) {
  const { data, error } = await supabase.storage.from('contracts').upload(path, file);
  if (error) throw error;
  return data;
}
