import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'UserAddress';

export const userAddressEntitiesSchemas = {
  UserAddress: {
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
      addressId: {
        type: 'string',
        format: 'uuid',
        example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
      },
      createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;
