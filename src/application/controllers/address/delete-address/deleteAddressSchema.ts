import { sharedSchemas } from '../../sharedSchemas';

const description = [
  'This route allows the user to delete a address by id.',
  '',
  '-   Only authenticated users have the privilege to delete an address.',
  '',
  '-   The address id must be a valid UUID and must be sent as a query parameter',
  '',
  '-   The address must exist in the database.',
  '',
  '-   The response includes a message indicating the success of the operation.',
].join('\n');

export const DeleteAddressSchema = {
  summary: 'Delete a address by id',
  description,
  tags: ['Addresses'],
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      addressId: { type: 'string', format: 'uuid' },
    },
    required: ['addressId'],
  },
  response: {
    201: {
      description: 'Role created successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Address deleted successfully' },
      },
    },
    400: sharedSchemas.Error_400,
    500: sharedSchemas.Error_500,
  },
};
