import { Role } from '@/domain/roles/entities/role';

export abstract class IRolesRepository {
  abstract create(role: Role): Promise<Role>;
  abstract update(role: Role): Promise<Role>;
  abstract list(): Promise<Role[]>;

  abstract findByName(name: string | null): Promise<Role | null>;
  abstract findById(id: string): Promise<Role | null>;
}
