import { IPaginatedParams } from '@/core/@types/IPaginetedParams';
import {
  User,
  UsersDateRangeFieldType,
  UsersSearchFieldType,
  UsersSortByType,
} from '@/domain/users/entities/user';
import { IListUsersResponse } from '@/domain/users/use-cases/list-usres/listUsersUseCase';
import { UserMapper } from '@/infra/mappers/users/userMapper';
import { IUsersRepository } from '../IUsersRepository';

type InMemoryUserDB = {
  id: string;
  email: string;
  username: string | null;
  password: string;
  is_active: boolean;
  deactivation_date: Date | null;
  deactivation_reason: string | null;
  created_at: Date;
  updated_at: Date;
};
export class InMemoryUsersRepository implements IUsersRepository {
  private items: InMemoryUserDB[] = [];

  async create(user: User): Promise<User> {
    this.items.push(UserMapper.toDatabase(user));

    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.items.findIndex((item) => item.id === user.id);

    if (index >= 0) {
      this.items[index] = UserMapper.toDatabase(user);
    }

    const parsedUser = UserMapper.toDomain(this.items[index]);

    return parsedUser;
  }

  async list(
    params: IPaginatedParams<
      UsersSortByType,
      UsersSearchFieldType,
      UsersDateRangeFieldType
    >,
  ): Promise<IListUsersResponse> {
    let parsedUsers: InMemoryUserDB[] = this.items;

    const {
      sortBy,
      sortOrder = 'asc',
      searchField,
      searchQuery,
      dateRangeField,
      dateRangeStart,
      dateRangeEnd,
      page = 0,
      perPage = 12,
    } = params;

    if (searchField && searchQuery) {
      parsedUsers = parsedUsers.filter((user) => {
        switch (searchField) {
          case 'username':
            return user.username === searchQuery;
          case 'email':
            return user.email === searchQuery;
          default:
            return true;
        }
      });
    }

    if (dateRangeField && dateRangeStart && dateRangeEnd) {
      parsedUsers = parsedUsers.filter((user: InMemoryUserDB) => {
        // Explicitly define the type of the 'user' parameter
        switch (dateRangeField) {
          case 'created_at':
            return (
              user.created_at >= dateRangeStart! &&
              user.created_at <= dateRangeEnd!
            );
          case 'updated_at':
            return (
              user.updated_at >= dateRangeStart! &&
              user.updated_at <= dateRangeEnd!
            );
          case 'deactivation_date':
            return (
              user.deactivation_date! >= dateRangeStart! &&
              user.deactivation_date! <= dateRangeEnd!
            );
          default:
            return false;
        }
      });
    }

    if (sortBy && sortOrder && parsedUsers.length > 1) {
      parsedUsers = parsedUsers.sort((a, b: InMemoryUserDB) => {
        switch (sortBy) {
          case 'username':
            return (
              (a.username || '').localeCompare(b.username || '') *
              (sortOrder === 'asc' ? 1 : -1)
            );
          case 'email':
            return (
              a.email.localeCompare(b.email) * (sortOrder === 'asc' ? 1 : -1)
            );
          case 'created_at':
            return (
              (a.created_at.getTime() - b.created_at.getTime()) *
              (sortOrder === 'asc' ? 1 : -1)
            );
          default:
            return 0;
        }
      });
    }

    parsedUsers = parsedUsers.map((item) => {
      const user = UserMapper.toDomain(item);

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        is_active: user.isActive,
        deactivation_date: user.deactivationDate,
        deactivation_reason: user.deactivationReason,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      };
    });

    const result = parsedUsers.map((user) => UserMapper.toDomain(user));

    return {
      currentPage: page ?? 0,
      perPage: perPage ?? 12,
      count: parsedUsers.length,
      data: result,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundedUser = this.items.find((user) => user.email === email);

    if (!foundedUser) return null;

    const parsedUser = UserMapper.toDomain(foundedUser);

    return parsedUser;
  }

  async findByUsername(username: string | null): Promise<User | null> {
    if (!username) return null;
    const foundedUser = this.items.find((user) => user.username === username);

    if (!foundedUser) return null;

    const parsedUser = UserMapper.toDomain(foundedUser);

    return parsedUser;
  }

  async findById(id: string): Promise<User | null> {
    const foundedUser = this.items.find((user) => user.id === id);

    if (!foundedUser) return null;

    const parsedUser = UserMapper.toDomain(foundedUser);

    return parsedUser;
  }
}
