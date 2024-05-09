/* eslint-disable camelcase */
import { Role as RoleDB } from '@prisma/client';

import { Role } from '@/domain/roles/entities/role';

export class RoleMapper {
  static toDatabase(role: Role): RoleDB {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      created_at: role.createdAt,
      updated_at: role.updatedAt,
    };
  }

  static toDomain(raw: RoleDB): Role {
    const role = new Role(
      {
        name: raw.name,
        description: raw.description,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    return role;
  }
}
