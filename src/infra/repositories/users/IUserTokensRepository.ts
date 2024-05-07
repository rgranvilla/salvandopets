import { UserToken } from '@/domain/users/entities/userToken';

export interface ICreateUserTokenPayload {
  userId: string;
  token: string;
  refreshToken: string;
  expiresDate: Date;
}

export abstract class IUserTokensRepository {
  abstract create(data: UserToken): Promise<UserToken>;

  abstract findByRefreshToken(refreshToken: string): Promise<UserToken | null>;

  abstract replaceRefreshToken(refreshToken: string): Promise<void>;

  abstract deleteRefreshToken(refreshToken: string): Promise<void>;
  abstract deleteByUserId(userId: string): Promise<void>;
}
