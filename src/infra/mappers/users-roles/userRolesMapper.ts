import { UsersRole as UsersRolesDB } from '@prisma/client';

import { UserRole } from '@/domain/users-roles/entities/userRole';

export class UserRoleMapper {
  static toDatabase(data: UserRole): UsersRolesDB {
    return {
      id: data.id,
      user_id: data.userId,
      role_id: data.roleId,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }

  static toDomain(data: UsersRolesDB): UserRole {
    const userDetail = new UserRole(
      {
        userId: data.user_id,
        roleId: data?.role_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    );

    return userDetail;
  }
}
