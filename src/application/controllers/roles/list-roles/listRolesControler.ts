import { FastifyReply, FastifyRequest } from 'fastify';

import { handleError } from '@/core/errors/handleError';

import { ListRolesUseCase } from '@/domain/roles/use-cases/list-roles/listRolesUseCase';
import { PrismaRolesRepository } from '@/infra/repositories/roles/prisma/prismaRolesRepository';

export const listRolesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const rolesRepository = new PrismaRolesRepository();
    const listUsersUseCase = new ListRolesUseCase(rolesRepository);

    const result = await listUsersUseCase.execute();

    reply.code(200).send({
      data: result.data.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      })),
    });
  } catch (err) {
    handleError(err, request, reply);
  }
};
