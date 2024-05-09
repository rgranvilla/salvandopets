import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { CreatePermissionUseCase } from '@/domain/permissions/use-cases/create-permission/createPermissionUseCase';
import { PrismaPermissionsRepository } from '@/infra/repositories/permissions/prisma/prismaPermissionsRepository';

export async function createPermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPermissionBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().nullable(),
  });

  const { name, description } = createPermissionBodySchema.parse(request.body);

  try {
    const permissionsRepository = new PrismaPermissionsRepository();
    const createPermissionUseCase = new CreatePermissionUseCase(
      permissionsRepository,
    );

    const permission = await createPermissionUseCase.execute({
      name,
      description,
    });

    return reply.code(201).send({
      id: permission.id,
      name: permission.name,
      description: permission.description,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
