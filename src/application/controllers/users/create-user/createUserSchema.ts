export const CreateUserSchema = {
  summary: 'Create a new user',
  description: 'Create a new user',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      isActive: { type: 'boolean' },
    },
    required: ['email', 'password'],
  },
  response: {
    201: {
      description: 'User created successfully',
      type: 'object',
      properties: {
        id: { type: 'string', example: '5f7e8d6e-5c6d-4a9b-9a8b-6b0e9e4b1c3d' },
        username: { type: 'string', example: 'johndoe' },
        email: { type: 'string', example: 'johndoe@mail.com' },
        isActive: { type: 'boolean', example: true },
        deactivationDate: { type: 'string', example: null },
        deactivationReason: { type: 'string', example: null },
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
              path: { type: 'string', example: 'email' },
              message: { type: 'string', example: 'Invalid email' },
            },
          },
        },
      },
    },
    409: {
      description: 'Email or Username already in use',
      type: 'object',
      properties: {
        hasError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'This email already in use' },
        error: { type: 'string', example: 'Email Not Available' },
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
