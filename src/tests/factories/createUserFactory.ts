import { faker } from '@faker-js/faker';

import { User } from '@/domain/users/entities/user';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';

/**
 * Creates multiple users using a factory pattern.
 *
 * @param numberOfUsers - The number of users to create.
 * @param usersRepository - The repository for managing user data.
 * @param user - An optional array of user object to create before creating the remaining users. When this parameter is provided, this user will be created first, and then the remaining users will be created, and the total of records will be same as numberOfUsers.
 */
export async function createUserFactory(
  numberOfUsers: number,
  usersRepository: IUsersRepository,
  user?: User[],
) {
  if (user) {
    for (let i = 0; i < user.length; i++) {
      await usersRepository.create(user[i]);
    }
  }

  const amountOfUsers = user ? numberOfUsers - user.length : numberOfUsers;

  for (let i = 0; i < amountOfUsers; i++) {
    const newUser = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: true,
    });

    await usersRepository.create(newUser);
  }
}
