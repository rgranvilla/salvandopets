import { sharedSchemas } from '../../sharedSchemas';
import { rolesPermissionsEntitiesSchemas } from '../rolesPermissionsSchemas';

const description = [
  'This route allows the user to list all roles.',
  '',
  '-   Only authenticated users have the privilege to list roles.',
  '',
  '-   The response includes a list of roles.',
].join('\n');

export const ListRolesPermissionsSchema = {
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
          rolesPermissions: rolesPermissionsEntitiesSchemas.RolePermissions,
          example: [
            {
              id: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              roleId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              permissionId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: '4d7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c2d',
              roleId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              permissionId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
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
