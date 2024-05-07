import { UserToken } from '@/domain/users/entities/userToken';
import { UserTokenMapper } from '@/infra/mappers/users/userTokenMapper';
import { IUserTokensRepository } from '../IUserTokensRepository';

type InMemoryUserTokenDB = {
  id: string;
  token: string;
  refresh_token: string;
  expires_date: Date;
  created_at: Date;
  user_id: string;
};

export class InMemoryUsersRepository implements IUserTokensRepository {
  private userTokens: InMemoryUserTokenDB[] = [];

  async create(data: UserToken): Promise<UserToken> {
    const userToken = UserTokenMapper.toDatabase(data);

    this.userTokens.push(userToken);

    return UserTokenMapper.toDomain(
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

  async findByRefreshToken(refreshToken: string): Promise<UserToken | null> {
    const userToken = this.userTokens.find(
      (user) => user.refresh_token === refreshToken,
    );

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

    const index = this.userTokens.findIndex((user) => user.id === userToken.id);

    this.userTokens[index].refresh_token = refreshToken;
  }
}
