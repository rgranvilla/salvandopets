import { handleError } from '@/core/errors/handleError';
import { DeleteAddressUseCase } from '@/domain/address/use-cases/delete-address/deleteAddressUseCase';
import { PrismaAddressesRepository } from '@/infra/repositories/address/prisma/prismaAddressRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteAddressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAddressQuerySchema = z.object({
    addressId: z.string().uuid(),
  });

  const { addressId } = deleteAddressQuerySchema.parse(request.query);

  try {
    const addressesRepository = new PrismaAddressesRepository();
    const deleteAddressUseCase = new DeleteAddressUseCase(addressesRepository);

    const result = await deleteAddressUseCase.execute({
      id: addressId,
    });

    return reply.code(201).send({
      message: result.message,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
