import { ExpiredTokenError } from '@/core/errors/custom-errors/expiredTokenError';
import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';
import { CryptoHelper } from '@/core/utils/cryptoHelper';
import { IUserTokensRepository } from '@/infra/repositories/users/IUserTokensRepository';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';
import { FastifyReply } from 'fastify';
import { UserToken } from '../../entities/userToken';

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
  private userTokensRepository: IUserTokensRepository;
  private reply: FastifyReply;

  constructor(
    usersRepository: IUsersRepository,
    userTokensRepository: IUserTokensRepository,
    reply: FastifyReply,
  ) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.reply = reply;
  }

  async execute({
    refreshToken,
    userId,
  }: IRefreshTokenPayload): Promise<IRefreshTokenResponse> {
    const foundUserToken =
      await this.userTokensRepository.findByRefreshToken(refreshToken);

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

    const userToken = new UserToken({
      userId: user.id,
      token: newToken,
      refreshToken: newRefreshToken,
    });

    await this.userTokensRepository.deleteByUserId(foundUserToken.userId);
    await this.userTokensRepository.create(userToken);

    return {
      newToken,
      newRefreshToken,
    };
  }
}
