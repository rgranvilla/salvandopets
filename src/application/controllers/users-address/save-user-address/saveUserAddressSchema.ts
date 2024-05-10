import { sharedSchemas } from '../../sharedSchemas';
import { userAddressEntitiesSchemas } from '../userAddressSchemas';

const description = [
  'This endpoint is responsible for saving the relationship between a user and an address.',
  '',
  '- The relationship is saved in the database and the response returns the relationship created.',
  '',
  '- The relationship is created by the user ID and the address ID.',
  '',
  '- The user ID and address ID must be valid UUIDs',
  '',
].join('\n');

export const SaveUserAddressSchema = {
  summary: 'Relationship between user and address',
  description,
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      addressId: { type: 'string' },
    },
  },
  response: {
    201: {
      description: '',
      ...userAddressEntitiesSchemas.UserAddress,
    },
    400: sharedSchemas.Error_400,
    500: sharedSchemas.Error_500,
  },
};
