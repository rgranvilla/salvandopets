import { env } from '@/config/env';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { EmailAlreadyInUseError } from './custom-errors/emailAlreadyInUseError';
import { UnauthorizedError } from './custom-errors/unauthorizedError';
import { UserNotFoundError } from './custom-errors/userNotFoundError';
import { UsernameAlreadyInUseError } from './custom-errors/usernameAlreadyInUseError';

export function handleError(
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (env.NODE_ENV === 'dev') {
    console.error(error);
  }

  if (error instanceof ZodError) {
    const err = {
      hasError: true,
      error: 'Bad Request',
      message: 'Validation error',
      issues: error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    };

    return reply.status(400).send(err);
  }

  if (error instanceof UnauthorizedError) {
    const err = {
      hasError: true,
      error: error.error,
      message: error.message,
    };
    return reply.status(401).send(err);
  }

  if (error instanceof UserNotFoundError) {
    const err = {
      hasError: true,
      error: error.error,
      message: error.message,
    };
    return reply.status(404).send(err);
  }

  if (
    error instanceof EmailAlreadyInUseError ||
    error instanceof UsernameAlreadyInUseError
  ) {
    const err = {
      hasError: true,
      error: error.error,
      message: error.message,
    };
    return reply.status(409).send(err);
  }

  const err = {
    hasError: true,
    error: 'Internal Server Error',
    message: 'An internal server error occurred',
  };

  return reply.status(500).send(err);
}
