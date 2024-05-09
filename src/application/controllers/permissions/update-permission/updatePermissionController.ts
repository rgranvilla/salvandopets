import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { UpdatePermissionUseCase } from '@/domain/permissions/use-cases/update-permission/updatePermissionUseCase';
import { PermissionMapper } from '@/infra/mappers/permissions/permissionMapper';
import { PrismaPermissionsRepository } from '@/infra/repositories/permissions/prisma/prismaPermissionsRepository';

export async function updatePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePermissionBodySchema = z.object({
    description: z.string().nullable(),
  });

  const updatePermissionParamsSchema = z.object({
    permissionId: z.string().uuid(),
  });

  const { permissionId } = updatePermissionParamsSchema.parse(request.params);
  const { description } = updatePermissionBodySchema.parse(request.body);

  try {
    const permissionsRepository = new PrismaPermissionsRepository();
    const updatePermissionUseCase = new UpdatePermissionUseCase(
      permissionsRepository,
    );

    const permission = await updatePermissionUseCase.execute({
      id: permissionId,
      description,
    });

    const result = PermissionMapper.toDatabase(permission);

    return reply.code(201).send({
      id: result.id,
      name: result.name,
      description: result.description,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  } catch (err) {
    console.error(err);
    handleError(err, request, reply);
  }
}
