import { EmailAlreadyInUseError } from '@/core/errors/custom-errors/emailAlreadyInUseError';
import { UsernameAlreadyInUseError } from '@/core/errors/custom-errors/usernameAlreadyInUseError';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';
import { User } from '../../entities/user';

interface ICreateUserUseCaseRequest {
  username: string | null;
  email: string;
  password: string;
  isActive: boolean;
}

type ICreateUserUseCaseResponse = User;

export class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    data: ICreateUserUseCaseRequest,
  ): Promise<ICreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userWithSameEmail) {
      throw new EmailAlreadyInUseError();
    }

    const userWithSameUsername = await this.usersRepository.findByUsername(
      data.username,
    );

    if (userWithSameUsername) {
      throw new UsernameAlreadyInUseError();
    }

    const createdUser = new User(data);

    const user = await this.usersRepository.create(createdUser);

    return user;
  }
}
