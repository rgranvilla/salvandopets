import { IPermissionsRepository } from '@/infra/repositories/permissions/IPermissionsRepository';

import { IPermissionEntety } from '../../entities/permissions';

export interface IListPermissionsResponse {
  data: IPermissionEntety[];
}

export class ListPermissionsUseCase {
  private permissionsRepository: IPermissionsRepository;

  constructor(permissionsRepository: IPermissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  async execute(): Promise<IListPermissionsResponse> {
    const roles = await this.permissionsRepository.list();

    return {
      data: roles,
    };
  }
}
