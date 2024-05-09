import { createUserFactory } from '@/tests/factories/createUserFactory';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';

import { InMemoryUsersRepository } from '@/infra/repositories/users/in-memory/inMemoryUsersRepository';

import { User } from '../../entities/user';
import { DeactivateUserUseCase } from './deactivateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: DeactivateUserUseCase;
let firstUser: User;

describe('DeactivateUserUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeactivateUserUseCase(usersRepository);
    firstUser = new User({
      username: 'john_doe',
      email: 'john_doe@mail.com',
      password: 'password123',
      isActive: true,
    });
    await createUserFactory(1, usersRepository, [firstUser]);
  });

  it('should deactivate an user', async () => {
    const deactivatedUser = await sut.execute({
      userId: firstUser.id,
      deactivationReason: 'Inactive account',
    });

    expect(deactivatedUser.id).toEqual(firstUser.id);
    expect(deactivatedUser).toMatchObject({
      username: 'john_doe',
      email: 'john_doe@mail.com',
      isActive: false,
      deactivationDate: expect.any(Date),
      deactivationReason: 'Inactive account',
    });
  });

  it('should throw UserNotFoundError when the user does not exist', async () => {
    await expect(
      sut.execute({
        userId: '1',
        deactivationReason: 'Inactive account',
      }),
    ).rejects.toThrow(UserNotFoundError);
  });
});
