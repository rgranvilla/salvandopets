import { RolePermission } from '@/domain/rolesPermissions/entities/rolePermission';

export abstract class IRolesPermissionsRepository {
  abstract create(rolePermission: RolePermission): Promise<RolePermission>;
  abstract update(rolePermission: RolePermission): Promise<RolePermission>;
  abstract list(): Promise<RolePermission[]>;
  abstract delete(rolePermissionId: string): Promise<void>;

  abstract findById(rolePermissionId: string): Promise<RolePermission | null>;
  abstract findByRoleIdAndPermissionId(
    roleId: string,
    permissionId: string,
  ): Promise<RolePermission | null>;
}
