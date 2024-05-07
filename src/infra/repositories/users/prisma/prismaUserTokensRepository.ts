import { prisma } from '@/database/lib/prisma';
import { UserToken } from '@/domain/users/entities/userToken';
import { UserTokenMapper } from '@/infra/mappers/users/userTokenMapper';
import { IUserTokensRepository } from '../IUserTokensRepository';

export class PrismaUserTokensRepository implements IUserTokensRepository {
  async create(data: UserToken): Promise<UserToken> {
    const raw = UserTokenMapper.toDatabase(data);

    const createUserToken = await prisma.userToken.create({
      data: raw,
    });

    return UserTokenMapper.toDomain(createUserToken);
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

  async findByRefreshToken(refreshToken: string): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!userToken) {
      return null;
    }

    return UserTokenMapper.toDomain(userToken);
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
