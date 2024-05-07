import { Replace } from '@/core/helpers/replace';
import { randomUUID } from 'crypto';

export interface IPermissionEntety {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermissionProps {
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Permission {
  private _id: string;
  private _props: IPermissionProps;

  constructor(
    props: Replace<
      IPermissionProps,
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
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(value: string) {
    this._props.name = value;
  }

  public get name(): string {
    return this._props.name;
  }

  public set description(value: string) {
    this._props.description = value;
  }

  public get description(): string | null {
    return this._props.description;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
