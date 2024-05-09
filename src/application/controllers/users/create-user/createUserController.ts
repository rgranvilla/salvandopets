import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';
import { hashPassword } from '@/core/utils/hashPassword';

import { CreateUserUseCase } from '@/domain/users/use-cases/create-user/createUserUseCase';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email(),
    password: z.string().min(8).max(32),
  });

  const { username, email, password } = createUserBodySchema.parse(
    request.body,
  );

  try {
    const usersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const user = await createUserUseCase.execute({
      username: username ?? null,
      email,
      password: await hashPassword(password),
      isActive: true,
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
