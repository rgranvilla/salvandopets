import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/core/middlewares/verifyJWT';

import { saveUserDetailsController } from '@/application/controllers/users-details/save-user-detail/saveUserDetailsController';
import { SaveUserDetailsSchema } from '@/application/controllers/users-details/save-user-detail/saveUserDetailsSchema';

export async function userDetailsRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/:userId/save-detail',
    onRequest: [verifyJWT],
    handler: saveUserDetailsController,
    schema: SaveUserDetailsSchema,
  });
}
