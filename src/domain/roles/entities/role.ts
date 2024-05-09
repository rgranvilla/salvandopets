import { randomUUID } from 'crypto';

import { Replace } from '@/core/helpers/replace';

export interface IRoleEntety {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoleProps {
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Role {
  private _id: string;
  private _props: IRoleProps;

  constructor(
    props: Replace<
      IRoleProps,
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
