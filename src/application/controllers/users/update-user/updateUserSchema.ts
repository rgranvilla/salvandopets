import { FastifySchema } from 'fastify';

import { sharedSchemas } from '../../sharedSchemas';
import { userEntitiesSchemas, userRequestsSchemas } from '../userSchemas';

export const UpdateUserSchema = {
  summary: 'Update an user',
  description: [
    'This route allows the user to update an user.',
    '',
    '-   Only authenticated users have the privilege to update an user.',
    '',
    '-   The user id must be a valid UUID and must be sent as a path parameter',
    '',
    '-   The user must exist in the database.',
    '',
    '-   The response includes the updated user.',
  ].join('\n'),
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  body: userRequestsSchemas.UpdateUser,
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'User updated successfully',
      ...userEntitiesSchemas.User,
    },
    400: sharedSchemas.Error_400,
    404: sharedSchemas.Error_404,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
} as FastifySchema;
