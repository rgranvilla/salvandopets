import { FastifySchema } from 'fastify';

import { sharedSchemas } from '../../sharedSchemas';
import { rolesEntitiesSchemas, rolesRequestsSchemas } from '../rolesSchemas';

const description = [
  'This route allows the user to update a role.',
  '',
  '-   Only authenticated users have the privilege to update a role.',
  '',
  '-   The role id must be a valid UUID and must be sent as a path parameter',
  '',
  '-   The role must exist in the database.',
  '',
  '-   The response includes the updated role.',
].join('\n');

export const UpdateRoleSchema = {
  summary: 'Update a role',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: rolesRequestsSchemas.UpdateRole,
  params: {
    type: 'object',
    properties: {
      roleId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'Role updated successfully',
      ...rolesEntitiesSchemas.Role,
    },
    400: sharedSchemas.Error_400,
    404: sharedSchemas.Error_404,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
} as FastifySchema;
