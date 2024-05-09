import { sharedSchemas } from '../../sharedSchemas';
import { rolesEntitiesSchemas, rolesRequestsSchemas } from '../rolesSchemas';

const description = [
  'This route allows the user to create a new role.',
  '',
  '-   Only authenticated users have the privilege to create a role.',
  '',
  '-   The role name must be unique.',
  '',
  '-   The response includes the created role.',
].join('\n');

export const CreateRoleSchema = {
  summary: 'Create a new role',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: rolesRequestsSchemas.CreateRole,
  response: {
    201: {
      description: 'Role created successfully',
      ...rolesEntitiesSchemas.Role,
    },
    400: sharedSchemas.Error_400,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
};
