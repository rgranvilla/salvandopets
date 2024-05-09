import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { ListUsersUseCase } from '@/domain/users/use-cases/list-users/listUsersUseCase';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';

export const listUsersController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const listUserParamsSchema = z.object({
    page: z.number().optional(),
    perPage: z.number().optional(),
    sortBy: z.enum(['username', 'email', 'created_at']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    searchField: z.enum(['username', 'email']).optional(),
    searchQuery: z.string().optional(),
    dateRangeField: z
      .enum(['created_at', 'updated_at', 'deactivation_date'])
      .optional(),
    dateRangeStart: z.date().optional(),
    dateRangeEnd: z.date().optional(),
  });

  const params = listUserParamsSchema.parse(request.query);

  try {
    const usersRepository = new PrismaUsersRepository();
    const listUsersUseCase = new ListUsersUseCase(usersRepository);

    const result = await listUsersUseCase.execute(params);

    reply.code(200).send(result);
  } catch (err) {
    handleError(err, request, reply);
  }
};
