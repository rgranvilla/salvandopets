import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { DeactivateUserUseCase } from '@/domain/users/use-cases/deactivate-user/deactivateUserUseCase';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';

export async function deactivateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deactivateUserParamsSchema = z.object({
    userId: z.string(),
  });

  const deactivateUserBodySchema = z.object({
    deactivationReason: z.string(),
  });

  const { userId } = deactivateUserParamsSchema.parse(request.params);
  const { deactivationReason } = deactivateUserBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const deactivateUserUseCase = new DeactivateUserUseCase(usersRepository);

    const user = await deactivateUserUseCase.execute({
      userId,
      deactivationReason,
    });

    return reply.code(201).send({
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      deactivationDate: user.deactivationDate,
      deactivationReason: user.deactivationReason,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
