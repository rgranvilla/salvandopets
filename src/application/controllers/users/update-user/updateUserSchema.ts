import { FastifySchema } from 'fastify';

export const UpdateUserSchema = {
  summary: 'Update an user',
  description: 'Update an user',
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      isActive: { type: 'boolean' },
      deactivationDate: { type: 'string' },
      deactivationReason: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'User updated successfully',
      type: 'object',
      properties: {
        id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
        username: { type: 'string', example: 'johndoe' },
        email: { type: 'string', example: 'johndoe@mail.com' },
        isActive: { type: 'boolean', example: true },
        deactivationDate: { type: 'string', example: null },
        deactivationReason: { type: 'string', example: null },
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
              path: { type: 'string', example: 'password' },
              message: { type: 'string', example: 'Invalid password' },
            },
          },
        },
      },
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'User Not Found' },
      },
    },
    409: {
      description: 'Username already in use',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'This username already in use' },
        error: { type: 'string', example: 'Username Not Available' },
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
