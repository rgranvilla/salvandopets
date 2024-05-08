import { IRolesPermissionsRepository } from '@/infra/repositories/rolesPermissions/IRolesPermissionsRepository';
import { RolePermission } from '../../entities/rolePermission';

export interface IListRolesPermissionsResponse {
  data: RolePermission[];
}

export class ListRolesPermissionsUseCase {
  private rolesPermissionsRepository: IRolesPermissionsRepository;

  constructor(rolesPermissionsRepository: IRolesPermissionsRepository) {
    this.rolesPermissionsRepository = rolesPermissionsRepository;
  }

  async execute(): Promise<IListRolesPermissionsResponse> {
    const rolesPermissions = await this.rolesPermissionsRepository.list();

    return {
      data: rolesPermissions,
    };
  }
}
