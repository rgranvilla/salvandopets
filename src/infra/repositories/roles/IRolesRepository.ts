import { Role } from '@/domain/roles/entities/role';

export abstract class IRolesRepository {
  abstract create(user: Role): Promise<Role>;
  abstract update(user: Role): Promise<Role>;

  abstract findByName(name: string | null): Promise<Role | null>;
  abstract findById(id: string): Promise<Role | null>;
}
