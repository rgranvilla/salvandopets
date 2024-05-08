import { FastifyInstance } from 'fastify';
import { permissionsRoutes } from './permissions/permissionsRoutes';
import { rolesPermissionsRoutes } from './roles-permissions/rolesPermissionsRoutes';
import { rolesRoutes } from './roles/rolesRoutes';
import { usersRoutes } from './users/usersRoutes';

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/api/v1/users' });
  app.register(rolesRoutes, { prefix: '/api/v1/roles' });
  app.register(permissionsRoutes, { prefix: '/api/v1/permissions' });
  app.register(rolesPermissionsRoutes, { prefix: '/api/v1/roles-permissions' });
}
