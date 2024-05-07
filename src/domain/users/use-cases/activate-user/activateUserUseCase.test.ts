import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';
import { InMemoryUsersRepository } from '@/infra/repositories/users/in-memory/inMemoryUsersRepository';
import { createUserFactory } from '@/tests/factories/createUserFactory';
import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/user';
import { ActivateUserUseCase } from './activateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: ActivateUserUseCase;
let firstUser: User;

describe('ActivateUserUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ActivateUserUseCase(usersRepository);
    firstUser = new User({
      username: 'john_doe',
      email: 'john_doe@mail.com',
      password: 'password123',
      isActive: false,
    });
    await createUserFactory(1, usersRepository, [firstUser]);
  });

  it('should activate an user', async () => {
    const activatedUser = await sut.execute({
      userId: firstUser.id,
    });

    expect(activatedUser.id).toEqual(firstUser.id);
    expect(activatedUser).toMatchObject({
      id: firstUser.id,
      username: 'john_doe',
      email: 'john_doe@mail.com',
      isActive: true,
    });
  });

  it('should throw UserNotFoundError when the user does not exist', async () => {
    await expect(
      sut.execute({
        userId: '1',
      }),
    ).rejects.toThrow(UserNotFoundError);
  });
});
