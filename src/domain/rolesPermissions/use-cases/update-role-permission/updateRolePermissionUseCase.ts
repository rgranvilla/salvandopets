import { RolePermissionNotFoundError } from '@/core/errors/custom-errors/rolePermissionNotFoundError';
import { IRolesPermissionsRepository } from '@/infra/repositories/rolesPermissions/IRolesPermissionsRepository';
import { RolePermission } from '../../entities/rolePermission';

interface IUpdateRolePermissionUseCaseRequest {
  rolePermissionId: string;
  roleId: string;
  permissionId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

type IUpdateRolePermissionUseCaseResponse = RolePermission;

export class UpdateRolePermissionUseCase {
  private rolesPermissionsRepository: IRolesPermissionsRepository;

  constructor(rolesPermissionsRepository: IRolesPermissionsRepository) {
    this.rolesPermissionsRepository = rolesPermissionsRepository;
  }

  async execute(
    data: IUpdateRolePermissionUseCaseRequest,
  ): Promise<IUpdateRolePermissionUseCaseResponse> {
    const existentRolePermission =
      await this.rolesPermissionsRepository.findById(data.rolePermissionId);

    if (!existentRolePermission) {
      throw new RolePermissionNotFoundError();
    }

    const updatedRolePermission = new RolePermission(
      {
        roleId: existentRolePermission.roleId,
        permissionId: existentRolePermission.permissionId,
        canCreate: data.canCreate,
        canRead: data.canRead,
        canUpdate: data.canUpdate,
        canDelete: data.canDelete,
        createdAt: existentRolePermission.createdAt,
      },
      existentRolePermission.id,
    );

    const rolePermission = await this.rolesPermissionsRepository.update(
      updatedRolePermission,
    );

    return rolePermission;
  }
}
