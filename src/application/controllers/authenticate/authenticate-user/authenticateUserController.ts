import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { AuthenticateUserUseCase } from '@/domain/authenticate/use-cases/authenticate/authenticateUseCase';
import { PrismaAuthTokensRepository } from '@/infra/repositories/authenticate/prisma/prismaAuthTokensRepository';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const AuthTokensRepository = new PrismaAuthTokensRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(
      usersRepository,
      AuthTokensRepository,
      reply,
    );

    const { token, refreshToken } = await authenticateUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send({
      token,
      refreshToken,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
