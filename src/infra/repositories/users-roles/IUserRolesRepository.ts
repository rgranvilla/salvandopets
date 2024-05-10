import { UserRole } from '@/domain/users-roles/entities/userRole';

export abstract class IUserRolesRepository {
  abstract save(userRole: UserRole, alreadyExist: boolean): Promise<UserRole>;

  abstract delete(userRoleId: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<UserRole | null>;
}
