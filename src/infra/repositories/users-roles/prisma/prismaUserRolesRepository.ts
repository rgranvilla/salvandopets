import { prisma } from '@/database/lib/prisma';

import { UserRole } from '@/domain/users-roles/entities/userRole';
import { UserRoleMapper } from '@/infra/mappers/users-roles/userRolesMapper';

import { IUserRolesRepository } from '../IUserRolesRepository';

export class PrismaUserRolesRepository implements IUserRolesRepository {
  async save(userRole: UserRole, alreadyExist: boolean): Promise<UserRole> {
    if (alreadyExist) {
      return this._update(userRole);
    } else {
      return this._create(userRole);
    }
  }

  async _create(userRole: UserRole): Promise<UserRole> {
    const raw = UserRoleMapper.toDatabase(userRole);

    const createdUserRole = await prisma.usersRole.create({
      data: raw,
    });

    return UserRoleMapper.toDomain(createdUserRole);
  }

  async _update(userRole: UserRole): Promise<UserRole> {
    const raw = UserRoleMapper.toDatabase(userRole);

    const updatedUserRole = await prisma.usersRole.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return UserRoleMapper.toDomain(updatedUserRole);
  }

  async delete(userRoleId: string): Promise<void> {
    await prisma.usersRole.delete({
      where: {
        id: userRoleId,
      },
    });
  }

  async findByUserId(userId: string): Promise<UserRole | null> {
    const userRole = await prisma.usersRole.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!userRole) {
      return null;
    }

    return UserRoleMapper.toDomain(userRole);
  }
}
