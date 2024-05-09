import { PersonalDetail as PrismaPersonalDetail } from '@prisma/client';

import {
  EnumGender,
  UserDetail,
} from '@/domain/users-details/entities/userDetail';

export class UserDetailsMapper {
  static toDatabase(data: UserDetail): PrismaPersonalDetail {
    return {
      id: data.id,
      user_id: data.userId,
      first_name: data?.firstName ?? null,
      last_name: data?.lastName ?? null,
      birth_date: data?.birthDate ?? null,
      gender: data?.gender ? EnumGender[data?.gender] : null,
      avatar: data?.avatar ?? null,
      bio: data?.bio ?? null,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }

  static toDomain(data: PrismaPersonalDetail): UserDetail {
    const userDetail = new UserDetail(
      {
        userId: data.user_id,
        firstName: data?.first_name ?? undefined,
        lastName: data?.last_name ?? undefined,
        birthDate: data?.birth_date ?? undefined,
        gender: data.gender ? EnumGender[data.gender] : undefined,
        avatar: data?.avatar ?? undefined,
        bio: data?.bio ?? undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    );

    return userDetail;
  }
}
