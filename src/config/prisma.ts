// this initializes the Prisma client as a singleton to avoid multiple connections
import { PrismaClient } from '@prisma/client';

// this is the global cache key for the Prisma client in dev hot reload
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// this exports a single Prisma client instance
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// this caches the instance during development to prevent connection leaks
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
