import { describe, expect, it } from 'vitest';
import { prisma } from './prisma';

describe('Prisma', () => {
  it('should create a new PrismaClient instance', () => {
    expect(prisma).toBeDefined();
  });
});
