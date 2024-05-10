import { sharedSchemas } from '../../sharedSchemas';
import { userRolesEntitiesSchemas } from '../userRolesSchemas';

const description = [
  'This endpoint is responsible for saving the relationship between a user and roles.',
  '',
  'The user is identified by the `userId` parameter and the roles are identified by the `roleId` parameter',
  '',
  '- The relationship is saved in the database and the response returns the relationship created.',
  '',
  '- The relationship is created by the `userId` and the `roleId`.',
  '',
  '- The `userId` and `roleId` must be valid UUIDs',
].join('\n');

export const SaveUserRolesSchema = {
  summary: 'Relationship between user and roles',
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
      ...userRolesEntitiesSchemas.UserRoles,
    },
    400: sharedSchemas.Error_400,
    500: sharedSchemas.Error_500,
  },
};
