import type { NextApiRequest, NextApiResponse } from 'next';
import { extractTerms } from '../../../lib/ai/extractTerms';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  const terms = await extractTerms(text);
  res.status(200).json({ terms });
}
