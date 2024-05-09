import { NotFoundError } from '@/core/errors/custom-errors/notFoundError';
import {
  EnumGender,
  UserDetail,
} from '@/domain/usersDetails/entities/userDetail';

import { UserDetailsMapper } from '@/infra/mappers/userDetails/userDetailsMapper';
import { IUserDetailsRepository } from '../IUserDetailsRepository';

interface InMemoryUserDetailsDB {
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
export class InMemoryUserDetailsRepository implements IUserDetailsRepository {
  private items: InMemoryUserDetailsDB[] = [];

  save(userDetails: UserDetail, alreadyExist: boolean): Promise<UserDetail> {
    if (alreadyExist) {
      return this._update(userDetails);
    } else {
      return this._create(userDetails);
    }
  }

  async _create(userDetails: UserDetail): Promise<UserDetail> {
    const raw = UserDetailsMapper.toDatabase(userDetails);

    this.items.push({
      ...raw,
      gender: raw.gender ? EnumGender[raw.gender] : null,
    });

    return UserDetailsMapper.toDomain(this.items[this.items.length - 1]);
  }

  async _update(userDetails: UserDetail): Promise<UserDetail> {
    const toUpdate = UserDetailsMapper.toDatabase(userDetails);

    const index = this.items.findIndex((item) => item.id === userDetails.id);

    if (index >= 0) {
      this.items[index] = {
        ...toUpdate,
        gender: toUpdate.gender ? EnumGender[toUpdate.gender] : null,
      };
    }

    const parsedPersonalDetails = UserDetailsMapper.toDomain(this.items[index]);

    return parsedPersonalDetails;
  }

  async delete(userId: string): Promise<void> {
    this.items = this.items.filter((item) => item.user_id !== userId);
  }

  async findByUserId(userId: string): Promise<UserDetail> {
    const personalDetail = this.items.find((item) => item.user_id === userId);

    if (!personalDetail) {
      throw new NotFoundError();
    }

    return UserDetailsMapper.toDomain(personalDetail);
  }
}
