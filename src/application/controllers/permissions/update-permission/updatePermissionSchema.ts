import { FastifySchema } from 'fastify';

export const UpdatePermissionSchema = {
  summary: 'Update a permission',
  description: 'Update a permission by id',
  tags: ['Permissions'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    properties: {
      permissionId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'Permission updated successfully',
      type: 'object',
      properties: {
        id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
        name: { type: 'string', example: 'name' },
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
      description: 'Permission not found',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Permission not found' },
        error: { type: 'string', example: 'Permission Not Found' },
      },
    },
    409: {
      description: 'Permission name already in use',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'This permission name already in use',
        },
        error: { type: 'string', example: 'Permission Name Not Available' },
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
