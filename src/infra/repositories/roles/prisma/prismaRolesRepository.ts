import { prisma } from '@/database/lib/prisma';

import { Role } from '@/domain/roles/entities/role';
import { RoleMapper } from '@/infra/mappers/roles/roleMapper';

import { IRolesRepository } from '../IRolesRepository';

export class PrismaRolesRepository implements IRolesRepository {
  async create(role: Role): Promise<Role> {
    const raw = RoleMapper.toDatabase(role);

    const createdRole = await prisma.role.create({
      data: raw,
    });

    return RoleMapper.toDomain(createdRole);
  }

  async update(role: Role): Promise<Role> {
    const roleData = RoleMapper.toDatabase(role);

    const updatedRole = await prisma.role.update({
      where: {
        id: roleData.id,
      },
      data: roleData,
    });

    return RoleMapper.toDomain(updatedRole);
  }

  async findByName(name: string): Promise<Role | null> {
    const foundedRole = await prisma.role.findUnique({
      where: {
        name,
      },
    });

    if (!foundedRole) return null;

    return RoleMapper.toDomain(foundedRole);
  }

  async findById(id: string): Promise<Role | null> {
    const foundedRole = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!foundedRole) return null;

    return RoleMapper.toDomain(foundedRole);
  }

  async list(): Promise<Role[]> {
    const roles = await prisma.role.findMany();

    if (!roles) return new Array<Role>();

    return roles.map((role) => RoleMapper.toDomain(role));
  }
}
