import { SchemaObject } from '@fastify/swagger';

type schemaKey =
  | 'Error_400'
  | 'Error_401'
  | 'Error_404'
  | 'Error_409'
  | 'Error_500';

export const sharedSchemas = {
  Error_400: {
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
            path: { type: 'string', example: 'field' },
            message: { type: 'string', example: 'Invalid field' },
          },
        },
      },
    },
  },
  Error_401: {
    description: 'Unauthorized',
    type: 'object',
    properties: {
      hasError: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Unauthorized' },
      error: {
        type: 'string',
        example: 'You are not authorized to access this resource.',
      },
    },
  },
  Error_404: {
    description: 'Not found',
    type: 'object',
    properties: {
      hasError: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Not found' },
      error: { type: 'string', example: 'Not Found' },
    },
  },
  Error_409: {
    description: 'Conflict error',
    type: 'object',
    properties: {
      hasError: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Conflict error' },
      error: { type: 'string', example: 'Conflict Error' },
    },
  },
  Error_500: {
    description: 'Server error',
    type: 'object',
    properties: {
      hasError: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Internal Server Error' },
      error: { type: 'string', example: 'Internal Server Error' },
    },
  },
} as Record<schemaKey, SchemaObject>;
