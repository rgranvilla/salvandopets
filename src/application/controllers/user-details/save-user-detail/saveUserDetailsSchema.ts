import { sharedSchemas } from '../../sharedSchemas';
import {
  userDetailsEntitiesSchemas,
  userDetailsRequestsSchemas,
} from '../userDetailSchemas';

const description = [
  'This route allows the user to save a personal detail.',
  '',
  '-   Only authenticated users have the privilege to save a personal detail.',
  '',
  '-   The user id must be a valid UUID and must be sent as a path parameter',
  '',
  '-   The user must exist in the database.',
  '',
  '-   The response includes the saved personal detail.',
].join('\n');

export const SaveUserDetailsSchema = {
  summary: 'Save an user detail',
  description,
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
  },
  body: userDetailsRequestsSchemas.SaveUserDetails,
  response: {
    201: {
      description: 'Personal detail created successfully',
      ...userDetailsEntitiesSchemas.UserDetails,
    },
    400: sharedSchemas.Error_400,
    500: sharedSchemas.Error_500,
  },
};
