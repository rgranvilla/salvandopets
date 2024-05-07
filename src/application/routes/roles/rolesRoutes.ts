import { createRoleController } from '@/application/controllers/roles/create-role/createRoleController';
import { CreateRoleSchema } from '@/application/controllers/roles/create-role/createRoleSchema';
import { listRolesController } from '@/application/controllers/roles/list-roles/listRolesControler';
import { listRolesSchema } from '@/application/controllers/roles/list-roles/listRolesSchema';
import { updateRoleController } from '@/application/controllers/roles/update-role/updateRoleController';
import { UpdateRoleSchema } from '@/application/controllers/roles/update-role/updateRoleSchema';
import { verifyJWT } from '@/core/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

export async function rolesRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    handler: createRoleController,
    schema: CreateRoleSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:roleId/update',
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
