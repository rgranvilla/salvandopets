import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';

import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';

import { User } from '../../entities/user';

interface IDeactivateUserUseCaseRequest {
  userId: string;
  deactivationReason: string;
}

type IDeactivateUserUseCaseResponse = User;

export class DeactivateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    data: IDeactivateUserUseCaseRequest,
  ): Promise<IDeactivateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userToUpdate = new User(
      {
        username: user.username,
        email: user.email,
        password: user.password,
        isActive: false,
        deactivationReason: data.deactivationReason,
        deactivationDate: new Date(),
      },
      user.id,
    );

    const deactivatedUser = await this.usersRepository.update(userToUpdate);

    return deactivatedUser;
  }
}
