import { handleError } from '@/core/errors/handleError';
import { ListRolesPermissionsUseCase } from '@/domain/rolesPermissions/use-cases/list-roles-permissions/listRolesPermissionsUseCase';
import { PrismaRolesPermissionsRepository } from '@/infra/repositories/rolesPermissions/prisma/prismaRolesPermissionsRepository';
import { FastifyReply, FastifyRequest } from 'fastify';

export const listRolesPermissionsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const rolesPermissionsRepository = new PrismaRolesPermissionsRepository();
    const listRolesPermissionsUseCase = new ListRolesPermissionsUseCase(
      rolesPermissionsRepository,
    );

    const result = await listRolesPermissionsUseCase.execute();

    reply.code(200).send({
      data: result.data.map((rolePermission) => ({
        id: rolePermission.id,
        roleId: rolePermission.roleId,
        permissionId: rolePermission.permissionId,
        canCreate: rolePermission.canCreate,
        canRead: rolePermission.canRead,
        canUpdate: rolePermission.canUpdate,
        canDelete: rolePermission.canDelete,
        createdAt: rolePermission.createdAt,
        updatedAt: rolePermission.updatedAt,
      })),
    });
  } catch (err) {
    handleError(err, request, reply);
  }
};
