import { handleError } from '@/core/errors/handleError';
import { EnumGender } from '@/domain/users/entities/personalDetail';
import { SavePersonalDetailUseCase } from '@/domain/users/use-cases/save-personal-detail/savePersonalDetailUseCase';
import { PrismaPersonalDetailsRepository } from '@/infra/repositories/users/prisma/prismaPersonalDetailsRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function savePersonalDetailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const savePersonalDetailBodySchema = z.object({
    userId: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthDate: z.string().optional(),
    gender: z
      .enum([
        'Male',
        'Female',
        'NonBinary',
        'Agender',
        'GenderFluid',
        'Bigender',
        'QueerGender',
        'Other',
      ])
      .optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
  });

  const { userId, firstName, lastName, birthDate, gender, avatar, bio } =
    savePersonalDetailBodySchema.parse(request.body);

  try {
    const personalDetailsRepository = new PrismaPersonalDetailsRepository();
    const savePersonalDetailUseCase = new SavePersonalDetailUseCase(
      personalDetailsRepository,
    );

    const personalDetail = await savePersonalDetailUseCase.execute({
      userId,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      gender: gender ? EnumGender[gender] : undefined,
      avatar: avatar ?? undefined,
      bio: bio ?? undefined,
    });

    return reply.code(201).send({
      id: personalDetail.id,
      userId: personalDetail.userId,
      firstName: personalDetail.firstName,
      lastName: personalDetail.lastName,
      birthDate: personalDetail.birthDate,
      gender: personalDetail.gender,
      avatar: personalDetail.avatar,
      bio: personalDetail.bio,
      createdAt: personalDetail.createdAt,
      updatedAt: personalDetail.updatedAt,
    });
  } catch (err) {
    handleError(err, request, reply);
  }
}
