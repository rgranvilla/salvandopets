import { IUserDetailsRepository } from '@/infra/repositories/users-details/IUserDetailsRepository';

import { EnumGender, UserDetail } from '../../entities/userDetail';

interface ISaveUserDetailUseCaseRequest {
  userId: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  gender?: EnumGender;
  avatar?: string;
  bio?: string;
}

export class SaveUserDetailUseCase {
  private userDetailsRepository: IUserDetailsRepository;

  constructor(userDetailsRepository: IUserDetailsRepository) {
    this.userDetailsRepository = userDetailsRepository;
  }

  async execute({
    userId,
    firstName,
    lastName,
    birthDate,
    gender,
    avatar,
    bio,
  }: ISaveUserDetailUseCaseRequest): Promise<UserDetail> {
    let userDetail: UserDetail;

    const existingUserDetail =
      await this.userDetailsRepository.findByUserId(userId);

    if (existingUserDetail) {
      userDetail = new UserDetail(
        {
          userId,
          firstName: firstName ?? existingUserDetail.firstName ?? undefined,
          lastName: lastName ?? existingUserDetail.lastName ?? undefined,
          birthDate: birthDate
            ? new Date(birthDate)
            : existingUserDetail?.birthDate
              ? new Date(existingUserDetail.birthDate)
              : undefined,
          gender: gender
            ? EnumGender[gender]
            : existingUserDetail.gender
              ? EnumGender[existingUserDetail.gender]
              : undefined,
          avatar: avatar ?? existingUserDetail.avatar ?? undefined,
          bio: bio ?? existingUserDetail.bio ?? undefined,
          createdAt: existingUserDetail.createdAt ?? undefined,
        },
        existingUserDetail.id,
      );
    } else {
      userDetail = new UserDetail({
        userId,
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        gender: gender ? EnumGender[gender] : undefined,
        avatar: avatar ?? undefined,
        bio: bio ?? undefined,
      });
    }

    const createdUserDetail = this.userDetailsRepository.save(
      userDetail,
      !!existingUserDetail,
    );

    return createdUserDetail;
  }
}
