import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = await prisma.auditLog.findMany({ orderBy: { timestamp: 'desc' } });
  res.status(200).json(logs);
}
