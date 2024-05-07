import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';
import { User } from '../../entities/user';

interface IActivateUserUseCaseRequest {
  userId: string;
}

type IActivateUserUseCaseResponse = User;

export class ActivateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    data: IActivateUserUseCaseRequest,
  ): Promise<IActivateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userToUpdate = new User(
      {
        username: user.username,
        email: user.email,
        password: user.password,
        isActive: true,
        deactivationReason: null,
        deactivationDate: null,
      },
      user.id,
    );

    const activatedUser = await this.usersRepository.update(userToUpdate);

    return activatedUser;
  }
}
