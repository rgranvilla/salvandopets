import { FastifySchema } from 'fastify';

export const UpdateRoleSchema = {
  summary: 'Update a role',
  description: 'Update a role',
  tags: ['Roles'],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    properties: {
      roleId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'User updated successfully',
      type: 'object',
      properties: {
        id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
        name: { type: 'string', example: 'name' },
        description: { type: 'string', example: 'Can manager all system' },
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
      description: 'Role not found',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Role not found' },
        error: { type: 'string', example: 'Role Not Found' },
      },
    },
    409: {
      description: 'Role name already in use',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'This role name already in use' },
        error: { type: 'string', example: 'Role Name Not Available' },
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
