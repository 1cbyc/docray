import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const approvals = await prisma.approval.findMany({ orderBy: { decidedAt: 'desc' } });
    return res.status(200).json(approvals);
  }
  res.status(405).end();
}
