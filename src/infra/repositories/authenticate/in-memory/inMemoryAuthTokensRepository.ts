import { AuthToken } from '@/domain/authenticate/entities/authToken';
import { AuthTokenMapper } from '@/infra/mappers/authenticate/authTokenMapper';

import { IAuthTokensRepository } from '../IAuthTokensRepository';

type InMemoryUserTokenDB = {
  id: string;
  token: string;
  refresh_token: string;
  expires_date: Date;
  created_at: Date;
  user_id: string;
};

export class InMemoryUsersRepository implements IAuthTokensRepository {
  private userTokens: InMemoryUserTokenDB[] = [];

  async create(data: AuthToken): Promise<AuthToken> {
    const userToken = AuthTokenMapper.toDatabase(data);

    this.userTokens.push(userToken);

    return AuthTokenMapper.toDomain(
      this.userTokens[this.userTokens.length - 1],
    );
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.userTokens = this.userTokens.filter((user) => user.user_id !== userId);
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    this.userTokens = this.userTokens.filter(
      (user) => user.refresh_token !== refreshToken,
    );
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthToken | null> {
    const userToken = this.userTokens.find(
      (user) => user.refresh_token === refreshToken,
    );

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

    const index = this.userTokens.findIndex((user) => user.id === userToken.id);

    this.userTokens[index].refresh_token = refreshToken;
  }
}
