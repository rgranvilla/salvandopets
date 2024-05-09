import { UserDetail } from '@/domain/usersDetails/entities/userDetail';

export abstract class IUserDetailsRepository {
  abstract save(
    userDetails: UserDetail,
    alreadyExist: boolean,
  ): Promise<UserDetail>;

  abstract delete(userId: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<UserDetail | null>;
}
