import { sharedSchemas } from '../../sharedSchemas';
import {
  authenticateEntitiesSchemas,
  authenticateRequestsSchemas,
} from '../authenticateSchemas';

const description = [
  'This route allows the user to refresh a token.',
  '',
  '-   The response includes a token and a refreshToken.',
].join('\n');

export const refreshTokenSchema = {
  summary: 'Refresh token',
  description,
  tags: ['Auth'],
  body: authenticateRequestsSchemas.RefreshingToken,
  response: {
    200: {
      description: 'Successful response',
      ...authenticateEntitiesSchemas.Authenticate,
    },
    400: sharedSchemas.Error_400,
    500: sharedSchemas.Error_500,
  },
};
