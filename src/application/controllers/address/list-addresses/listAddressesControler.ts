import { FastifyReply, FastifyRequest } from 'fastify';

import { handleError } from '@/core/errors/handleError';

import { ListAddressUseCase } from '@/domain/address/use-cases/list-address/listAddressUseCase';
import { PrismaAddressesRepository } from '@/infra/repositories/address/prisma/prismaAddressRepository';

export const listAddressController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const addressesRepository = new PrismaAddressesRepository();
    const listAddressUseCase = new ListAddressUseCase(addressesRepository);

    const addresses = await listAddressUseCase.execute();

    reply.code(200).send({
      addresses: addresses.data.map((address) => ({
        id: address.id,
        isMain: address.isMain,
        isBilling: address.isBilling,
        isShipping: address.isShipping,
        type: address.type,
        description: address.description,
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      })),
    });
  } catch (err) {
    handleError(err, request, reply);
  }
};
