
import { prisma } from '../../server/context';

export async function logAudit(action: string, userId?: string, contractId?: string, details?: any) {
  await prisma.auditLog.create({
    data: {
      action,
      userId,
      contractId,
      details,
    },
  });
}
