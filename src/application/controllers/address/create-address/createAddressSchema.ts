import { sharedSchemas } from '../../sharedSchemas';
import {
  addressEntitiesSchemas,
  addressRequestsSchemas,
} from '../addressSchemas';

const description = [
  'To create a new address:',
  '',
  '-   Only authenticated users have the privilege to create an address.',
  '',
  '-   A user is allowed to possess multiple addresses.',
  '',
  '-   Each address can be designated as main, billing, or shipping.',
  '',
  '-   Address types include Home, Work, or Other.',
  '',
  '-   The address description and complement fields are optional.',
  '',
  '-   The postal code must be in a numerical string format without any special characters or masks.',
  '',
  '-   The address number is a string to accommodate alphanumeric entries, such as 123A.',
  '',
  '-   Timestamps for address creation and updates adhere to the ISO 8601 standard.',
  '',
  '-   The response includes the created address.',
].join('\n');

export const CreateAddressSchema = {
  summary: 'Create a new address',
  description,
  tags: ['Addresses'],
  security: [{ bearerAuth: [] }],
  body: addressRequestsSchemas.CreateAddress,
  response: {
    201: {
      description: 'Role created successfully',
      ...addressEntitiesSchemas.Address,
    },
    400: sharedSchemas.Error_400,
    500: sharedSchemas.Error_500,
  },
};
