import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export function createContext() {
  return { prisma };
}

export type Context = ReturnType<typeof createContext>;
