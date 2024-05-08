export const listRolesSchema = {
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
              name: { type: 'string' },
              description: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
          example: [
            {
              id: 'e7d1b3c4-6f5a-4b0d-bf2c-8e9b6e2a1c7a',
              name: 'Admin',
              description: 'Can manager all system',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: 'a1b2c3d4-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
              name: 'Manager',
              description: 'Can manager some system',
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
