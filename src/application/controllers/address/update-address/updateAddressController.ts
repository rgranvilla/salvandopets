import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { UpdateAddressUseCase } from '@/domain/address/use-cases/update-address/updateAddressUseCase';
import { AddressMapper } from '@/infra/mappers/address/addressMapper';
import { PrismaAddressesRepository } from '@/infra/repositories/address/prisma/prismaAddressRepository';

export async function updateAddressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateAddressBodySchema = z.object({
    isMain: z.boolean(),
    isBilling: z.boolean(),
    isShipping: z.boolean(),
    type: z.enum(['Home', 'Work', 'Other']).default('Home'),
    description: z.string().nullable(),
    street: z.string(),
    number: z.string(),
    complement: z.string().nullable(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
  });

  const updateAddressParamsSchema = z.object({
    addressId: z.string().uuid(),
  });

  const { addressId } = updateAddressParamsSchema.parse(request.params);
  const {
    isMain,
    isBilling,
    isShipping,
    type,
    description,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    country,
    postalCode,
  } = updateAddressBodySchema.parse(request.body);

  try {
    const addressesRepository = new PrismaAddressesRepository();
    const updateAddressUseCase = new UpdateAddressUseCase(addressesRepository);

    const address = await updateAddressUseCase.execute({
      id: addressId,
      isMain,
      isBilling,
      isShipping,
      type,
      description,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      postalCode,
    });

    const result = AddressMapper.toDatabase(address);

    return reply.code(201).send({
      id: result.id,
      isMain: result.is_main,
      isBilling: result.is_billing,
      isShipping: result.is_shipping,
      type: result.type,
      description: result.description,
      street: result.street,
      number: result.number,
      complement: result.complement,
      neighborhood: result.neighborhood,
      city: result.city,
      state: result.state,
      country: result.country,
      postalCode: result.postal_code,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  } catch (err) {
    console.error(err);
    handleError(err, request, reply);
  }
}
