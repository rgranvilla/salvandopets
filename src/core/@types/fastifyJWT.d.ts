import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    sign(payload: { sub: string; expiresIn: string }): Promise<string>;
  }
}
