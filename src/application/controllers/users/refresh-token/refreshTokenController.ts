import { RefreshTokenUseCase } from '@/domain/users/use-cases/refresh-token/refreshTokenUseCase';
import { PrismaUserTokensRepository } from '@/infra/repositories/users/prisma/prismaUserTokensRepository';
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
    const userTokensRepository = new PrismaUserTokensRepository();
    const refreshTokenUseCase = new RefreshTokenUseCase(
      usersRepository,
      userTokensRepository,
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
