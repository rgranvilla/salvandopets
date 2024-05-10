import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/core/middlewares/verifyJWT';

import { saveUserAddressController } from '@/application/controllers/users-address/save-user-address/saveUserAddressController';
import { SaveUserAddressSchema } from '@/application/controllers/users-address/save-user-address/saveUserAddressSchema';

export async function userAddressRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/:userId/save-address',
    onRequest: [verifyJWT],
    handler: saveUserAddressController,
    schema: SaveUserAddressSchema,
  });
}
