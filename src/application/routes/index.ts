import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users/usersRoutes';

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/api/v1/users' });
}
