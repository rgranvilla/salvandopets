import { createPermissionController } from '@/application/controllers/permissions/create-permission/createPermissionController';
import { CreatePermissionSchema } from '@/application/controllers/permissions/create-permission/createPermissionSchema';
import { listPermissionsController } from '@/application/controllers/permissions/list-permission/listPermissionsControler';
import { listPermissionsSchema } from '@/application/controllers/permissions/list-permission/listPermissionsSchema';
import { updatePermissionController } from '@/application/controllers/permissions/update-permission/updatePermissionController';
import { UpdatePermissionSchema } from '@/application/controllers/permissions/update-permission/updatePermissionSchema';
import { verifyJWT } from '@/core/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

export async function permissionsRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    onRequest: [verifyJWT],
    handler: createPermissionController,
    schema: CreatePermissionSchema,
  });

  app.route({
    method: 'GET',
    url: '/list',
    onRequest: [verifyJWT],
    handler: listPermissionsController,
    schema: listPermissionsSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:permissionId/update',
    onRequest: [verifyJWT],
    handler: updatePermissionController,
    schema: UpdatePermissionSchema,
  });
}
