import { PrismaClient } from '@prisma/client';

import { ENV } from '$/env';

const createPrismaClient = () =>
  new PrismaClient({
    log:
      ENV.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (ENV.NODE_ENV !== 'production') globalForPrisma.prisma = db;
