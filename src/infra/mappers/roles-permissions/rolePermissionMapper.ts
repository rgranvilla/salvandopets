/* eslint-disable camelcase */
import { RolesPermission as RolesPermissionDB } from '@prisma/client';

import { RolePermission } from '@/domain/rolesPermissions/entities/rolePermission';

export class RolePermissionMapper {
  static toDatabase(role: RolePermission): RolesPermissionDB {
    return {
      id: role.id,
      role_id: role.roleId,
      permission_id: role.permissionId,
      can_create: role.canCreate,
      can_read: role.canRead,
      can_update: role.canUpdate,
      can_delete: role.canDelete,
      created_at: role.createdAt,
      updated_at: role.updatedAt,
    };
  }

  static toDomain(raw: RolesPermissionDB): RolePermission {
    const role = new RolePermission(
      {
        roleId: raw.role_id,
        permissionId: raw.permission_id,
        canCreate: raw.can_create,
        canRead: raw.can_read,
        canUpdate: raw.can_update,
        canDelete: raw.can_delete,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    return role;
  }
}
