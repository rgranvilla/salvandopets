import { handleError } from '@/core/errors/handleError';
import { ListPermissionsUseCase } from '@/domain/permissions/use-cases/list-permissions/listPermissionsUseCase';
import { PrismaPermissionsRepository } from '@/infra/repositories/permissions/prisma/prismaPermissionsRepository';
import { FastifyReply, FastifyRequest } from 'fastify';

export const listPermissionsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const permissionsRepository = new PrismaPermissionsRepository();
    const listPermissionsUseCase = new ListPermissionsUseCase(
      permissionsRepository,
    );

    const result = await listPermissionsUseCase.execute();

    reply.code(200).send({
      data: result.data.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        createdAt: permission.createdAt,
        updatedAt: permission.updatedAt,
      })),
    });
  } catch (err) {
    handleError(err, request, reply);
  }
};
