import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'Authenticate';
type requestSchemaKey = 'Authentication' | 'RefreshingToken';

export const authenticateEntitiesSchemas = {
  Authenticate: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzUxMiI...',
      },
      refreshToken: {
        type: 'string',
        example: 'eyJhbGciOiJIUzUxMiIsIn...',
      },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const authenticateRequestsSchemas = {
  Authentication: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
    },
    required: ['email', 'password'],
  },
  RefreshingToken: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' },
      userId: {
        type: 'string',
      },
    },
  },
} as Record<requestSchemaKey, SchemaObject>;
