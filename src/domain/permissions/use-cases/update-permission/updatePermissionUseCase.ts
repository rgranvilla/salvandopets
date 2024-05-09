import { PermissionNotFoundError } from '@/core/errors/custom-errors/permissionNotFoundError';

import { IPermissionsRepository } from '@/infra/repositories/permissions/IPermissionsRepository';

import { Permission } from '../../entities/permissions';

interface IUpdatePermissionUseCaseRequest {
  id: string;
  description: string | null;
}

type IUpdatePermissionUseCaseResponse = Permission;

export class UpdatePermissionUseCase {
  private permissionsRepository: IPermissionsRepository;

  constructor(permissionsRepository: IPermissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  async execute(
    data: IUpdatePermissionUseCaseRequest,
  ): Promise<IUpdatePermissionUseCaseResponse> {
    const existingPermission = await this.permissionsRepository.findById(
      data.id,
    );

    if (!existingPermission) {
      throw new PermissionNotFoundError();
    }

    const updatedPermission = new Permission(
      {
        name: existingPermission.name,
        description: data.description,
        createdAt: existingPermission.createdAt,
      },
      existingPermission.id,
    );

    const permission =
      await this.permissionsRepository.update(updatedPermission);

    return permission;
  }
}
