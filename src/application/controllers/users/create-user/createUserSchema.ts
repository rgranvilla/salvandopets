import { sharedSchemas } from '../../sharedSchemas';
import { userEntitiesSchemas, userRequestsSchemas } from '../userSchemas';

export const CreateUserSchema = {
  summary: 'Create a new user',
  description: [
    'This route allows the user to create a new user.',
    '',
    '-   The user must be unique.',
    '',
    '-   The response includes the created user.',
  ].join('\n'),
  tags: ['Users'],
  body: userRequestsSchemas.CreateUser,
  response: {
    201: {
      description: 'User created successfully',
      ...userEntitiesSchemas.User,
    },
    400: sharedSchemas.Error_400,
    409: sharedSchemas.Error_409,
    500: sharedSchemas.Error_500,
  },
};
