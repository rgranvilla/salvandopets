import { Replace } from '@/core/helpers/replace';
import { randomUUID } from 'crypto';

export type UsersSortByType = 'username' | 'email' | 'created_at';

export type UsersSearchFieldType = 'username' | 'email';

export type UsersDateRangeFieldType =
  | 'created_at'
  | 'updated_at'
  | 'deactivation_date';

export interface IUserEntety {
  id: string;
  username: string | null;
  email: string;
  isActive: boolean;
  deactivationDate: Date | null;
  deactivationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProps {
  username: string | null;
  email: string;
  password: string;
  isActive: boolean;
  deactivationDate?: Date | null;
  deactivationReason?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private _props: IUserProps;

  constructor(
    props: Replace<
      IUserProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._props = {
      ...props,
      isActive: props.isActive,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set username(value: string) {
    this._props.username = value;
  }

  public get username(): string | null {
    return this._props?.username;
  }

  public set email(value: string) {
    this._props.email = value;
  }

  public get email(): string {
    return this._props.email;
  }

  public set password(value: string) {
    this._props.password = value;
  }

  public get password(): string {
    return this._props.password;
  }

  public set isActive(value: boolean) {
    this._props.isActive = value;
  }

  public get isActive(): boolean {
    return this._props.isActive;
  }

  public set deactivationDate(value: Date) {
    this._props.deactivationDate = value;
  }

  public get deactivationDate(): Date | null {
    return this._props?.deactivationDate ?? null;
  }

  public set deactivationReason(value: string) {
    this._props.deactivationReason = value;
  }

  public get deactivationReason(): string | null {
    return this._props?.deactivationReason ?? null;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
