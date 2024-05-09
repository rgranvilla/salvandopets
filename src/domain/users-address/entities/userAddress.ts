import { randomUUID } from 'crypto';

import { Replace } from '@/core/helpers/replace';

interface IUserAddressProps {
  userId: string;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserAddress {
  private _id: string;
  private props: IUserAddressProps;

  constructor(
    props: Replace<
      IUserAddressProps,
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

  public get addressId(): string {
    return this.props.addressId;
  }

  public set addressId(addressId: string) {
    this.props.addressId = addressId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
