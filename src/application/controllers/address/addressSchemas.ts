import { SchemaObject } from '@fastify/swagger';

type entitiesSchemaKey = 'Address';
type requestSchemaKey = 'CreateAddress' | 'UpdateAddress';

export const addressEntitiesSchemas = {
  Address: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
      isMain: { type: 'boolean', example: false },
      isBilling: { type: 'boolean', example: false },
      isShipping: { type: 'boolean', example: false },
      type: { type: 'string', example: 'Home' },
      description: { type: 'string', example: 'description' },
      street: { type: 'string', example: 'street' },
      number: { type: 'string', example: '123' },
      complement: { type: 'string', example: 'complement' },
      neighborhood: { type: 'string', example: 'neighborhood' },
      city: { type: 'string', example: 'city' },
      state: { type: 'string', example: 'state' },
      country: { type: 'string', example: 'country' },
      postalCode: { type: 'string', example: '12345-678' },
      createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
    },
  },
} as Record<entitiesSchemaKey, SchemaObject>;

export const addressRequestsSchemas = {
  CreateAddress: {
    type: 'object',
    properties: {
      isMain: { type: 'boolean', default: false },
      isBilling: { type: 'boolean', default: false },
      isShipping: { type: 'boolean', default: false },
      type: {
        type: 'string',
        enum: ['Home', 'Work', 'Other'],
        default: 'Home',
      },
      description: { type: 'string', nullable: true },
      street: { type: 'string' },
      number: { type: 'string' },
      complement: { type: 'string', nullable: true },
      neighborhood: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      country: { type: 'string' },
      postalCode: { type: 'string' },
    },
    required: [
      'isMain',
      'isBilling',
      'isShipping',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
      'country',
      'postalCode',
    ],
  },
  UpdateAddress: {
    type: 'object',
    properties: {
      isMain: { type: 'boolean', default: false },
      isBilling: { type: 'boolean', default: false },
      isShipping: { type: 'boolean', default: false },
      type: {
        type: 'string',
        enum: ['Home', 'Work', 'Other'],
        default: 'Home',
      },
      description: { type: 'string', nullable: true },
      street: { type: 'string' },
      number: { type: 'string' },
      complement: { type: 'string', nullable: true },
      neighborhood: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      country: { type: 'string' },
      postalCode: { type: 'string' },
    },
    required: [
      'isMain',
      'isBilling',
      'isShipping',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
      'country',
      'postalCode',
    ],
  },
} as Record<requestSchemaKey, SchemaObject>;
