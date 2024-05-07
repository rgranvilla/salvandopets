import { activateUserController } from '@/application/controllers/users/activate-user/activateUserController';
import { activateUserSchema } from '@/application/controllers/users/activate-user/activateUserSchema';
import { authenticateUserController } from '@/application/controllers/users/authenticate-user/authenticateUserController';
import { authenticateUserSchema } from '@/application/controllers/users/authenticate-user/authenticateUserSchema';
import { createUserController } from '@/application/controllers/users/create-user/createUserController';
import { CreateUserSchema } from '@/application/controllers/users/create-user/createUserSchema';
import { deactivateUserController } from '@/application/controllers/users/deactivate-user/deactivateUserController';
import { deactivateUserSchema } from '@/application/controllers/users/deactivate-user/deactivateUserSchema';
import { listUsersController } from '@/application/controllers/users/list-users/listUsersControler';
import { listUsersSchema } from '@/application/controllers/users/list-users/listUsersSchema';
import { refreshTokenController } from '@/application/controllers/users/refresh-token/refreshTokenController';
import { refreshTokenSchema } from '@/application/controllers/users/refresh-token/refreshTokenSchema';
import { savePersonalDetailController } from '@/application/controllers/users/save-personal-detail/savePersonalDetailController';
import { SavePersonalDetailSchema } from '@/application/controllers/users/save-personal-detail/savePersonalDetailSchema';
import { updateUserController } from '@/application/controllers/users/update-user/updateUserController';
import { UpdateUserSchema } from '@/application/controllers/users/update-user/updateUserSchema';
import { verifyJWT } from '@/core/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

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

  app.route({
    method: 'POST',
    url: '/authenticate',
    handler: authenticateUserController,
    schema: authenticateUserSchema,
  });

  app.route({
    method: 'POST',
    url: '/refresh-token',
    handler: refreshTokenController,
    schema: refreshTokenSchema,
  });

  app.route({
    method: 'POST',
    url: '/save-personal-detail',
    onRequest: [verifyJWT],
    handler: savePersonalDetailController,
    schema: SavePersonalDetailSchema,
  });
}
