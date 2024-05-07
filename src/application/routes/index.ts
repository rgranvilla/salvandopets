import { FastifyInstance } from 'fastify';
import { rolesRoutes } from './roles/rolesRoutes';
import { usersRoutes } from './users/usersRoutes';

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/api/v1/users' });
  app.register(rolesRoutes, { prefix: '/api/v1/roles' });
}
