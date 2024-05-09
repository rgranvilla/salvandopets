import { createUserFactory } from '@/tests/factories/createUserFactory';
import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';

import { IPaginatedParams } from '@/core/@types/IPaginetedParams';

import { InMemoryUsersRepository } from '@/infra/repositories/users/in-memory/inMemoryUsersRepository';

import { ListUsersUseCase } from './listUsersUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: ListUsersUseCase;

describe('List Users', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUsersUseCase(usersRepository);
    await createUserFactory(10, usersRepository);
  });

  it('should return a list of users', async () => {
    // Arrange
    const params: IPaginatedParams = {
      page: 0,
      perPage: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response.count).toEqual(10);
    expect(response.data).toHaveLength(10);
    expect(response.data[0]).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      isActive: expect.any(Boolean),
      password: expect.any(String),
      deactivationDate: null,
      deactivationReason: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
