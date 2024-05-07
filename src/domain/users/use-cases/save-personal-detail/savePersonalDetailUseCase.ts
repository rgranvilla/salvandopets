import { IPersonalDetailsRepository } from '@/infra/repositories/users/IPersonalDetailsRepository';
import { EnumGender, PersonalDetail } from '../../entities/personalDetail';

interface ISavePersonalDetailUseCaseRequest {
  userId: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  gender?: EnumGender;
  avatar?: string;
  bio?: string;
}

export class SavePersonalDetailUseCase {
  private personalDetailsRepository: IPersonalDetailsRepository;

  constructor(personalDetailsRepository: IPersonalDetailsRepository) {
    this.personalDetailsRepository = personalDetailsRepository;
  }

  async execute({
    userId,
    firstName,
    lastName,
    birthDate,
    gender,
    avatar,
    bio,
  }: ISavePersonalDetailUseCaseRequest): Promise<PersonalDetail> {
    let personalDetail: PersonalDetail;

    const existingPersonalDetail =
      await this.personalDetailsRepository.findByUserId(userId);

    if (existingPersonalDetail) {
      personalDetail = new PersonalDetail(
        {
          userId,
          firstName: firstName ?? existingPersonalDetail.firstName ?? undefined,
          lastName: lastName ?? existingPersonalDetail.lastName ?? undefined,
          birthDate: birthDate
            ? new Date(birthDate)
            : existingPersonalDetail?.birthDate
              ? new Date(existingPersonalDetail.birthDate)
              : undefined,
          gender: gender
            ? EnumGender[gender]
            : existingPersonalDetail.gender
              ? EnumGender[existingPersonalDetail.gender]
              : undefined,
          avatar: avatar ?? existingPersonalDetail.avatar ?? undefined,
          bio: bio ?? existingPersonalDetail.bio ?? undefined,
          createdAt: existingPersonalDetail.createdAt ?? undefined,
        },
        existingPersonalDetail.id,
      );
    } else {
      personalDetail = new PersonalDetail({
        userId,
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        gender: gender ? EnumGender[gender] : undefined,
        avatar: avatar ?? undefined,
        bio: bio ?? undefined,
      });
    }

    const createdPersonalDetail = this.personalDetailsRepository.save(
      personalDetail,
      !!existingPersonalDetail,
    );

    return createdPersonalDetail;
  }
}
