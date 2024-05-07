import { IPaginatedParams } from '@/core/@types/IPaginetedParams';
import { prisma } from '@/database/lib/prisma';
import {
  User,
  UsersDateRangeFieldType,
  UsersSearchFieldType,
  UsersSortByType,
} from '@/domain/users/entities/user';
import { IListUsersResponse } from '@/domain/users/use-cases/list-usres/listUsersUseCase';
import { UserMapper } from '@/infra/mappers/users/userMapper';
import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: User): Promise<User> {
    const raw = UserMapper.toDatabase(user);

    const createdUser = await prisma.user.create({
      data: raw,
    });

    return UserMapper.toDomain(createdUser);
  }

  async update(user: User): Promise<User> {
    const userData = UserMapper.toDatabase(user);

    const updatedUser = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: userData,
    });

    return UserMapper.toDomain(updatedUser);
  }

  async list(
    params: IPaginatedParams<
      UsersSortByType,
      UsersSearchFieldType,
      UsersDateRangeFieldType
    >,
  ): Promise<IListUsersResponse> {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderByClause: any = {};

    if (searchField && searchQuery) {
      whereClause[searchField] = { contains: searchQuery };
    }

    if (dateRangeField && dateRangeStart && dateRangeEnd) {
      whereClause[dateRangeField] = { gte: dateRangeStart, lte: dateRangeEnd };
    }

    if (sortBy) {
      orderByClause[sortBy as UsersSortByType] = sortOrder;
    }

    const totalCount = await prisma.user.count({
      where: Object.keys(whereClause).length ? whereClause : undefined,
    });

    const rawUsers = await prisma.user.findMany({
      skip: page * perPage,
      take: perPage,
      orderBy: Object.keys(orderByClause).length ? orderByClause : undefined,
      where: Object.keys(whereClause).length ? whereClause : undefined,
    });

    const result = rawUsers.map((rawUser) => {
      const user = UserMapper.toDomain(rawUser);

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        deactivationDate: user.deactivationDate,
        deactivationReason: user.deactivationReason,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    return {
      currentPage: page,
      perPage,
      count: totalCount,
      data: result,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundedUser) return null;

    return UserMapper.toDomain(foundedUser);
  }

  async findByUsername(username: string | null): Promise<User | null> {
    if (!username) return null;

    const foundedUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!foundedUser) return null;

    return UserMapper.toDomain(foundedUser);
  }

  async findById(id: string): Promise<User | null> {
    const foundedUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!foundedUser) return null;

    return UserMapper.toDomain(foundedUser);
  }
}
