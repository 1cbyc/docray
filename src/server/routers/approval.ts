import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../context';

export const approvalRouter = router({
  // Get all approvals
  getAll: publicProcedure.query(async () => {
    return await prisma.approval.findMany({
      include: {
        contract: true,
        approver: true,
      },
      orderBy: { decidedAt: 'desc' },
    });
  }),

  // Get approvals for a contract
  getByContract: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prisma.approval.findMany({
        where: { contractId: input },
        include: {
          approver: true,
        },
        orderBy: { decidedAt: 'desc' },
      });
    }),

  // Create approval
  create: publicProcedure
    .input(z.object({
      contractId: z.string(),
      approverId: z.string(),
      comments: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.approval.create({
        data: {
          contractId: input.contractId,
          approverId: input.approverId,
          status: 'PENDING',
          comments: input.comments,
        },
        include: {
          contract: true,
          approver: true,
        },
      });
    }),

  // Update approval status
  updateStatus: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
      comments: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.approval.update({
        where: { id: input.id },
        data: {
          status: input.status,
          comments: input.comments,
          decidedAt: new Date(),
        },
        include: {
          contract: true,
          approver: true,
        },
      });
    }),
});
