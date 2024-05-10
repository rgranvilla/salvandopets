import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { SaveUserAddressesUseCase } from '@/domain/users-address/use-cases/save-user-address/saveUserAddressUseCase';
import { PrismaUserAddressesRepository } from '@/infra/repositories/users-address/prisma/prismaUserAddressesRepository';

export async function saveUserAddressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const saveUserDetailPathSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = saveUserDetailPathSchema.parse(request.params);

  const saveUserAddressQuerySchema = z.object({
    addressId: z.string().uuid(),
  });

  const { addressId } = saveUserAddressQuerySchema.parse(request.query);

  try {
    const userAddressesRepository = new PrismaUserAddressesRepository();
    const saveUserAddressUseCase = new SaveUserAddressesUseCase(
      userAddressesRepository,
    );

    const userAddress = await saveUserAddressUseCase.execute({
      userId,
      addressId,
    });

    return reply.code(201).send({
      id: userAddress.id,
      userId: userAddress.userId,
      addressId: userAddress.addressId,
      createdAt: userAddress.createdAt,
      updatedAt: userAddress.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
