export const ListRolesPermissionsSchema = {
  summary: 'List all roles',
  description: 'List all roles',
  tags: ['Roles & Permissions'],
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          roles: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              roleId: { type: 'string' },
              permissionId: { type: 'string' },
              canCreate: { type: 'boolean' },
              canRead: { type: 'boolean' },
              canUpdate: { type: 'boolean' },
              canDelete: { type: 'boolean' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
          example: [
            {
              id: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              roleId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              permissionId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: '4d7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c2d',
              roleId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              permissionId: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d',
              canCreate: true,
              canRead: true,
              canUpdate: true,
              canDelete: true,
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
          ],
        },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Unauthorized' },
        error: {
          type: 'string',
          example:
            'You are not authorized to access this resource. Please login.',
        },
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
