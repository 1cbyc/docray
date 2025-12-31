import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../context';

export const userRouter = router({
  // Get all users
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }),

  // Get user by ID
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: { id: input },
        include: {
          contracts: true,
          approvals: true,
          signatures: true,
        },
      });
    }),

  // Create user
  create: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
      role: z.enum(['ADMIN', 'LEGAL', 'FINANCE', 'SIGNER']),
    }))
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      });
    }),

  // Update user
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      email: z.string().email().optional(),
      name: z.string().optional(),
      role: z.enum(['ADMIN', 'LEGAL', 'FINANCE', 'SIGNER']).optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.user.update({
        where: { id: input.id },
        data: {
          email: input.email,
          name: input.name,
          role: input.role,
        },
      });
    }),

  // Delete user
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await prisma.user.delete({
        where: { id: input },
      });
    }),
});
