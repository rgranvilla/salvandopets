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
    handler: updateUserController,
    schema: UpdateUserSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:userId/activate',
    handler: activateUserController,
    schema: activateUserSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:userId/deactivate',
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
    schema: {
      summary: 'Save a personal detail',
      description: 'Save a personal detail for an user',
      tags: ['Users'],
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          birthDate: { type: 'string' },
          gender: { type: 'string' },
          avatar: { type: 'string' },
          bio: { type: 'string' },
        },
        required: ['userId'],
      },
      response: {
        201: {
          description: 'Personal detail created successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            birthDate: { type: 'string' },
            gender: { type: 'string' },
            avatar: { type: 'string' },
            bio: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        400: {
          description: 'Invalid input',
          type: 'object',
          properties: {
            hasError: { type: 'boolean', example: true },
            error: { type: 'string', example: 'Bad Request' },
            message: { type: 'string', example: 'Validation error' },
            issues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  path: { type: 'string', example: 'firstName' },
                  message: { type: 'string', example: 'Invalid password' },
                },
              },
            },
          },
        },
        500: {
          description: 'Server error',
          type: 'object',
          properties: {
            hasError: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Internal Server Error' },
            error: { type: 'string', example: 'Internal Server Error' },
          },
        },
      },
    },
  });
}
