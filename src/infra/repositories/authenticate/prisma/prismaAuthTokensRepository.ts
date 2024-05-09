import { prisma } from '@/database/lib/prisma';

import { AuthToken } from '@/domain/authenticate/entities/authToken';
import { AuthTokenMapper } from '@/infra/mappers/authenticate/authTokenMapper';

import { IAuthTokensRepository } from '../IAuthTokensRepository';

export class PrismaAuthTokensRepository implements IAuthTokensRepository {
  async create(data: AuthToken): Promise<AuthToken> {
    const raw = AuthTokenMapper.toDatabase(data);

    const createUserToken = await prisma.userToken.create({
      data: raw,
    });

    return AuthTokenMapper.toDomain(createUserToken);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.userToken.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    await prisma.userToken.delete({
      where: {
        refresh_token: refreshToken,
      },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!userToken) {
      return null;
    }

    return AuthTokenMapper.toDomain(userToken);
  }

  async replaceRefreshToken(refreshToken: string): Promise<void> {
    const userToken = await this.findByRefreshToken(refreshToken);

    if (!userToken) {
      return;
    }

    await prisma.userToken.update({
      where: {
        id: userToken.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
  }
}
