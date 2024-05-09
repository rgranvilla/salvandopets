/* eslint-disable camelcase */
import { User as UserDB } from '@prisma/client';

import { User } from '@/domain/users/entities/user';
export class UserMapper {
  static toDatabase(user: User): UserDB {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      is_active: user.isActive,
      deactivation_date: user.deactivationDate,
      deactivation_reason: user.deactivationReason,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  static toDomain(raw: UserDB): User {
    const user = new User(
      {
        username: raw.username,
        email: raw.email,
        password: raw.password,
        isActive: raw.is_active,
        deactivationDate: raw.deactivation_date,
        deactivationReason: raw.deactivation_reason,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    return user;
  }
}
