import { randomUUID } from 'crypto';

import { Replace } from '@/core/helpers/replace';

interface IAuthTokenProps {
  userId: string;
  token: string;
  refreshToken: string;
  expiresDate: Date;
  createdAt: Date;
}

export class AuthToken {
  private _id: string;
  private props: IAuthTokenProps;

  constructor(
    props: Replace<
      IAuthTokenProps,
      {
        expiresDate?: Date;
        createdAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      expiresDate:
        props.expiresDate ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set token(token: string) {
    this.props.token = token;
  }

  public get token(): string {
    return this.props.token;
  }

  public set refreshToken(refreshToken: string) {
    this.props.refreshToken = refreshToken;
  }

  public get refreshToken(): string {
    return this.props.refreshToken;
  }

  public set expiresDate(expiresDate: Date) {
    this.props.expiresDate = expiresDate;
  }

  public get expiresDate(): Date {
    return this.props.expiresDate;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
