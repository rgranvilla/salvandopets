import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { handleError } from '@/core/errors/handleError';

import { UpdateRolePermissionUseCase } from '@/domain/rolesPermissions/use-cases/update-role-permission/updateRolePermissionUseCase';
import { RolePermissionMapper } from '@/infra/mappers/rolesPermissions/rolePermissionMapper';
import { PrismaRolesPermissionsRepository } from '@/infra/repositories/rolesPermissions/prisma/prismaRolesPermissionsRepository';

export async function updateRolePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateRolePermissionBodySchema = z.object({
    roleId: z.string(),
    permissionId: z.string(),
    canCreate: z.boolean(),
    canRead: z.boolean(),
    canUpdate: z.boolean(),
    canDelete: z.boolean(),
  });

  const updateRolePermissionParamsSchema = z.object({
    rolePermissionId: z.string().uuid(),
  });

  const { rolePermissionId } = updateRolePermissionParamsSchema.parse(
    request.params,
  );
  const { roleId, permissionId, canCreate, canRead, canUpdate, canDelete } =
    updateRolePermissionBodySchema.parse(request.body);

  try {
    const rolesPermissionsRepository = new PrismaRolesPermissionsRepository();
    const updateRoleUseCase = new UpdateRolePermissionUseCase(
      rolesPermissionsRepository,
    );

    const rolePermission = await updateRoleUseCase.execute({
      rolePermissionId,
      roleId,
      permissionId,
      canCreate,
      canRead,
      canUpdate,
      canDelete,
    });

    const result = RolePermissionMapper.toDatabase(rolePermission);

    return reply.code(201).send({
      id: result.id,
      roleId: result.role_id,
      permissionId: result.permission_id,
      canCreate: result.can_create,
      canRead: result.can_read,
      canUpdate: result.can_update,
      canDelete: result.can_delete,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    });
  } catch (err) {
    console.error(err);
    handleError(err, request, reply);
  }
}
