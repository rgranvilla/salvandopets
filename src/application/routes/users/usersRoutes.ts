import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/core/middlewares/verifyJWT';

import { activateUserController } from '@/application/controllers/users/activate-user/activateUserController';
import { activateUserSchema } from '@/application/controllers/users/activate-user/activateUserSchema';
import { createUserController } from '@/application/controllers/users/create-user/createUserController';
import { CreateUserSchema } from '@/application/controllers/users/create-user/createUserSchema';
import { deactivateUserController } from '@/application/controllers/users/deactivate-user/deactivateUserController';
import { deactivateUserSchema } from '@/application/controllers/users/deactivate-user/deactivateUserSchema';
import { listUsersController } from '@/application/controllers/users/list-users/listUsersControler';
import { listUsersSchema } from '@/application/controllers/users/list-users/listUsersSchema';
import { updateUserController } from '@/application/controllers/users/update-user/updateUserController';
import { UpdateUserSchema } from '@/application/controllers/users/update-user/updateUserSchema';

export async function usersRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    handler: createUserController,
    schema: CreateUserSchema,
  });

  app.route({
    method: 'GET',
    url: '/list',
    onRequest: [verifyJWT],
    handler: listUsersController,
    schema: listUsersSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:userId/update',
    onRequest: [verifyJWT],
    handler: updateUserController,
    schema: UpdateUserSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:userId/activate',
    onRequest: [verifyJWT],
    handler: activateUserController,
    schema: activateUserSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:userId/deactivate',
    onRequest: [verifyJWT],
    handler: deactivateUserController,
    schema: deactivateUserSchema,
  });
}
