import { InvalidCredentialsError } from '@/core/errors/custom-errors/invalidCredentialsError';
import { CryptoHelper } from '@/core/utils/cryptoHelper';
import { IUserTokensRepository } from '@/infra/repositories/users/IUserTokensRepository';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';
import { compare } from 'bcrypt';
import { FastifyReply } from 'fastify';
import { UserToken } from '../../entities/userToken';

interface ISigninUserPayload {
  email: string;
  password: string;
}

type SigninUserResponse = {
  token: string;
  refreshToken: string;
};

export class AuthenticateUserUseCase {
  private userRepository: IUsersRepository;
  private userTokensRepository: IUserTokensRepository;
  private reply: FastifyReply;

  constructor(
    userRepository: IUsersRepository,
    userTokensRepository: IUserTokensRepository,
    reply: FastifyReply,
  ) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.reply = reply;
  }

  async execute(data: ISigninUserPayload): Promise<SigninUserResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const userData = {
      userId: user.id,
      username: user.username,
      email: user.email,
      createAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const encryptData = new CryptoHelper();
    const encryptedData = await encryptData.encryptData(userData);

    const token = await this.reply.jwtSign({
      sign: {
        sub: encryptedData,
        expiresIn: '15m',
      },
    });

    const refreshToken = await this.reply.jwtSign({
      sign: {
        sub: encryptedData,
        expiresIn: '7d',
      },
    });

    this.reply.setCookie('token', token, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    });

    const userToken = new UserToken({
      userId: user.id,
      token,
      refreshToken,
    });

    await this.userTokensRepository.deleteByUserId(userToken.userId);
    await this.userTokensRepository.create(userToken);

    return {
      token,
      refreshToken,
    };
  }
}
