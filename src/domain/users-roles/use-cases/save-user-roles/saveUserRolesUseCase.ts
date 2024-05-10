import { IUserRolesRepository } from '@/infra/repositories/users-roles/IUserRolesRepository';

import { UserRole } from '../../entities/userRole';

interface ISaveUserRoleUseCaseRequest {
  userId: string;
  roleId: string;
}

export class SaveUserRolesUseCase {
  private userAddressesRepository: IUserRolesRepository;

  constructor(userAddressesRepository: IUserRolesRepository) {
    this.userAddressesRepository = userAddressesRepository;
  }

  async execute({
    userId,
    roleId,
  }: ISaveUserRoleUseCaseRequest): Promise<UserRole> {
    let userAddress: UserRole;

    const existingUserDetail =
      await this.userAddressesRepository.findByUserId(userId);

    if (existingUserDetail) {
      userAddress = new UserRole(
        {
          userId,
          roleId,
        },
        existingUserDetail.id,
      );
    } else {
      userAddress = new UserRole({
        userId,
        roleId,
      });
    }

    const createdUserDetail = this.userAddressesRepository.save(
      userAddress,
      !!existingUserDetail,
    );

    return createdUserDetail;
  }
}
