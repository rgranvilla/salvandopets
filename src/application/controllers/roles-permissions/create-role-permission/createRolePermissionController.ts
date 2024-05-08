import { handleError } from '@/core/errors/handleError';
import { CreateRolePermissionUseCase } from '@/domain/rolesPermissions/use-cases/create-role-permission/createRolePermissionUseCase';
import { PrismaRolesPermissionsRepository } from '@/infra/repositories/rolesPermissions/prisma/prismaRolesPermissionsRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createRolePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createRolePermissionBodySchema = z.object({
    roleId: z.string(),
    permissionId: z.string(),
    canCreate: z.boolean(),
    canRead: z.boolean(),
    canUpdate: z.boolean(),
    canDelete: z.boolean(),
  });

  const { roleId, permissionId, canCreate, canRead, canUpdate, canDelete } =
    createRolePermissionBodySchema.parse(request.body);

  try {
    const rolesPermissionsRepository = new PrismaRolesPermissionsRepository();
    const createRolePermissionUseCase = new CreateRolePermissionUseCase(
      rolesPermissionsRepository,
    );

    const rolePermission = await createRolePermissionUseCase.execute({
      roleId,
      permissionId,
      canCreate,
      canRead,
      canUpdate,
      canDelete,
    });

    return reply.code(201).send({
      id: rolePermission.id,
      roleId: rolePermission.roleId,
      permissionId: rolePermission.permissionId,
      canCreate: rolePermission.canCreate,
      canRead: rolePermission.canRead,
      canUpdate: rolePermission.canUpdate,
      canDelete: rolePermission.canDelete,
      createdAt: rolePermission.createdAt,
      updatedAt: rolePermission.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
