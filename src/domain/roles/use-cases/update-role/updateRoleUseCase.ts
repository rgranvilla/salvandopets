import { RoleNotFoundError } from '@/core/errors/custom-errors/roleNotFoundError';

import { IRolesRepository } from '@/infra/repositories/roles/IRolesRepository';

import { Role } from '../../entities/role';

interface IUpdateRoleUseCaseRequest {
  id: string;
  name: string;
  description: string | null;
}

type IUpdateRoleUseCaseResponse = Role;

export class UpdateRoleUseCase {
  private rolesRepository: IRolesRepository;

  constructor(rolesRepository: IRolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  async execute(
    data: IUpdateRoleUseCaseRequest,
  ): Promise<IUpdateRoleUseCaseResponse> {
    const existingRole = await this.rolesRepository.findById(data.id);

    if (!existingRole) {
      throw new RoleNotFoundError();
    }

    const updatedRole = new Role(
      {
        name: existingRole.name,
        description: data.description ?? existingRole.description,
        createdAt: existingRole.createdAt,
      },
      existingRole.id,
    );

    const role = await this.rolesRepository.update(updatedRole);

    return role;
  }
}
