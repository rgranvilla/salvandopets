import { RefreshTokenUseCase } from '@/domain/authenticate/use-cases/refresh-token/refreshTokenUseCase';
import { PrismaAuthTokensRepository } from '@/infra/repositories/authenticate/prisma/prismaAuthTokensRepository';
import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prismaUsersRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const refreshTokenSchema = z.object({
    refreshToken: z.string(),
    userId: z.string().uuid(),
  });

  const { refreshToken, userId } = refreshTokenSchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const AuthTokensRepository = new PrismaAuthTokensRepository();
    const refreshTokenUseCase = new RefreshTokenUseCase(
      usersRepository,
      AuthTokensRepository,
      reply,
    );

    const { newToken, newRefreshToken } = await refreshTokenUseCase.execute({
      refreshToken,
      userId,
    });

    return reply.status(200).send({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return reply.status(400).send(error);
  }
}
