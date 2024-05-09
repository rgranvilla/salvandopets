import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'Role';
type requestSchemaKey = 'CreateRole' | 'UpdateRole';

export const rolesEntitiesSchemas = {
  Role: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
      name: { type: 'string', example: 'admin' },
      description: {
        type: 'string',
        example: 'administrator role, can be manager system',
      },
      createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const rolesRequestsSchemas = {
  CreateRole: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['name'],
  },
  UpdateRole: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
  },
} as Record<requestSchemaKey, SchemaObject>;
