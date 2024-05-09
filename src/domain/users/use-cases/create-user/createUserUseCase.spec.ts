import { beforeEach, describe, expect, it } from 'vitest';

import { EmailAlreadyInUseError } from '@/core/errors/custom-errors/emailAlreadyInUseError';
import { UsernameAlreadyInUseError } from '@/core/errors/custom-errors/usernameAlreadyInUseError';

import { InMemoryUsersRepository } from '@/infra/repositories/users/in-memory/inMemoryUsersRepository';

import { CreateUserUseCase } from './createUserUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const newUser = {
      username: 'john_doe',
      email: 'john_doe@mail.com',
      password: 'password123',
      isActive: true,
    };

    const response = await sut.execute(newUser);

    expect(response).toMatchObject({
      id: expect.any(String),
      username: newUser.username,
      email: newUser.email,
      isActive: newUser.isActive,
      password: newUser.password,
      deactivationDate: null,
      deactivationReason: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should not be able to create a new user with the same email', async () => {
    const email = 'john_doe@mail.com';

    await sut.execute({
      username: 'john_doe',
      email,
      password: 'password123',
      isActive: true,
    });

    await expect(() =>
      sut.execute({
        username: 'john_doe',
        email,
        password: 'password123',
        isActive: true,
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError);
  });

  it('should not be able to create a new user with the same username', async () => {
    const username = 'john_doe';

    await sut.execute({
      username,
      email: 'john_doe@mail.com',
      password: 'password123',
      isActive: true,
    });

    await expect(() =>
      sut.execute({
        username,
        email: 'john_doe2@mail.com',
        password: 'password123',
        isActive: true,
      }),
    ).rejects.toBeInstanceOf(UsernameAlreadyInUseError);
  });
});
