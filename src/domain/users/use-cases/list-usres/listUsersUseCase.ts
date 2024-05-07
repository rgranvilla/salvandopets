import { IPaginatedParams } from '@/core/@types/IPaginetedParams';
import { IPaginetedResponse } from '@/core/@types/IPaginetedResponse';
import { IUsersRepository } from '@/infra/repositories/users/IUsersRepository';
import {
  IUserEntety,
  UsersEnumDateRangeField,
  UsersEnumSearchField,
  UsersEnumSortBy,
} from '../../entities/user';

interface IListUsersRequest
  extends IPaginatedParams<
    UsersEnumSortBy,
    UsersEnumSearchField,
    UsersEnumDateRangeField
  > {
  searchQuery?: string;
}

export interface IListUsersResponse extends IPaginetedResponse {
  data: IUserEntety[];
  currentPage: number;
  perPage: number;
  count: number;
}

export class ListUsersUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(params: IListUsersRequest): Promise<IListUsersResponse> {
    const users = await this.usersRepository.list(params);

    return {
      data: users.data,
      currentPage: users.currentPage,
      perPage: users.perPage,
      count: users.count,
    };
  }
}
