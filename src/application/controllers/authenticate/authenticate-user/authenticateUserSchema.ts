import { sharedSchemas } from '../../sharedSchemas';
import {
  authenticateEntitiesSchemas,
  authenticateRequestsSchemas,
} from '../authenticateSchemas';

const description = [
  'This route allows the user to authenticate a user.',
  '',
  '-   The user must exist in the database.',
  '',
  '-   The response includes a token and a refreshToken.',
].join('\n');

export const authenticateUserSchema = {
  summary: 'Authenticate user',
  description,
  tags: ['Auth'],
  body: authenticateRequestsSchemas.Authentication,
  response: {
    200: {
      description: 'Successful response',
      ...authenticateEntitiesSchemas.Authenticate,
    },
    500: sharedSchemas.Error_500,
  },
};
