import { supabase } from './supabase';

/**
 * Uploads a file to a specific Supabase bucket
 * @param {File} file - The file to upload
 * @param {string} bucket - The bucket name ('products', 'homepage', 'logos')
 * @returns {Promise<string>} - The public URL of the uploaded image
 */
export const uploadImage = async (file, bucket) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Supabase Upload Error:', uploadError);
      throw uploadError;
    }

    console.log(`Getting public URL for: ${filePath} in bucket: ${bucket}`);
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    if (!data || !data.publicUrl || data.publicUrl.includes(' ')) {
      console.error('INVALID URL DETECTED:', data?.publicUrl);
      throw new Error('Supabase returned an invalid or corrupted public URL.');
    }

    const finalUrl = data.publicUrl.trim();
    console.log('FINAL SANITIZED URL:', finalUrl);
    return finalUrl;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};
