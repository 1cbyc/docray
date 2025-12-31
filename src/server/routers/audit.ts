import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../context';

export const auditRouter = router({
  // Get all audit logs
  getAll: publicProcedure.query(async () => {
    return await prisma.auditLog.findMany({
      include: {
        contract: true,
        user: true,
      },
      orderBy: { timestamp: 'desc' },
    });
  }),

  // Get audit logs for a contract
  getByContract: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prisma.auditLog.findMany({
        where: { contractId: input },
        include: {
          user: true,
        },
        orderBy: { timestamp: 'desc' },
      });
    }),

  // Create audit log
  create: publicProcedure
    .input(z.object({
      contractId: z.string().optional(),
      userId: z.string().optional(),
      action: z.string(),
      details: z.any().optional(),
      ipAddress: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.auditLog.create({
        data: {
          contractId: input.contractId,
          userId: input.userId,
          action: input.action,
          details: input.details,
          ipAddress: input.ipAddress,
        },
      });
    }),

  // Export audit logs (placeholder)
  export: publicProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      contractId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const where: any = {};
      if (input.startDate) where.timestamp = { gte: input.startDate };
      if (input.endDate) where.timestamp = { ...where.timestamp, lte: input.endDate };
      if (input.contractId) where.contractId = input.contractId;

      const logs = await prisma.auditLog.findMany({
        where,
        include: {
          contract: true,
          user: true,
        },
        orderBy: { timestamp: 'desc' },
      });

      // TODO: Implement actual export (CSV, PDF, etc.)
      return logs;
    }),
});
