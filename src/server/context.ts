import { PrismaClient } from '../generated/prisma/client';


export const prisma = new PrismaClient({});

export function createContext() {
  return { prisma };
}

export type Context = ReturnType<typeof createContext>;
