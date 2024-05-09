import { prisma } from '@/database/lib/prisma';

import { UserAddress } from '@/domain/users-address/entities/userAddress';
import { UserAddressesMapper } from '@/infra/mappers/users-address/userDetailsMapper';

import { IUserAddressesRepository } from '../IUserAddressesRepository';

export class PrismaUserAddressesRepository implements IUserAddressesRepository {
  async save(
    userAddress: UserAddress,
    alreadyExist: boolean,
  ): Promise<UserAddress> {
    if (alreadyExist) {
      return this._update(userAddress);
    } else {
      return this._create(userAddress);
    }
  }

  async _create(userAddress: UserAddress): Promise<UserAddress> {
    const raw = UserAddressesMapper.toDatabase(userAddress);

    const createdUser = await prisma.usersAddress.create({
      data: raw,
    });

    return UserAddressesMapper.toDomain(createdUser);
  }

  async _update(userAddress: UserAddress): Promise<UserAddress> {
    const raw = UserAddressesMapper.toDatabase(userAddress);

    const updatedUser = await prisma.usersAddress.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return UserAddressesMapper.toDomain(updatedUser);
  }

  async delete(userAddressId: string): Promise<void> {
    await prisma.usersAddress.delete({
      where: {
        id: userAddressId,
      },
    });
  }

  async findByUserId(userId: string): Promise<UserAddress | null> {
    const userDetail = await prisma.usersAddress.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!userDetail) {
      return null;
    }

    return UserAddressesMapper.toDomain(userDetail);
  }
}
