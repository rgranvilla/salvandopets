import { IPaginatedParams } from '@/core/@types/IPaginetedParams';
import {
  User,
  UsersDateRangeFieldType,
  UsersSearchFieldType,
  UsersSortByType,
} from '@/domain/users/entities/user';
import { IListUsersResponse } from '@/domain/users/use-cases/list-usres/listUsersUseCase';

export abstract class IUsersRepository {
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract list(
    params: IPaginatedParams<
      UsersSortByType,
      UsersSearchFieldType,
      UsersDateRangeFieldType
    >,
  ): Promise<IListUsersResponse>;

  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string | null): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
