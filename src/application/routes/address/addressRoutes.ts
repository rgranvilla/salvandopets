import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/core/middlewares/verifyJWT';

import { createAddressController } from '@/application/controllers/address/create-address/createAddressController';
import { CreateAddressSchema } from '@/application/controllers/address/create-address/createAddressSchema';
import { deleteAddressController } from '@/application/controllers/address/delete-address/deleteAddressController';
import { DeleteAddressSchema } from '@/application/controllers/address/delete-address/deleteAddressSchema';
import { listAddressController } from '@/application/controllers/address/list-addresses/listAddressesControler';
import { ListAddressSchema } from '@/application/controllers/address/list-addresses/listAddressesSchema';
import { updateAddressController } from '@/application/controllers/address/update-address/updateAddressController';
import { UpdateAddressSchema } from '@/application/controllers/address/update-address/updateAddressSchema';

export async function addressRoutes(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/create',
    onRequest: [verifyJWT],
    handler: createAddressController,
    schema: CreateAddressSchema,
  });

  app.route({
    method: 'PUT',
    url: '/:addressId/update',
    onRequest: [verifyJWT],
    handler: updateAddressController,
    schema: UpdateAddressSchema,
  });

  app.route({
    method: 'GET',
    url: '/list',
    onRequest: [verifyJWT],
    handler: listAddressController,
    schema: ListAddressSchema,
  });

  app.route({
    method: 'DELETE',
    url: '/delete',
    onRequest: [verifyJWT],
    handler: deleteAddressController,
    schema: DeleteAddressSchema,
  });
}
