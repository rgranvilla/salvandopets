import { Permission } from '@/domain/permissions/entities/permissions';

export abstract class IPermissionsRepository {
  abstract create(user: Permission): Promise<Permission>;
  abstract update(user: Permission): Promise<Permission>;
  abstract list(): Promise<Permission[]>;

  abstract findByName(name: string | null): Promise<Permission | null>;
  abstract findById(id: string): Promise<Permission | null>;
}
