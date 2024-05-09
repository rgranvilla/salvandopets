import { InvalidCredentialsError } from '@/core/errors/custom-errors/invalidCredentialsError';
import { CryptoHelper } from '@/core/utils/cryptoHelper';
import { IAuthTokensRepository } from '@/infra/repositories/authenticate/IAuthTokensRepository';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';
import { compare } from 'bcrypt';
import { FastifyReply } from 'fastify';
import { AuthToken } from '../../entities/authToken';

interface ISigninPayload {
  email: string;
  password: string;
}

type SigninResponse = {
  token: string;
  refreshToken: string;
};

export class AuthenticateUserUseCase {
  private userRepository: IUsersRepository;
  private authTokensRepository: IAuthTokensRepository;
  private reply: FastifyReply;

  constructor(
    userRepository: IUsersRepository,
    authTokensRepository: IAuthTokensRepository,
    reply: FastifyReply,
  ) {
    this.userRepository = userRepository;
    this.authTokensRepository = authTokensRepository;
    this.reply = reply;
  }

  async execute(data: ISigninPayload): Promise<SigninResponse> {
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

    const authToken = new AuthToken({
      userId: user.id,
      token,
      refreshToken,
    });

    await this.authTokensRepository.deleteByUserId(authToken.userId);
    await this.authTokensRepository.create(authToken);

    return {
      token,
      refreshToken,
    };
  }
}
