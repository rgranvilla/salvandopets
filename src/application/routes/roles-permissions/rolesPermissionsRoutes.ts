import { createRolePermissionController } from '@/application/controllers/roles-permissions/create-role-permission/createRolePermissionController';
import { CreateRolePermissionSchema } from '@/application/controllers/roles-permissions/create-role-permission/createRolePermissionSchema';
import { listRolesPermissionsController } from '@/application/controllers/roles-permissions/list-roles-permissions/listRolesPermissionsControler';
import { ListRolesPermissionsSchema } from '@/application/controllers/roles-permissions/list-roles-permissions/listRolesPermissionsSchema';
import { updateRolePermissionController } from '@/application/controllers/roles-permissions/update-role-permission/updateRolePermissionController';
import { UpdateRolePermissionSchema } from '@/application/controllers/roles-permissions/update-role-permission/updateRolePermissionSchema';
import { verifyJWT } from '@/core/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

export async function rolesPermissionsRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    onRequest: [verifyJWT],
    handler: createRolePermissionController,
    schema: CreateRolePermissionSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:rolePermissionId/update',
    onRequest: [verifyJWT],
    handler: updateRolePermissionController,
    schema: UpdateRolePermissionSchema,
  });

  app.route({
    method: 'GET',
    url: '/list',
    handler: listRolesPermissionsController,
    schema: ListRolesPermissionsSchema,
  });
}
