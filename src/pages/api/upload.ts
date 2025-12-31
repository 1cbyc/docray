import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { uploadFile, getStorageProvider } from '../../lib/storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: 'No file provided' });

    try {
      const buffer = fs.readFileSync(file.filepath);
      const key = `contracts/${Date.now()}-${file.originalFilename}`;
      const contentType = file.mimetype || 'application/octet-stream';

      const provider = getStorageProvider();
      const url = await uploadFile(provider, key, buffer, contentType, file as any);

      // Clean up temp file
      fs.unlinkSync(file.filepath);

      res.status(200).json({
        url,
        provider,
        key,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
}
