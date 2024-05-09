import { handleError } from '@/core/errors/handleError';
import { CreateAddressUseCase } from '@/domain/address/use-cases/create-address/createAddressUseCase';
import { PrismaAddressesRepository } from '@/infra/repositories/address/prisma/prismaAddressRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createAddressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAddressBodySchema = z.object({
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
  } = createAddressBodySchema.parse(request.body);

  try {
    const addressesRepository = new PrismaAddressesRepository();
    const createAddressUseCase = new CreateAddressUseCase(addressesRepository);

    const address = await createAddressUseCase.execute({
      isMain,
      isBilling,
      isShipping,
      type,
      description: description ?? null,
      street,
      number,
      complement: complement ?? null,
      neighborhood,
      city,
      state,
      country,
      postalCode,
    });

    return reply.code(201).send({
      id: address.id,
      isMain: address.isMain,
      isBilling: address.isBilling,
      isShipping: address.isShipping,
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
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
