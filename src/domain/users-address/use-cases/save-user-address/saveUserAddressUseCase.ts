import { IUserAddressesRepository } from '@/infra/repositories/users-address/IUserAddressesRepository';

import { UserAddress } from '../../entities/userAddress';

interface ISaveUserAddressUseCaseRequest {
  userId: string;
  addressId: string;
}

export class SaveUserAddressesUseCase {
  private userAddressesRepository: IUserAddressesRepository;

  constructor(userAddressesRepository: IUserAddressesRepository) {
    this.userAddressesRepository = userAddressesRepository;
  }

  async execute({
    userId,
    addressId,
  }: ISaveUserAddressUseCaseRequest): Promise<UserAddress> {
    let userAddress: UserAddress;

    const existingUserDetail =
      await this.userAddressesRepository.findByUserId(userId);

    if (existingUserDetail) {
      userAddress = new UserAddress(
        {
          userId,
          addressId,
        },
        existingUserDetail.id,
      );
    } else {
      userAddress = new UserAddress({
        userId,
        addressId,
      });
    }

    const createdUserDetail = this.userAddressesRepository.save(
      userAddress,
      !!existingUserDetail,
    );

    return createdUserDetail;
  }
}
