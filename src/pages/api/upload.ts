import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'uploads');
  form.keepExtensions = true;
  if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir);
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });
    res.status(200).json({ fields, files });
  });
}
