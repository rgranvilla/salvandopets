import { handleError } from '@/core/errors/handleError';
import { ActivateUserUseCase } from '@/domain/users/use-cases/activate-user/activateUserUseCase';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function activateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const activateUserParamsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = activateUserParamsSchema.parse(request.params);

  try {
    const usersRepository = new PrismaUsersRepository();
    const activateUserUseCase = new ActivateUserUseCase(usersRepository);

    const user = await activateUserUseCase.execute({
      userId,
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
