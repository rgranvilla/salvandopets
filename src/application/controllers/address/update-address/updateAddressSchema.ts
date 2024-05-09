import { FastifySchema } from 'fastify';
import { sharedSchemas } from '../../sharedSchemas';
import {
  addressEntitiesSchemas,
  addressRequestsSchemas,
} from '../addressSchemas';

const description = [
  'This route allows the user to update a address.',
  '',
  '-   Only authenticated users have the privilege to update an address.',
  '',
  '-   The address id must be a valid UUID and must be sent as a query parameter',
  '',
  '-   The address must exist in the database.',
  '',
  '-   The response includes the updated address.',
].join('\n');

export const UpdateAddressSchema = {
  summary: 'Update a address',
  description,
  tags: ['Addresses'],
  security: [{ bearerAuth: [] }],
  body: addressRequestsSchemas.UpdateAddress,
  params: {
    type: 'object',
    properties: {
      addressId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    201: {
      description: 'User updated successfully',
      ...addressEntitiesSchemas.Address,
    },
    400: sharedSchemas.Error_400,
    404: sharedSchemas.Error_404,
    500: sharedSchemas.Error_500,
  },
} as FastifySchema;
