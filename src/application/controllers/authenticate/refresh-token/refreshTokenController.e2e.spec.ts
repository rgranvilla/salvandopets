import { app } from '@/core/app';

import { JwtDecoder } from '@/core/utils/jwtDecode';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

let refreshToken: string;

describe('Refresh Token Controller', () => {
  beforeAll(async () => {
    await app.ready();
    await request(app.server).post('/api/v1/users/create').send({
      username: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'password123',
    });

    const response = await request(app.server)
      .post('/api/v1/users/authenticate')
      .send({
        email: 'johndoe@mail.com',
        password: 'password123',
      });

    refreshToken = response.body.refreshToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a new token and refresh token', async () => {
    const decriptJwt = new JwtDecoder(app);
    const decodedJwtToken = await decriptJwt.decode<{ userId: string }>(
      refreshToken,
    );

    if (!decodedJwtToken) {
      throw new Error('Invalid token');
    }

    const { userId } = decodedJwtToken;

    const response = await request(app.server)
      .post('/api/v1/users/refresh-token')
      .send({
        refreshToken,
        userId,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('refreshToken');
  });
});
