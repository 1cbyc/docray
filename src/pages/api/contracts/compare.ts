import type { NextApiRequest, NextApiResponse } from 'next';
import { deepSeekQuery } from '../../../lib/ai/deepseek';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { clause } = req.body;
  if (!clause) return res.status(400).json({ error: 'Missing clause' });
  const result = await deepSeekQuery(clause);
  res.status(200).json({ result });
}
