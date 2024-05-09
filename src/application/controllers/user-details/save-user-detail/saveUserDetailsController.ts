import { handleError } from '@/core/errors/handleError';
import { EnumGender } from '@/domain/usersDetails/entities/userDetail';
import { SaveUserDetailUseCase } from '@/domain/usersDetails/use-cases/save-user-detail/saveUserDetailUseCase';
import { PrismaUserDetailsRepository } from '@/infra/repositories/userDetails/prisma/prismaUserDetailsRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function saveUserDetailsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const saveUserDetailBodySchema = z.object({
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

  const saveUserDetailPathSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = saveUserDetailPathSchema.parse(request.params);

  const { firstName, lastName, birthDate, gender, avatar, bio } =
    saveUserDetailBodySchema.parse(request.body);

  try {
    const personalDetailsRepository = new PrismaUserDetailsRepository();
    const saveUserDetailUseCase = new SaveUserDetailUseCase(
      personalDetailsRepository,
    );

    const personalDetail = await saveUserDetailUseCase.execute({
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
