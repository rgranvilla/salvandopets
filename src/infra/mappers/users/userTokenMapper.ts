import { UserToken } from '@/domain/users/entities/userToken';
import { UserToken as PrismaUserToken } from '@prisma/client';

export class UserTokenMapper {
  static toDatabase(data: UserToken): PrismaUserToken {
    return {
      id: data.id,
      user_id: data.userId,
      token: data.token,
      refresh_token: data.refreshToken,
      expires_date: data.expiresDate,
      created_at: data.createdAt,
    };
  }

  static toDomain(data: PrismaUserToken): UserToken {
    const userToken = new UserToken(
      {
        userId: data.user_id,
        token: data.token,
        refreshToken: data.refresh_token,
        expiresDate: data.expires_date,
        createdAt: data.created_at,
      },
      data.id,
    );

    return userToken;
  }
}
