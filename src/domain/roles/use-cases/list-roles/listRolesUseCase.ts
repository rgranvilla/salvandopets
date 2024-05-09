import { IRolesRepository } from '@/infra/repositories/roles/IRolesRepository';

import { IRoleEntety } from '../../entities/role';

export interface IListRolesResponse {
  data: IRoleEntety[];
}

export class ListRolesUseCase {
  private rolesRepository: IRolesRepository;

  constructor(rolesRepository: IRolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  async execute(): Promise<IListRolesResponse> {
    const roles = await this.rolesRepository.list();

    return {
      data: roles,
    };
  }
}
