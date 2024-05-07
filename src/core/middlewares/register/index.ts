import { auth } from '@/config/auth';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import { FastifyInstance } from 'fastify';

import { appRoutes } from '@/application/routes';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastifySwaggerUi from '@fastify/swagger-ui';
import packageJson from '../../../../package.json';

const { secretToken, expiresInToken } = auth;

export function registerMiddlewares(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
    allowedHeaders: '*',
  });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API DevTrails Users',
        description: 'API for DevTrails users',
        version: packageJson.version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/api-docs',
    uiConfig: {
      deepLinking: true,
    },
  });

  app.register(fastifyJwt, {
    secret: secretToken,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
    sign: {
      algorithm: 'HS512',
      expiresIn: expiresInToken,
    },
    decode: {
      complete: false,
    },
  });

  app.register(fastifyCookie);
  app.register(appRoutes);
}
