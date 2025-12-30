import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const contracts = await prisma.contract.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(contracts);
  }
  res.status(405).end();
}
