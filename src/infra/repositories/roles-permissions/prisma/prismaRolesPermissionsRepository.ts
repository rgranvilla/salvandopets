import { PermissionNotFoundError } from '@/core/errors/custom-errors/permissionNotFoundError';
import { RoleNotFoundError } from '@/core/errors/custom-errors/roleNotFoundError';
import { RolePermissionNotFoundError } from '@/core/errors/custom-errors/rolePermissionNotFoundError';
import { prisma } from '@/database/lib/prisma';

import { RolePermission } from '@/domain/roles-permissions/entities/rolePermission';
import { RolePermissionMapper } from '@/infra/mappers/roles-permissions/rolePermissionMapper';

import { IRolesPermissionsRepository } from '../IRolesPermissionsRepository';

export class PrismaRolesPermissionsRepository
  implements IRolesPermissionsRepository
{
  async findById(id: string): Promise<RolePermission | null> {
    const foundedRolePermission = await prisma.rolesPermission.findUnique({
      where: {
        id,
      },
    });

    if (!foundedRolePermission) return null;

    return RolePermissionMapper.toDomain(foundedRolePermission);
  }

  async findByRoleIdAndPermissionId(
    roleId: string,
    permissionId: string,
  ): Promise<RolePermission | null> {
    const foundedRolePermission = await prisma.rolesPermission.findFirst({
      where: {
        role_id: roleId,
        permission_id: permissionId,
      },
    });

    if (!foundedRolePermission) return null;

    return RolePermissionMapper.toDomain(foundedRolePermission);
  }

  async create(rolePermission: RolePermission): Promise<RolePermission> {
    const checkIfRoleExists = await prisma.role.findUnique({
      where: {
        id: rolePermission.roleId,
      },
    });

    if (!checkIfRoleExists) {
      throw new RoleNotFoundError();
    }

    const checkIfPermissionExists = await prisma.permission.findUnique({
      where: {
        id: rolePermission.permissionId,
      },
    });

    if (!checkIfPermissionExists) {
      throw new PermissionNotFoundError();
    }

    const raw = RolePermissionMapper.toDatabase(rolePermission);

    const createdRolePermission = await prisma.rolesPermission.create({
      data: raw,
    });

    return RolePermissionMapper.toDomain(createdRolePermission);
  }

  async update(rolePermission: RolePermission): Promise<RolePermission> {
    const checkIfRolePermissionExists = await this.findByRoleIdAndPermissionId(
      rolePermission.roleId,
      rolePermission.permissionId,
    );

    if (!checkIfRolePermissionExists) {
      throw new RolePermissionNotFoundError();
    }

    const rolePermissionData = RolePermissionMapper.toDatabase(rolePermission);

    const updatedRolePermission = await prisma.rolesPermission.update({
      where: {
        id: rolePermissionData.id,
      },
      data: rolePermissionData,
    });

    return RolePermissionMapper.toDomain(updatedRolePermission);
  }

  async list(): Promise<RolePermission[]> {
    const rolesPermission = await prisma.rolesPermission.findMany();

    if (!rolesPermission) return new Array<RolePermission>();

    return rolesPermission.map((role) => RolePermissionMapper.toDomain(role));
  }

  async delete(rolePermissionId: string): Promise<void> {
    const checkIfRolePermissionExists = await this.findById(rolePermissionId);

    if (!checkIfRolePermissionExists) {
      throw new RolePermissionNotFoundError();
    }

    await prisma.rolesPermission.delete({
      where: {
        id: rolePermissionId,
      },
    });
  }
}
