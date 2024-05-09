import { auth } from '@/config/auth';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import { FastifyInstance } from 'fastify';

import {
  addressEntitiesSchemas,
  addressRequestsSchemas,
} from '@/application/controllers/address/addressSchemas';
import {
  permissionsEntitiesSchemas,
  permissionsRequestsSchemas,
} from '@/application/controllers/permissions/permissionsSchemas';
import {
  rolesPermissionsEntitiesSchemas,
  rolesPermissionsRequestsSchemas,
} from '@/application/controllers/roles-permissions/rolesPermissionsSchemas';
import {
  rolesEntitiesSchemas,
  rolesRequestsSchemas,
} from '@/application/controllers/roles/rolesSchemas';
import { sharedSchemas } from '@/application/controllers/sharedSchemas';
import {
  userDetailsEntitiesSchemas,
  userDetailsRequestsSchemas,
} from '@/application/controllers/user-details/userDetailSchemas';
import {
  userEntitiesSchemas,
  userRequestsSchemas,
} from '@/application/controllers/users/userSchemas';
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
      openapi: '3.1.0',
      info: {
        title: 'Salvando Pets API',
        description: [
          '## This is the API for Salvando Pets',
          '',
          'This API is responsible for managing the Salvando Pets system. It includes the management of:',
          '',
          '- authentication',
          '',
          '- users',
          '',
          '- addresses',
          '',
          '- roles',
          '',
          '- permissions',
          '',
          'The API is designed to be used by the Salvando Pets web application and mobile app.',
          '',
          ' - The API is RESTful and uses JSON as the data format.',
          '',
          ' - The API is secured using JWT tokens.',
          '',
          ' - The API is documented using Swagger.',
        ].join('\n'),
        contact: {
          name: 'Ricardo Granvilla Oliveira',
          email: 'devtrailsbr@gmail.com',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
        version: packageJson.version,
      },
      components: {
        schemas: {
          ...userEntitiesSchemas,
          ...userDetailsEntitiesSchemas,
          ...addressEntitiesSchemas,
          ...rolesEntitiesSchemas,
          ...permissionsEntitiesSchemas,
          ...rolesPermissionsEntitiesSchemas,
          ...userRequestsSchemas,
          ...userDetailsRequestsSchemas,
          ...addressRequestsSchemas,
          ...rolesRequestsSchemas,
          ...permissionsRequestsSchemas,
          ...rolesPermissionsRequestsSchemas,
          ...sharedSchemas,
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Local server',
        },
      ],
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
