import { prisma } from '@/database/lib/prisma';
import { Permission } from '@/domain/permissions/entities/permissions';
import { PermissionMapper } from '@/infra/mappers/permissions/permissionMapper';
import { IPermissionsRepository } from '../IPermissionsRepository';

export class PrismaPermissionsRepository implements IPermissionsRepository {
  async create(permission: Permission): Promise<Permission> {
    const raw = PermissionMapper.toDatabase(permission);

    const createdPermission = await prisma.permission.create({
      data: raw,
    });

    return PermissionMapper.toDomain(createdPermission);
  }

  async update(permission: Permission): Promise<Permission> {
    const permissionData = PermissionMapper.toDatabase(permission);

    const updatedPermission = await prisma.permission.update({
      where: {
        id: permissionData.id,
      },
      data: permissionData,
    });

    return PermissionMapper.toDomain(updatedPermission);
  }

  async findByName(name: string): Promise<Permission | null> {
    const foundedPermission = await prisma.permission.findUnique({
      where: {
        name,
      },
    });

    if (!foundedPermission) return null;

    return PermissionMapper.toDomain(foundedPermission);
  }

  async findById(id: string): Promise<Permission | null> {
    const foundedPermission = await prisma.permission.findUnique({
      where: {
        id,
      },
    });

    if (!foundedPermission) return null;

    return PermissionMapper.toDomain(foundedPermission);
  }

  async list(): Promise<Permission[]> {
    const permissions = await prisma.permission.findMany();

    if (!permissions) return new Array<Permission>();

    return permissions.map((permission) =>
      PermissionMapper.toDomain(permission),
    );
  }
}
