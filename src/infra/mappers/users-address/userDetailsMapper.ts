import { UsersAddress as UserAddressDB } from '@prisma/client';

import { UserAddress } from '@/domain/users-address/entities/userAddress';

export class UserAddressesMapper {
  static toDatabase(data: UserAddress): UserAddressDB {
    return {
      id: data.id,
      user_id: data.userId,
      address_id: data.addressId,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }

  static toDomain(data: UserAddressDB): UserAddress {
    const userDetail = new UserAddress(
      {
        userId: data.user_id,
        addressId: data?.address_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    );

    return userDetail;
  }
}
