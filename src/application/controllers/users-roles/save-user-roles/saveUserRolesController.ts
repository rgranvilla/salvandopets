import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { SaveUserRolesUseCase } from '@/domain/users-roles/use-cases/save-user-roles/saveUserRolesUseCase';
import { PrismaUserRolesRepository } from '@/infra/repositories/users-roles/prisma/prismaUserRolesRepository';

export async function saveUserRolesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const saveUserDetailPathSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = saveUserDetailPathSchema.parse(request.params);

  const saveUserAddressQuerySchema = z.object({
    roleId: z.string().uuid(),
  });

  const { roleId } = saveUserAddressQuerySchema.parse(request.query);

  try {
    const userRolesRepository = new PrismaUserRolesRepository();
    const saveUserRolesUseCase = new SaveUserRolesUseCase(userRolesRepository);

    const userRole = await saveUserRolesUseCase.execute({
      userId,
      roleId,
    });

    return reply.code(201).send({
      id: userRole.id,
      userId: userRole.userId,
      roleId: userRole.roleId,
      createdAt: userRole.createdAt,
      updatedAt: userRole.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
