import { RoleAlreadyInUseError } from '@/core/errors/custom-errors/roleAlreadyInUseError';
import { IRolesRepository } from '@/infra/repositories/roles/IRolesRepository';
import { Role } from '../../entities/role';

interface ICreateRoleUseCaseRequest {
  name: string;
  description: string | null;
}

type ICreateRoleUseCaseResponse = Role;

export class CreateRoleUseCase {
  private rolesRepository: IRolesRepository;

  constructor(rolesRepository: IRolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  async execute(
    data: ICreateRoleUseCaseRequest,
  ): Promise<ICreateRoleUseCaseResponse> {
    const roleWithSameName = await this.rolesRepository.findByName(data.name);

    if (roleWithSameName) {
      throw new RoleAlreadyInUseError();
    }

    const createdRole = new Role(data);

    const user = await this.rolesRepository.create(createdRole);

    return user;
  }
}
