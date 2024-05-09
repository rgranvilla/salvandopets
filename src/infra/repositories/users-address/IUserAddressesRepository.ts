import { UserAddress } from '@/domain/users-address/entities/userAddress';

export abstract class IUserAddressesRepository {
  abstract save(
    userAddress: UserAddress,
    alreadyExist: boolean,
  ): Promise<UserAddress>;

  abstract delete(userAddressId: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<UserAddress | null>;
}
