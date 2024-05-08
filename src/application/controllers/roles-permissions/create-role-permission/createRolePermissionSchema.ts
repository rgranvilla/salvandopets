export const CreateRolePermissionSchema = {
  summary: 'Create a new role permission',
  description: 'Create a new role permission',
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      roleId: { type: 'string' },
      permissionId: { type: 'string' },
      canCreate: { type: 'boolean' },
      canRead: { type: 'boolean' },
      canUpdate: { type: 'boolean' },
      canDelete: { type: 'boolean' },
    },
    required: [
      'roleId',
      'permissionId',
      'canCreate',
      'canRead',
      'canUpdate',
      'canDelete',
    ],
  },
  response: {
    201: {
      description: 'Role permission created successfully',
      type: 'object',
      properties: {
        id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
        roleId: {
          type: 'string',
          example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
        },
        permissionId: {
          type: 'string',
          example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
        },
        canCreate: { type: 'boolean', example: true },
        canRead: { type: 'boolean', example: true },
        canUpdate: { type: 'boolean', example: true },
        canDelete: { type: 'boolean', example: true },
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
      description: 'Role permission already exists',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'This role permission already exists',
        },
        error: { type: 'string', example: 'Role Permission Already Exists' },
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
