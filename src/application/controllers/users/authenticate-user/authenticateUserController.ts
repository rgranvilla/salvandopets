import { handleError } from '@/core/errors/handleError';
import { AuthenticateUserUseCase } from '@/domain/users/use-cases/authenticate-user/authenticateUserUseCase';
import { PrismaUserTokensRepository } from '@/infra/repositories/users/prisma/prismaUserTokensRepository';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

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
    const userTokensRepository = new PrismaUserTokensRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(
      usersRepository,
      userTokensRepository,
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
