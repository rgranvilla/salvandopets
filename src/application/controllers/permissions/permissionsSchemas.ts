import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'Permission';
type requestSchemaKey = 'CreatePermission' | 'UpdatePermission';

export const permissionsEntitiesSchemas = {
  Permission: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
      name: { type: 'string', example: 'RolesManagementPermissions' },
      description: {
        type: 'string',
        example: 'Permissions to management and use roles',
      },
      createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const permissionsRequestsSchemas = {
  CreatePermission: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['name'],
  },
  UpdatePermission: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
  },
} as Record<requestSchemaKey, SchemaObject>;
