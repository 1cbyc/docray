
import { prisma } from '../../server/context';

export async function exportAuditLog() {
  return prisma.auditLog.findMany();
}
