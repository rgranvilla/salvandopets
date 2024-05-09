import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { UpdateUserUseCase } from '@/domain/users/use-cases/update-user/updateUserUseCase';
import { UserMapper } from '@/infra/mappers/users/userMapper';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserBodySchema = z.object({
    username: z.string().min(3).optional(),
    password: z.string().min(8).max(32).optional(),
    isActive: z.boolean().optional(),
  });

  const updateUserParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = updateUserParamsSchema.parse(request.params);
  const { username, password, isActive } = updateUserBodySchema.parse(
    request.body,
  );

  try {
    const usersRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(usersRepository);

    const user = await updateUserUseCase.execute({
      id: userId,
      username,
      password,
      isActive,
    });

    const result = UserMapper.toDatabase(user);

    return reply.code(201).send({
      id: result.id,
      username: result.username,
      email: result.email,
      isActive: result.is_active,
      deactivationDate: result.deactivation_date,
      deactivationReason: result.deactivation_reason,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  } catch (err) {
    console.error(err);
    handleError(err, request, reply);
  }
}
