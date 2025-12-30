import type { NextApiRequest, NextApiResponse } from 'next';
import { exportAuditLog } from '../../../lib/audit/export';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = await exportAuditLog();
  res.status(200).json(logs);
}
