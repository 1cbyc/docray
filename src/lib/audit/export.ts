import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function exportAuditLog() {
  return prisma.auditLog.findMany();
}
