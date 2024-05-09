import { saveUserDetailsController } from '@/application/controllers/user-details/save-user-detail/saveUserDetailsController';
import { SaveUserDetailsSchema } from '@/application/controllers/user-details/save-user-detail/saveUserDetailsSchema';
import { verifyJWT } from '@/core/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

export async function userDetailsRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/:userId/save-detail',
    onRequest: [verifyJWT],
    handler: saveUserDetailsController,
    schema: SaveUserDetailsSchema,
  });
}
