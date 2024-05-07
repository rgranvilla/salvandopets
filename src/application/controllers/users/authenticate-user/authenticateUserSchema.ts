export const authenticateUserSchema = {
  summary: 'Authenticate user',
  description: 'Authenticate user',
  tags: ['Auth'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
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
