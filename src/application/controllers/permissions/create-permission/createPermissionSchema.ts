import { sharedSchemas } from '../../sharedSchemas';
import {
  permissionsEntitiesSchemas,
  permissionsRequestsSchemas,
} from '../permissionsSchemas';

const description = [
  'This route allows the user to create a new permission.',
  '',
  '-   Only authenticated users have the privilege to create a permission.',
  '',
  '-   The permission name must be unique.',
  '',
  '-   The response includes the created permission.',
].join('\n');

export const CreatePermissionSchema = {
  summary: 'Create a new permission',
  description,
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: permissionsRequestsSchemas.CreatePermission,
  response: {
    201: {
      description: 'Permission created successfully',
      ...permissionsEntitiesSchemas.Permission,
    },
    400: sharedSchemas.Error_400,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
};
