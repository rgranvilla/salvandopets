export const listUsersSchema = {
  summary: 'List all users',
  description: 'List all users',
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      perPage: { type: 'number' },
      sortBy: {
        type: 'string',
        enum: ['username', 'email', 'createdAt'],
      },
      sortOrder: {
        type: 'string',
        enum: ['asc', 'desc'],
      },
      searchField: {
        type: 'string',
        enum: ['username', 'email'],
      },
      searchQuery: { type: 'string' },
      dateRangeField: { type: 'string' },
      dateRangeStart: { type: 'string' },
      dateRangeEnd: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        currentPage: { type: 'number', example: 1 },
        perPage: { type: 'number', example: 2 },
        count: { type: 'number', example: 100 },
        data: {
          type: 'array',
          users: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              username: { type: 'string' },
              email: { type: 'string' },
              password: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
          example: [
            {
              id: 'e7d1b3c4-6f5a-4b0d-bf2c-8e9b6e2a1c7a',
              username: 'john_doe',
              email: 'john_doe@mail.com',
              password: 'hashed_password',
              createdAt: '2021-08-01T00:00:00.000Z',
              updatedAt: '2021-08-01T00:00:00.000Z',
            },
            {
              id: 'a1b2c3d4-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
              username: 'jane_doe',
              email: 'jane_doe@mail.com',
              password: 'hashed_password',
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
