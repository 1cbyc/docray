import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/context';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const templates = await prisma.template.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(templates);
  }
  res.status(405).end();
}
