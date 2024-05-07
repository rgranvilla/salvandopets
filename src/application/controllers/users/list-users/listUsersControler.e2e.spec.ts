import { IPaginatedParams } from '@/core/@types/IPaginetedParams';
import { app } from '@/core/app';
import {
  UsersDateRangeFieldType,
  UsersSearchFieldType,
  UsersSortByType,
} from '@/domain/users/entities/user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

let token: string;

describe('List Users Controller', () => {
  beforeAll(async () => {
    await app.ready();
    await request(app.server).post('/api/v1/users/create').send({
      username: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'password123',
    });

    const reponse = await request(app.server)
      .post('/api/v1/users/authenticate')
      .send({
        email: 'johndoe@mail.com',
        password: 'password123',
      });

    token = reponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a list of users', async () => {
    // Arrange
    const params: IPaginatedParams<
      UsersSortByType,
      UsersSearchFieldType,
      UsersDateRangeFieldType
    > = {
      page: 0,
      perPage: 10,
      sortBy: 'username',
      sortOrder: 'asc',
    };

    // Act
    const response = await request(app.server)
      .get('/api/v1/users/list')
      .query(params)
      .set('Cookie', [`token=${token}`]);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.currentPage).toBe(0);
    expect(response.body.perPage).toBe(10);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      username: 'John Doe',
      email: 'johndoe@mail.com',
      isActive: true,
      deactivationDate: null,
      deactivationReason: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
