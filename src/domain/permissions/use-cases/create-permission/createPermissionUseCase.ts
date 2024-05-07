import { PermissionAlreadyInUseError } from '@/core/errors/custom-errors/permissionAlreadyInUseError';
import { IPermissionsRepository } from '@/infra/repositories/permissions/IPermissionsRepository';
import { Permission } from '../../entities/permissions';

interface ICreatePermissionUseCaseRequest {
  name: string;
  description: string | null;
}

type ICreatePermissionUseCaseResponse = Permission;

export class CreatePermissionUseCase {
  private permissionsRepository: IPermissionsRepository;

  constructor(permissionsRepository: IPermissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  async execute(
    data: ICreatePermissionUseCaseRequest,
  ): Promise<ICreatePermissionUseCaseResponse> {
    const permissionWithSameName = await this.permissionsRepository.findByName(
      data.name,
    );

    if (permissionWithSameName) {
      throw new PermissionAlreadyInUseError();
    }

    const createdPermission = new Permission(data);

    const permission =
      await this.permissionsRepository.create(createdPermission);

    return permission;
  }
}
