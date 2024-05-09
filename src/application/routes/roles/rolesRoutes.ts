import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/core/middlewares/verifyJWT';

import { createRoleController } from '@/application/controllers/roles/create-role/createRoleController';
import { CreateRoleSchema } from '@/application/controllers/roles/create-role/createRoleSchema';
import { listRolesController } from '@/application/controllers/roles/list-roles/listRolesControler';
import { listRolesSchema } from '@/application/controllers/roles/list-roles/listRolesSchema';
import { updateRoleController } from '@/application/controllers/roles/update-role/updateRoleController';
import { UpdateRoleSchema } from '@/application/controllers/roles/update-role/updateRoleSchema';

export async function rolesRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    onRequest: [verifyJWT],
    handler: createRoleController,
    schema: CreateRoleSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:roleId/update',
    onRequest: [verifyJWT],
    handler: updateRoleController,
    schema: UpdateRoleSchema,
  });

  app.route({
    method: 'GET',
    url: '/list',
    onRequest: [verifyJWT],
    handler: listRolesController,
    schema: listRolesSchema,
  });
}
