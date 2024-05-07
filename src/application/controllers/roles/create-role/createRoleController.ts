import { handleError } from '@/core/errors/handleError';
import { CreateRoleUseCase } from '@/domain/roles/use-cases/create-roles/createRoleUseCase';
import { PrismaRolesRepository } from '@/infra/repositories/roles/prisma/prismaRolesRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createRoleBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
  });

  const { name, description } = createRoleBodySchema.parse(request.body);

  try {
    const rolesRepository = new PrismaRolesRepository();
    const createRoleUseCase = new CreateRoleUseCase(rolesRepository);

    const role = await createRoleUseCase.execute({
      name,
      description: description ?? null,
    });

    return reply.code(201).send({
      id: role.id,
      name: role.name,
      description: role.description,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
