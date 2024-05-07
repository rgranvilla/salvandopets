import { handleError } from '@/core/errors/handleError';
import { UpdateRoleUseCase } from '@/domain/roles/use-cases/update-role/updateRoleUseCase';
import { RoleMapper } from '@/infra/mappers/roles/roleMapper';
import { PrismaRolesRepository } from '@/infra/repositories/roles/prisma/prismaRolesRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateRoleBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().nullable(),
  });

  const updateRoleParamsSchema = z.object({
    roleId: z.string().uuid(),
  });

  const { roleId } = updateRoleParamsSchema.parse(request.params);
  const { name, description } = updateRoleBodySchema.parse(request.body);

  try {
    const rolesRepository = new PrismaRolesRepository();
    const updateRoleUseCase = new UpdateRoleUseCase(rolesRepository);

    const role = await updateRoleUseCase.execute({
      id: roleId,
      name,
      description,
    });

    const result = RoleMapper.toDatabase(role);

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
