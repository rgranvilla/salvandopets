import { sharedSchemas } from '../../sharedSchemas';
import { addressEntitiesSchemas } from '../addressSchemas';

const description = [
  'This route allows the user to list all addresses.',
  '',
  '-   Only authenticated users have the privilege to list addresses.',
  '',
  '-   The response includes a list of addresses.',
].join('\n');

export const ListAddressSchema = {
  summary: 'List all addresses',
  description,
  tags: ['Addresses'],
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        addresses: {
          type: 'array',
          address: addressEntitiesSchemas.Address,
          example: [
            {
              id: 'e7d1b3c4-6f5a-4b0d-bf2c-8e9b6e2a1c7a',
              isMain: true,
              isBilling: true,
              isShipping: true,
              type: 'Home',
              description: 'description',
              street: 'street',
              number: '123',
              complement: 'complement',
              neighborhood: 'neighborhood',
              city: 'city',
              state: 'state',
              country: 'country',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: 'a1b2c3d4-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
              isMain: false,
              isBilling: true,
              isShipping: false,
              type: 'Work',
              description: null,
              street: 'street',
              number: '123',
              complement: null,
              neighborhood: 'neighborhood',
              city: 'city',
              state: 'state',
              country: 'country',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
          ],
        },
      },
    },
    401: sharedSchemas.Error_401,
    500: sharedSchemas.Error_500,
  },
};
