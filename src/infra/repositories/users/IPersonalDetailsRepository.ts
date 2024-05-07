import { PersonalDetail } from '@/domain/users/entities/personalDetail';

export abstract class IPersonalDetailsRepository {
  abstract save(
    personalDetails: PersonalDetail,
    toUpdate: boolean,
  ): Promise<PersonalDetail>;

  abstract delete(userId: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<PersonalDetail>;
}
