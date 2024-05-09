import { sharedSchemas } from '../../sharedSchemas';
import { rolesEntitiesSchemas } from '../rolesSchemas';

const description = [
  'This route allows the user to list all roles.',
  '',
  '-   Only authenticated users have the privilege to list roles.',
  '',
  '-   The response includes a list of roles.',
].join('\n');

export const listRolesSchema = {
  summary: 'List all roles',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          roles: rolesEntitiesSchemas.Role,
          example: [
            {
              id: 'e7d1b3c4-6f5a-4b0d-bf2c-8e9b6e2a1c7a',
              name: 'Admin',
              description: 'Can manager all system',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: 'a1b2c3d4-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
              name: 'Manager',
              description: 'Can manager some system',
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
