import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../context';

export const contractRouter = router({
  // Get all contracts
  getAll: publicProcedure.query(async () => {
    return await prisma.contract.findMany({
      include: {
        parties: true,
        signatures: true,
        approvals: true,
        createdBy: true,
        template: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  // Get contract by ID
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prisma.contract.findUnique({
        where: { id: input },
        include: {
          parties: true,
          signatures: true,
          approvals: true,
          createdBy: true,
          template: true,
          files: true,
        },
      });
    }),

  // Create contract
  create: publicProcedure
    .input(z.object({
      title: z.string(),
      fileUrl: z.string(),
      createdById: z.string(),
      templateId: z.string().optional(),
      parties: z.array(z.object({
        name: z.string(),
        role: z.string(),
      })).optional(),
    }))
    .mutation(async ({ input }) => {
      const contract = await prisma.contract.create({
        data: {
          title: input.title,
          status: 'DRAFT',
          fileUrl: input.fileUrl,
          createdById: input.createdById,
          templateId: input.templateId,
          parties: input.parties ? {
            create: input.parties.map(party => ({
              name: party.name,
              role: party.role,
            })),
          } : undefined,
        },
        include: {
          parties: true,
          createdBy: true,
        },
      });
      return contract;
    }),

  // Update contract
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      status: z.enum(['DRAFT', 'IN_REVIEW', 'SIGNING', 'ACTIVE', 'EXPIRED', 'REJECTED']).optional(),
      extractedData: z.any().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.contract.update({
        where: { id: input.id },
        data: {
          title: input.title,
          status: input.status,
          extractedData: input.extractedData,
        },
        include: {
          parties: true,
          signatures: true,
          approvals: true,
        },
      });
    }),

  // Delete contract
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.contract.delete({
        where: { id: input },
      });
    }),

  // Extract terms (AI)
  extractTerms: publicProcedure
    .input(z.string()) // contract ID
    .query(async ({ input }) => {
      const contract = await prisma.contract.findUnique({
        where: { id: input },
      });
      if (!contract) throw new Error('Contract not found');

      // TODO: Extract text from PDF first
      const { extractTerms } = await import('../../lib/ai/extractTerms');
      const terms = await extractTerms('Sample contract text'); // TODO: Use actual PDF text
      return { terms, status: 'completed' };
    }),
});
