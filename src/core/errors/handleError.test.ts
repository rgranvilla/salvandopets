import { EmailAlreadyInUseError } from '@/core/errors/custom-errors/emailAlreadyInUseError';
import { UserNotFoundError } from '@/core/errors/custom-errors/userNotFoundError';
import { UsernameAlreadyInUseError } from '@/core/errors/custom-errors/usernameAlreadyInUseError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';
import { handleError } from './handleError';

describe('handleError', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;

  beforeEach(() => {
    request = {} as FastifyRequest;
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;
  });

  it('should handle ZodError', () => {
    const error = new ZodError([]);
    handleError(error, request, reply);
    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({
      hasError: true,
      error: 'Bad Request',
      message: 'Validation error',
      issues: [],
    });
  });

  it('should handle UserNotFoundError', () => {
    const error = new UserNotFoundError();
    handleError(error, request, reply);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({
      hasError: true,
      error: 'User Not Found',
      message: 'User not found',
    });
  });

  it('should handle EmailAlreadyInUseError', () => {
    const error = new EmailAlreadyInUseError();
    handleError(error, request, reply);
    expect(reply.status).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({
      hasError: true,
      error: 'Email Not Available',
      message: 'This email already in use',
    });
  });

  it('should handle UsernameAlreadyInUseError', () => {
    const error = new UsernameAlreadyInUseError();
    handleError(error, request, reply);
    expect(reply.status).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({
      hasError: true,
      error: 'Username Not Available',
      message: 'This username already in use',
    });
  });

  it('should handle other errors', () => {
    const error = new Error('Internal Server Error');
    handleError(error, request, reply);
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      hasError: true,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    });
  });
});
