import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'UserDetails';
type requestSchemaKey = 'SaveUserDetails';

export const userDetailsEntitiesSchemas = {
  UserDetails: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
      },
      userId: {
        type: 'string',
        format: 'uuid',
        example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
      },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      birthDate: { type: 'string', example: '1981-01-01T00:00:00.000Z' },
      gender: {
        type: 'string',
        enum: [
          'Male',
          'Female',
          'NonBinary',
          'Agender',
          'GenderFluid',
          'Bigender',
          'QueerGender',
          'Other',
        ],
        example: 'Male',
      },
      avatar: { type: 'string', example: 'avatar.jpg' },
      bio: { type: 'string', example: 'bio' },
      createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const userDetailsRequestsSchemas = {
  SaveUserDetails: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      birthDate: { type: 'string' },
      gender: { type: 'string' },
      avatar: { type: 'string' },
      bio: { type: 'string' },
    },
  },
} as Record<requestSchemaKey, SchemaObject>;
