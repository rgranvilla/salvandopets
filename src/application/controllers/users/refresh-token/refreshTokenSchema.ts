export const refreshTokenSchema = {
  summary: 'Refresh token',
  description: 'Refresh token',
  tags: ['Auth'],
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' },
      userId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        hasError: { type: 'boolean' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        hasError: { type: 'boolean' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
