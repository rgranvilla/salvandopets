import { authenticateUserController } from '@/application/controllers/authenticate/authenticate-user/authenticateUserController';
import { authenticateUserSchema } from '@/application/controllers/authenticate/authenticate-user/authenticateUserSchema';
import { refreshTokenController } from '@/application/controllers/authenticate/refresh-token/refreshTokenController';
import { refreshTokenSchema } from '@/application/controllers/authenticate/refresh-token/refreshTokenSchema';
import { FastifyInstance } from 'fastify';

export async function authenticateRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/authenticate',
    handler: authenticateUserController,
    schema: authenticateUserSchema,
  });

  app.route({
    method: 'POST',
    url: '/refresh-token',
    handler: refreshTokenController,
    schema: refreshTokenSchema,
  });
}
