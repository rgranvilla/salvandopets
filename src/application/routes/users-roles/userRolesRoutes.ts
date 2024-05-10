import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/core/middlewares/verifyJWT';

import { saveUserRolesController } from '@/application/controllers/users-roles/save-user-roles/saveUserRolesController';
import { SaveUserRolesSchema } from '@/application/controllers/users-roles/save-user-roles/saveUserRolesSchema';

export async function userRolesRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/:userId/save-roles',
    onRequest: [verifyJWT],
    handler: saveUserRolesController,
    schema: SaveUserRolesSchema,
  });
}
