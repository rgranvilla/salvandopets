import { createRoleController } from '@/application/controllers/roles/create-role/createRoleController';
import { CreateRoleSchema } from '@/application/controllers/roles/create-role/createRoleSchema';
import { FastifyInstance } from 'fastify';

export async function rolesRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    handler: createRoleController,
    schema: CreateRoleSchema,
  });
}
