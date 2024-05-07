export const CreatePermissionSchema = {
  summary: 'Create a new permission',
  description: 'Create a new permission',
  tags: ['Permissions'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['name'],
  },
  response: {
    201: {
      description: 'Permission created successfully',
      type: 'object',
      properties: {
        id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
        name: { type: 'string', example: 'RolesManagementPermissions' },
        description: {
          type: 'string',
          example: 'Permissions to management and use roles',
        },
        createdAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
        updatedAt: { type: 'string', example: '2021-08-01T00:00:00.000Z' },
      },
    },
    400: {
      description: 'Invalid input',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        error: { type: 'string', example: 'Bad Request' },
        message: { type: 'string', example: 'Validation error' },
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: { type: 'string', example: 'name' },
              message: { type: 'string', example: 'Invalid name' },
            },
          },
        },
      },
    },
    409: {
      description: 'Permission name already in use',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'This permission name already in use',
        },
        error: { type: 'string', example: 'Permission Name Not Available' },
      },
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Internal Server Error' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  },
};
