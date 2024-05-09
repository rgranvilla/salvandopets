import { FastifyReply } from 'fastify';

import { ExpiredTokenError } from '@/core/errors/custom-errors/expiredTokenError';
import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';
import { CryptoHelper } from '@/core/utils/cryptoHelper';

import { IAuthTokensRepository } from '@/infra/repositories/authenticate/IAuthTokensRepository';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';

import { AuthToken } from '../../entities/authToken';

interface IRefreshTokenPayload {
  refreshToken: string;
  userId: string;
}

interface IRefreshTokenResponse {
  newToken: string;
  newRefreshToken: string;
}

export class RefreshTokenUseCase {
  private usersRepository: IUsersRepository;
  private authTokensRepository: IAuthTokensRepository;
  private reply: FastifyReply;

  constructor(
    usersRepository: IUsersRepository,
    authTokensRepository: IAuthTokensRepository,
    reply: FastifyReply,
  ) {
    this.usersRepository = usersRepository;
    this.authTokensRepository = authTokensRepository;
    this.reply = reply;
  }

  async execute({
    refreshToken,
    userId,
  }: IRefreshTokenPayload): Promise<IRefreshTokenResponse> {
    const foundUserToken =
      await this.authTokensRepository.findByRefreshToken(refreshToken);

    if (!foundUserToken) {
      throw new ExpiredTokenError();
    }

    if (userId !== foundUserToken.userId) {
      throw new ExpiredTokenError();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const encryptData = new CryptoHelper();
    const encryptedData = await encryptData.encryptData(user);

    const newToken = await this.reply.jwtSign({
      sign: {
        sub: encryptedData,
        expiresIn: '15m',
      },
    });

    const newRefreshToken = await this.reply.jwtSign({
      sign: {
        sub: encryptedData,
        expiresIn: '7d',
      },
    });

    this.reply.setCookie('token', newToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    });

    const authToken = new AuthToken({
      userId: user.id,
      token: newToken,
      refreshToken: newRefreshToken,
    });

    await this.authTokensRepository.deleteByUserId(foundUserToken.userId);
    await this.authTokensRepository.create(authToken);

    return {
      newToken,
      newRefreshToken,
    };
  }
}
