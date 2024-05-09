import { sharedSchemas } from '../../sharedSchemas';
import { permissionsEntitiesSchemas } from '../permissionsSchemas';

const description = [
  'This route allows the user to list all permissions.',
  '',
  '-   Only authenticated users have the privilege to list permissions.',
  '',
  '-   The response includes a list of permissions.',
].join('\n');

export const listPermissionsSchema = {
  summary: 'List all permissions',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          permissions: permissionsEntitiesSchemas.Permission,
          example: [
            {
              id: 'e7d1b3c4-6f5a-4b0d-bf2c-8e9b6e2a1c7a',
              name: 'RolesManagementPermissions',
              description: 'Permissions to management and use roles',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: 'a1b2c3d4-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
              name: 'UsersManagementPermissions',
              description: 'Permissions to management and use users',
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
