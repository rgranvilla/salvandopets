import { RolePermissionAlreadyExistError } from '@/core/errors/custom-errors/rolePermissionAlreadyExistError';

import { IRolesPermissionsRepository } from '@/infra/repositories/rolesPermissions/IRolesPermissionsRepository';

import { RolePermission } from '../../entities/rolePermission';

interface ICreateRolePermissionUseCaseRequest {
  roleId: string;
  permissionId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

type ICreateRolePermissionUseCaseResponse = RolePermission;

export class CreateRolePermissionUseCase {
  private rolesPermissionsRepository: IRolesPermissionsRepository;

  constructor(rolesPermissionsRepository: IRolesPermissionsRepository) {
    this.rolesPermissionsRepository = rolesPermissionsRepository;
  }

  async execute(
    data: ICreateRolePermissionUseCaseRequest,
  ): Promise<ICreateRolePermissionUseCaseResponse> {
    const existentRolePermission =
      await this.rolesPermissionsRepository.findByRoleIdAndPermissionId(
        data.roleId,
        data.permissionId,
      );

    if (existentRolePermission) {
      throw new RolePermissionAlreadyExistError();
    }

    const createdRolePermission = new RolePermission(data);

    const rolePermission = await this.rolesPermissionsRepository.create(
      createdRolePermission,
    );

    return rolePermission;
  }
}
