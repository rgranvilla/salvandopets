import { sharedSchemas } from '../../sharedSchemas';
import { userEntitiesSchemas, userRequestsSchemas } from '../userSchemas';

export const deactivateUserSchema = {
  summary: 'Deactivate user',
  description: [
    'This route allows the user to deactivate a user.',
    '',
    '-   Only authenticated users have the privilege to deactivate a user.',
    '',
    '-   The user id must be a valid UUID and must be sent as a path parameter',
    '',
    '-   The user must exist in the database.',
    '',
    '-   The response includes the deactivated user.',
  ].join('\n'),
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
  },
  body: userRequestsSchemas.DeactivateUser,
  response: {
    200: {
      description: 'Successful response',
      ...userEntitiesSchemas.User,
    },
    404: sharedSchemas.Error_404,
    500: sharedSchemas.Error_500,
  },
};
