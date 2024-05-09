import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/core/app';

describe('Refresh Token Controller', () => {
  beforeAll(async () => {
    await app.ready();
    await request(app.server).post('/api/v1/users/create').send({
      username: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'password123',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a token and refresh token', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/authenticate')
      .send({
        email: 'johndoe@mail.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('refreshToken');
  });
});
