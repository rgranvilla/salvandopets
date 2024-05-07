import { NotFoundError } from '@/core/errors/custom-errors/notFoundError';
import {
  EnumGender,
  PersonalDetail,
} from '@/domain/users/entities/personalDetail';
import { PersonalDetailMapper } from '@/infra/mappers/users/personalDetailMapper';
import { IPersonalDetailsRepository } from '../IPersonalDetailsRepository';

interface InMemoryPersonalDetailsDB {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  birth_date: Date | null;
  gender: EnumGender | null;
  avatar: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
}

// eslint-disable-next-line prettier/prettier
export class InMemoryPersonalDetailsRepository
  implements IPersonalDetailsRepository
{
  private items: InMemoryPersonalDetailsDB[] = [];

  async create(personalDetails: PersonalDetail): Promise<PersonalDetail> {
    const raw = PersonalDetailMapper.toDatabase(personalDetails);

    this.items.push({
      ...raw,
      gender: raw.gender ? EnumGender[raw.gender] : null,
    });

    return PersonalDetailMapper.toDomain(this.items[this.items.length - 1]);
  }

  async update(personalDetails: PersonalDetail): Promise<PersonalDetail> {
    const toUpdate = PersonalDetailMapper.toDatabase(personalDetails);

    const index = this.items.findIndex(
      (item) => item.id === personalDetails.id,
    );

    if (index >= 0) {
      this.items[index] = {
        ...toUpdate,
        gender: toUpdate.gender ? EnumGender[toUpdate.gender] : null,
      };
    }

    const parsedPersonalDetails = PersonalDetailMapper.toDomain(
      this.items[index],
    );

    return parsedPersonalDetails;
  }

  async delete(userId: string): Promise<void> {
    this.items = this.items.filter((item) => item.user_id !== userId);
  }

  async findByUserId(userId: string): Promise<PersonalDetail> {
    const personalDetail = this.items.find((item) => item.user_id === userId);

    if (!personalDetail) {
      throw new NotFoundError();
    }

    return PersonalDetailMapper.toDomain(personalDetail);
  }
}
