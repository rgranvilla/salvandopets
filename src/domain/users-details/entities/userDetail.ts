import { randomUUID } from 'crypto';

import { Replace } from '@/core/helpers/replace';

export enum EnumGender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'NonBinary',
  Agender = 'Agender',
  GenderFluid = 'GenderFluid',
  Bigender = 'Bigender',
  QueerGender = 'QueerGender',
  Other = 'Other',
}

interface IUserDetailProps {
  userId: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  gender?: EnumGender;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDetail {
  private _id: string;
  private props: IUserDetailProps;

  constructor(
    props: Replace<
      IUserDetailProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get firstName(): string | undefined {
    return this.props.firstName;
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  public get lastName(): string | undefined {
    return this.props.lastName;
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get birthDate(): Date | undefined {
    return this.props.birthDate;
  }

  public set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
  }

  public get gender(): EnumGender | undefined {
    return this.props.gender;
  }

  public set gender(gender: EnumGender) {
    this.props.gender = gender;
  }

  public get avatar(): string | undefined {
    return this.props.avatar;
  }

  public set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  public get bio(): string | undefined {
    return this.props.bio;
  }

  public set bio(bio: string) {
    this.props.bio = bio;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
