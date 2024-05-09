import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/core/app';

describe('Create User Controller', () => {
  beforeAll(async () => {
    await app.ready();
    await request(app.server).post('/api/v1/users/create').send({
      username: 'same_username',
      email: 'same_email@mail.com',
      password: 'password123',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new user', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/create')
      .send({
        username: 'john_doe',
        email: 'john_doe@mail.com',
        password: 'password123',
        isActive: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      username: 'john_doe',
      email: 'john_doe@mail.com',
      isActive: true,
      deactivationDate: '',
      deactivationReason: '',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should handle validation errors', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/create')
      .send({
        username: 'jo',
        email: 'invalid_email',
        password: 'short',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: 'Bad Request',
        message: 'Validation error',
      }),
    );
  });

  it('should handle email already in use errors', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/create')
      .send({
        username: 'another_username',
        email: 'same_email@mail.com',
        password: 'password123',
      });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'This email already in use',
      }),
    );
  });

  it('should handle name already in use errors', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/create')
      .send({
        username: 'same_username',
        email: 'another_email@mail.com',
        password: 'password123',
      });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: 'This username already in use',
      }),
    );
  });
});
