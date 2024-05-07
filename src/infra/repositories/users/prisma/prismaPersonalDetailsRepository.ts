import { NotFoundError } from '@/core/errors/custom-errors/notFoundError';
import { prisma } from '@/database/lib/prisma';
import { PersonalDetail } from '@/domain/users/entities/personalDetail';
import { PersonalDetailMapper } from '@/infra/mappers/users/personalDetailMapper';
import { IPersonalDetailsRepository } from '../IPersonalDetailsRepository';

// eslint-disable-next-line prettier/prettier
export class PrismaPersonalDetailsRepository
  implements IPersonalDetailsRepository
{
  async save(
    personalDetails: PersonalDetail,
    alreadyExist: boolean,
  ): Promise<PersonalDetail> {
    if (alreadyExist) {
      return this._update(personalDetails);
    } else {
      return this._create(personalDetails);
    }
  }

  async _create(personalDetails: PersonalDetail): Promise<PersonalDetail> {
    const raw = PersonalDetailMapper.toDatabase(personalDetails);

    const createdUser = await prisma.personalDetail.create({
      data: raw,
    });

    return PersonalDetailMapper.toDomain(createdUser);
  }

  async _update(personalDetails: PersonalDetail): Promise<PersonalDetail> {
    const raw = PersonalDetailMapper.toDatabase(personalDetails);

    const updatedUser = await prisma.personalDetail.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return PersonalDetailMapper.toDomain(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    await prisma.personalDetail.delete({
      where: {
        user_id: userId,
      },
    });
  }

  async findByUserId(userId: string): Promise<PersonalDetail> {
    const personalDetail = await prisma.personalDetail.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!personalDetail) {
      throw new NotFoundError();
    }

    return PersonalDetailMapper.toDomain(personalDetail);
  }
}
