/* eslint-disable camelcase */
import { Permission } from '@/domain/permissions/entities/permissions';
import { Permission as PermissionDB } from '@prisma/client';

export class PermissionMapper {
  static toDatabase(permission: Permission): PermissionDB {
    return {
      id: permission.id,
      name: permission.name,
      description: permission.description,
      created_at: permission.createdAt,
      updated_at: permission.updatedAt,
    };
  }

  static toDomain(raw: PermissionDB): Permission {
    const permission = new Permission(
      {
        name: raw.name,
        description: raw.description,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    return permission;
  }
}
