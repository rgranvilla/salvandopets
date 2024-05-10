import { randomUUID } from 'crypto';

import { Replace } from '@/core/helpers/replace';

interface IUserRoleProps {
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserRole {
  private _id: string;
  private props: IUserRoleProps;

  constructor(
    props: Replace<
      IUserRoleProps,
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

  public get roleId(): string {
    return this.props.roleId;
  }

  public set roleId(roleId: string) {
    this.props.roleId = roleId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
