import { FastifySchema } from 'fastify';

export const UpdateRolePermissionSchema = {
  summary: 'Update a role permission',
  description: 'Update a role permission by\n\n rolePermissionId',
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: {
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
  params: {
    type: 'object',
    properties: {
      rolePermissionId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'Role Permission updated successfully',
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
    400: {
      description: 'Invalid input',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        error: { type: 'string', example: 'Bad Request' },
        message: { type: 'string', example: 'Validation error' },
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: { type: 'string', example: 'name' },
              message: { type: 'string', example: 'Invalid name' },
            },
          },
        },
      },
    },
    404: {
      description: 'Role permission not found',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Role permission not found' },
        error: { type: 'string', example: 'Role Permission Not Found' },
      },
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Internal Server Error' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  },
} as FastifySchema;
