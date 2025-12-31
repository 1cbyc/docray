import { uploadToS3 } from './s3';
import { uploadToR2 } from './r2';
import { uploadToSupabase } from './supabase';

export type StorageProvider = 's3' | 'r2' | 'supabase' | 'local';

export async function uploadFile(
  provider: StorageProvider,
  key: string,
  buffer: Buffer,
  contentType: string,
  file?: File
): Promise<string> {
  switch (provider) {
    case 's3':
      return await uploadToS3(key, buffer, contentType);
    case 'r2':
      return await uploadToR2(key, buffer, contentType);
    case 'supabase':
      if (!file) throw new Error('File object required for Supabase');
      const result = await uploadToSupabase(key, file);
      return `${process.env.SUPABASE_URL}/storage/v1/object/public/contracts/${key}`;
    case 'local':
      // For local development, save to uploads folder
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
      const filePath = path.join(uploadDir, key);
      fs.writeFileSync(filePath, buffer);
      return `/uploads/${key}`;
    default:
      throw new Error(`Unsupported storage provider: ${provider}`);
  }
}

// Get the configured storage provider
export function getStorageProvider(): StorageProvider {
  const provider = process.env.STORAGE_PROVIDER || 'local';
  if (!['s3', 'r2', 'supabase', 'local'].includes(provider)) {
    return 'local';
  }
  return provider as StorageProvider;
}