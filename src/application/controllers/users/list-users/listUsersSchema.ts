import { sharedSchemas } from '../../sharedSchemas';
import { userEntitiesSchemas, userRequestsSchemas } from '../userSchemas';

export const listUsersSchema = {
  summary: 'List all users',
  description: [
    'This route allows the user to list all users.',
    '',
    '-   Only authenticated users have the privilege to list users.',
    '',
    '-   The response includes a list of users.',
  ].join('\n'),
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  querystring: userRequestsSchemas.ListUser,
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        currentPage: { type: 'number', example: 1 },
        perPage: { type: 'number', example: 2 },
        count: { type: 'number', example: 100 },
        data: {
          type: 'array',
          users: userEntitiesSchemas.User,
          example: [
            {
              id: 'e7d1b3c4-6f5a-4b0d-bf2c-8e9b6e2a1c7a',
              username: 'john_doe',
              email: 'john_doe@mail.com',
              password: 'hashed_password',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: 'a1b2c3d4-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
              username: 'jane_doe',
              email: 'jane_doe@mail.com',
              password: 'hashed_password',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
          ],
        },
      },
    },
    401: sharedSchemas.Error_401,
    500: sharedSchemas.Error_500,
  },
};
