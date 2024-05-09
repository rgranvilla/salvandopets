import { AuthToken } from '@/domain/authenticate/entities/authToken';
import { UserToken as AuthTokenDB } from '@prisma/client';

export class AuthTokenMapper {
  static toDatabase(data: AuthToken): AuthTokenDB {
    return {
      id: data.id,
      user_id: data.userId,
      token: data.token,
      refresh_token: data.refreshToken,
      expires_date: data.expiresDate,
      created_at: data.createdAt,
    };
  }

  static toDomain(data: AuthTokenDB): AuthToken {
    const authToken = new AuthToken(
      {
        userId: data.user_id,
        token: data.token,
        refreshToken: data.refresh_token,
        expiresDate: data.expires_date,
        createdAt: data.created_at,
      },
      data.id,
    );

    return authToken;
  }
}
