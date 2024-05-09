import { UsernameAlreadyInUseError } from '@/core/errors/custom-errors/usernameAlreadyInUseError';
import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';

import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';

import { User } from '../../entities/user';

interface IUpdateUserUseCaseRequest {
  id: string;
  username?: string | null;
  password?: string;
  isActive?: boolean;
  deactivationDate?: Date;
  deactivationReason?: string;
}

type IUpdateUserUseCaseResponse = User;

export class UpdateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    data: IUpdateUserUseCaseRequest,
  ): Promise<IUpdateUserUseCaseResponse> {
    const existingUser = await this.usersRepository.findById(data.id);

    if (!existingUser) {
      throw new UserNotFoundError();
    }

    if (data.username) {
      const userWithSameUsername = await this.usersRepository.findByUsername(
        data.username,
      );

      if (userWithSameUsername && data.username !== existingUser.username) {
        throw new UsernameAlreadyInUseError();
      }
    }

    const updatedUser = new User(
      {
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        username: data.username ?? existingUser.username,
        password: data.password ?? existingUser.password,
        isActive: data.isActive ?? existingUser.isActive,
        deactivationDate:
          data.deactivationDate ?? existingUser.deactivationDate,
        deactivationReason:
          data.deactivationReason ?? existingUser.deactivationReason,
      },
      data.id,
    );

    const user = await this.usersRepository.update(updatedUser);

    return user;
  }
}
