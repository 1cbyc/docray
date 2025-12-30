import type { NextApiRequest, NextApiResponse } from 'next';
import { deepSeekQuery } from '../../../lib/ai/deepseek';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  const result = await deepSeekQuery(text);
  res.status(200).json({ result });
}
