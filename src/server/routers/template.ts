import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../context';

export const templateRouter = router({
  // Get all templates
  getAll: publicProcedure.query(async () => {
    return await prisma.template.findMany({
      include: {
        createdBy: true,
        contracts: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  // Get template by ID
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prisma.template.findUnique({
        where: { id: input },
        include: {
          createdBy: true,
          contracts: true,
        },
      });
    }),

  // Create template
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      content: z.string(),
      createdById: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.template.create({
        data: input,
        include: {
          createdBy: true,
        },
      });
    }),

  // Update template
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      content: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.template.update({
        where: { id: input.id },
        data: {
          name: input.name,
          content: input.content,
        },
      });
    }),

  // Delete template
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.template.delete({
        where: { id: input },
      });
    }),
});
