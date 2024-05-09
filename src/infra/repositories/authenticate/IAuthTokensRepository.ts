import { AuthToken } from '@/domain/authenticate/entities/authToken';

export abstract class IAuthTokensRepository {
  abstract create(data: AuthToken): Promise<AuthToken>;

  abstract findByRefreshToken(refreshToken: string): Promise<AuthToken | null>;

  abstract replaceRefreshToken(refreshToken: string): Promise<void>;

  abstract deleteRefreshToken(refreshToken: string): Promise<void>;
  abstract deleteByUserId(userId: string): Promise<void>;
}
