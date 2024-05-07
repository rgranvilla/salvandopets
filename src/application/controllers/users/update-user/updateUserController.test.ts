import { app } from '@/core/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Update User Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update a user', async () => {
    const originalUser = {
      username: 'john_doe',
      email: 'john_doe@mail.com',
      password: 'password123',
    };
    const responseCreate = await request(app.server)
      .post('/api/v1/users/create')
      .send(originalUser);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const response = await request(app.server)
      .put(`/api/v1/users/${responseCreate.body.id}/update`)
      .send({
        username: 'jane_doe',
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('jane_doe');
  });
});
