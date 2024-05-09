import { sharedSchemas } from '../../sharedSchemas';
import {
  rolesPermissionsEntitiesSchemas,
  rolesPermissionsRequestsSchemas,
} from '../rolesPermissionsSchemas';

const description = [
  'This route allows the user to create a new role permission.',
  '',
  '-   Only authenticated users have the privilege to create a role permission.',
  '',
  '-   The role permission must be unique.',
  '',
  '-   The response includes the created role permission.',
].join('\n');

export const CreateRolePermissionSchema = {
  summary: 'Create a new role permission',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: rolesPermissionsRequestsSchemas.CreateRolePermission,
  response: {
    201: {
      description: 'Role permission created successfully',
      ...rolesPermissionsEntitiesSchemas.RolePermissions,
    },
    400: sharedSchemas.Error_400,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
};
