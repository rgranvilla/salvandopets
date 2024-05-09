import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'RolePermissions';
type requestSchemaKey = 'CreateRolePermission' | 'UpdateRolePermission';

export const rolesPermissionsEntitiesSchemas = {
  RolePermissions: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
      roleId: {
        type: 'string',
        example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
      },
      permissionId: {
        type: 'string',
        example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
      },
      canCreate: { type: 'boolean', example: true },
      canRead: { type: 'boolean', example: true },
      canUpdate: { type: 'boolean', example: true },
      canDelete: { type: 'boolean', example: true },
      createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const rolesPermissionsRequestsSchemas = {
  CreateRolePermission: {
    type: 'object',
    properties: {
      roleId: { type: 'string' },
      permissionId: { type: 'string' },
      canCreate: { type: 'boolean' },
      canRead: { type: 'boolean' },
      canUpdate: { type: 'boolean' },
      canDelete: { type: 'boolean' },
    },
    required: [
      'roleId',
      'permissionId',
      'canCreate',
      'canRead',
      'canUpdate',
      'canDelete',
    ],
  },
  UpdateRolePermission: {
    type: 'object',
    properties: {
      roleId: { type: 'string' },
      permissionId: { type: 'string' },
      canCreate: { type: 'boolean' },
      canRead: { type: 'boolean' },
      canUpdate: { type: 'boolean' },
      canDelete: { type: 'boolean' },
    },
  },
} as Record<requestSchemaKey, SchemaObject>;
