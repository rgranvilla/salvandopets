import { FastifySchema } from 'fastify';
import { sharedSchemas } from '../../sharedSchemas';
import {
  permissionsEntitiesSchemas,
  permissionsRequestsSchemas,
} from '../permissionsSchemas';

const description = [
  'This route allows the user to update a permission.',
  '',
  '-   Only authenticated users have the privilege to update a permission.',
  '',
  '-   The permission id must be a valid UUID and must be sent as a path parameter',
  '',
  '-   The permission must exist in the database.',
  '',
  '-   The response includes the updated permission.',
].join('\n');

export const UpdatePermissionSchema = {
  summary: 'Update a permission',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: permissionsRequestsSchemas.UpdatePermission,
  params: {
    type: 'object',
    properties: {
      permissionId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'Permission updated successfully',
      ...permissionsEntitiesSchemas.Permission,
    },
    400: sharedSchemas.Error_400,
    404: sharedSchemas.Error_404,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
} as FastifySchema;
