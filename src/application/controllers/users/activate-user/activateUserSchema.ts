import { sharedSchemas } from '../../sharedSchemas';
import { userEntitiesSchemas } from '../userSchemas';

export const activateUserSchema = {
  summary: 'Activate user',
  description: [
    'This route allows the user to activate a user.',
    '',
    '-   Only authenticated users have the privilege to activate a user.',
    '',
    '-   The user id must be a valid UUID and must be sent as a path parameter',
    '',
    '-   The user must exist in the database.',
    '',
    '-   The response includes the activated user.',
  ].join('\n'),
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      ...userEntitiesSchemas.User,
    },
    404: sharedSchemas.Error_404,
    500: sharedSchemas.Error_500,
  },
};
