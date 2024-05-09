import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'User';
type requestSchemaKey =
  | 'CreateUser'
  | 'UpdateUser'
  | 'ListUser'
  | 'DeactivateUser';

export const userEntitiesSchemas = {
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
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
      },
      username: { type: 'string', example: 'johndoe' },
      email: { type: 'string', format: 'email', example: 'johndoe@mail.com' },
      isActive: { type: 'boolean', example: true },
      deactivationDate: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      deactivationReason: { type: 'string', example: 'deactivation reason' },
      createdAt: {
        type: 'string',
        example: '2021-08-01T00:00:00.000Z',
      },
      updatedAt: {
        type: 'string',
        example: '2021-08-01T00:00:00.000Z',
      },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const userRequestsSchemas = {
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
  CreateUser: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      isActive: { type: 'boolean' },
    },
    required: ['email', 'password'],
  },
  UpdateUser: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      isActive: { type: 'boolean' },
      deactivationDate: { type: 'string' },
      deactivationReason: { type: 'string' },
    },
  },
  ListUser: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      perPage: { type: 'number' },
      sortBy: {
        type: 'string',
        enum: ['username', 'email', 'createdAt'],
      },
      sortOrder: {
        type: 'string',
        enum: ['asc', 'desc'],
      },
      searchField: {
        type: 'string',
        enum: ['username', 'email'],
      },
      searchQuery: { type: 'string' },
      dateRangeField: { type: 'string' },
      dateRangeStart: { type: 'string' },
      dateRangeEnd: { type: 'string' },
    },
  },
  DeactivateUser: {
    type: 'object',
    properties: {
      deactivationReason: { type: 'string' },
    },
  },
} as Record<requestSchemaKey, SchemaObject>;
