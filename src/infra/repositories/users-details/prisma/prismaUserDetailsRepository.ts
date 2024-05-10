import { prisma } from '@/database/lib/prisma';

import { UserDetail } from '@/domain/users-details/entities/userDetail';
import { UserDetailsMapper } from '@/infra/mappers/users-details/userDetailsMapper';

import { IUserDetailsRepository } from '../IUserDetailsRepository';

export class PrismaUserDetailsRepository implements IUserDetailsRepository {
  async save(
    userDetails: UserDetail,
    alreadyExist: boolean,
  ): Promise<UserDetail> {
    if (alreadyExist) {
      return this._update(userDetails);
    } else {
      return this._create(userDetails);
    }
  }

  async _create(userDetails: UserDetail): Promise<UserDetail> {
    const raw = UserDetailsMapper.toDatabase(userDetails);

    const createdUser = await prisma.personalDetail.create({
      data: raw,
    });

    return UserDetailsMapper.toDomain(createdUser);
  }

  async _update(userDetails: UserDetail): Promise<UserDetail> {
    const raw = UserDetailsMapper.toDatabase(userDetails);

    const updatedUser = await prisma.personalDetail.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return UserDetailsMapper.toDomain(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    await prisma.personalDetail.delete({
      where: {
        user_id: userId,
      },
    });
  }

  async findByUserId(userId: string): Promise<UserDetail | null> {
    const userDetail = await prisma.personalDetail.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!userDetail) {
      return null;
    }

    return UserDetailsMapper.toDomain(userDetail);
  }
}
