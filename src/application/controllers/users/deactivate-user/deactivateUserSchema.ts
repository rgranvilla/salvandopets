export const deactivateUserSchema = {
  summary: 'Deactivate user',
  description: 'Deactivate a user',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      deactivationReason: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        isActive: { type: 'boolean' },
        deactivationDate: { type: 'string' },
        deactivationReason: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'User Not Found' },
      },
    },
    500: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
