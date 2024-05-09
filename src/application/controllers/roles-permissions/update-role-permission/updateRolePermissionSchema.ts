import { FastifySchema } from 'fastify';

import { sharedSchemas } from '../../sharedSchemas';
import {
  rolesPermissionsEntitiesSchemas,
  rolesPermissionsRequestsSchemas,
} from '../rolesPermissionsSchemas';

const description = [
  'This route allows the user to update a role permission.',
  '',
  '-   Only authenticated users have the privilege to update a role permission.',
  '',
  '-   The role permission id must be a valid UUID and must be sent as a path parameter',
  '',
  '-   The role permission must exist in the database.',
  '',
  '-   The response includes the updated role permission.',
].join('\n');

export const UpdateRolePermissionSchema = {
  summary: 'Update a role permission',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: rolesPermissionsRequestsSchemas.UpdateRolePermission,
  params: {
    type: 'object',
    properties: {
      rolePermissionId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'Role Permission updated successfully',
      ...rolesPermissionsEntitiesSchemas.RolePermissions,
    },
    400: sharedSchemas.Error_400,
    404: sharedSchemas.Error_404,
    500: sharedSchemas.Error_500,
  },
} as FastifySchema;
