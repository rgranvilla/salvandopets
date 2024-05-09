import { FastifyInstance } from 'fastify';
import { addressRoutes } from './address/addressRoutes';
import { authenticateRoutes } from './authenticate/authenticateRoutes';
import { permissionsRoutes } from './permissions/permissionsRoutes';
import { rolesPermissionsRoutes } from './roles-permissions/rolesPermissionsRoutes';
import { rolesRoutes } from './roles/rolesRoutes';
import { userDetailsRoutes } from './userDetails/userDetailsRoutes';
import { usersRoutes } from './users/usersRoutes';

export async function appRoutes(app: FastifyInstance) {
  app.register(authenticateRoutes, { prefix: '/api/v1/auth' });
  app.register(usersRoutes, { prefix: '/api/v1/users' });
  app.register(userDetailsRoutes, { prefix: '/api/v1/users' });
  app.register(addressRoutes, { prefix: '/api/v1/address' });
  app.register(permissionsRoutes, { prefix: '/api/v1/permissions' });
  app.register(rolesPermissionsRoutes, { prefix: '/api/v1/roles-permissions' });
  app.register(rolesRoutes, { prefix: '/api/v1/roles' });
}
