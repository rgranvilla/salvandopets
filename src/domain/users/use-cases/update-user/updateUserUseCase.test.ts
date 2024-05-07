import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';
import { UsernameAlreadyInUseError } from '@/core/errors/custom-errors/usernameAlreadyInUseError';
import { InMemoryUsersRepository } from '@/infra/repositories/users/in-memory/inMemoryUsersRepository';
import { createUserFactory } from '@/tests/factories/createUserFactory';
import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/user';
import { UpdateUserUseCase } from './updateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;
let firstUser: User;
let secondUser: User;

describe('UpdateUserUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
    firstUser = new User({
      username: 'john_doe',
      email: 'john_doe@mail.com',
      password: 'password123',
      isActive: true,
    });
    secondUser = new User({
      username: 'jane_doe',
      email: 'jane_doe@mail.com',
      password: 'password123',
      isActive: true,
    });
    await createUserFactory(1, usersRepository, [firstUser, secondUser]);
  });

  it('should update an existing user', async () => {
    const updatedUser = await sut.execute({
      id: firstUser.id,
      username: 'john_doe_updated',
      password: 'new_password',
      isActive: false,
      deactivationDate: new Date(),
      deactivationReason: 'Inactive account',
    });

    expect(updatedUser.id).toEqual(firstUser.id);
    expect(updatedUser).toMatchObject({
      username: 'john_doe_updated',
      password: 'new_password',
      isActive: false,
      deactivationDate: expect.any(Date),
      deactivationReason: 'Inactive account',
    });
  });

  it('should throw UserNotFoundError when the user does not exist', async () => {
    await expect(
      sut.execute({
        id: '1',
        username: 'john_doe_updated',
      }),
    ).rejects.toThrow(UserNotFoundError);
  });

  it('should throw UsernameAlreadyInUseError when trying to update to an existing username', async () => {
    await expect(
      sut.execute({
        id: firstUser.id,
        username: 'jane_doe',
      }),
    ).rejects.toThrow(UsernameAlreadyInUseError);
  });
});
