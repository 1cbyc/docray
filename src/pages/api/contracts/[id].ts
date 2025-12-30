import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/context';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400).end();
  if (req.method === 'GET') {
    const contract = await prisma.contract.findUnique({ where: { id } });
    return res.status(200).json(contract);
  }
  res.status(405).end();
}
