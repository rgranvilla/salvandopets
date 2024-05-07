export const SavePersonalDetailSchema = {
  summary: 'Save a personal detail',
  description: 'Save a personal detail for an user',
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      birthDate: { type: 'string' },
      gender: { type: 'string' },
      avatar: { type: 'string' },
      bio: { type: 'string' },
    },
    required: ['userId'],
  },
  response: {
    201: {
      description: 'Personal detail created successfully',
      type: 'object',
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        birthDate: { type: 'string' },
        gender: { type: 'string' },
        avatar: { type: 'string' },
        bio: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
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
              path: { type: 'string', example: 'firstName' },
              message: { type: 'string', example: 'Invalid password' },
            },
          },
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
