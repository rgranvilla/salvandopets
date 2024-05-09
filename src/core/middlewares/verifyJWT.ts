import { FastifyReply, FastifyRequest } from 'fastify';

import { UnauthorizedError } from '../errors/custom-errors/unauthorizedError';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send(new UnauthorizedError());
  }
}
