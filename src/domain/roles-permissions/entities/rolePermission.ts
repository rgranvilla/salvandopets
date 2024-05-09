import { randomUUID } from 'crypto';

import { Replace } from '@/core/helpers/replace';

export interface IRolePermissionEntety {
  id?: string;
  roleId: string;
  permissionId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRolePermissonProps {
  id?: string;
  roleId: string;
  permissionId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class RolePermission {
  private _id: string;
  private _props: IRolePermissonProps;

  constructor(
    props: Replace<
      IRolePermissonProps,
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

  public set roleId(value: string) {
    this._props.roleId = value;
  }

  public get roleId(): string {
    return this._props.roleId;
  }

  public set permissionId(value: string) {
    this._props.permissionId = value;
  }

  public get permissionId(): string {
    return this._props.permissionId;
  }

  public set canCreate(value: boolean) {
    this._props.canCreate = value;
  }

  public get canCreate(): boolean {
    return this._props.canCreate;
  }

  public set canRead(value: boolean) {
    this._props.canRead = value;
  }

  public get canRead(): boolean {
    return this._props.canRead;
  }

  public set canUpdate(value: boolean) {
    this._props.canUpdate = value;
  }

  public get canUpdate(): boolean {
    return this._props.canUpdate;
  }

  public set canDelete(value: boolean) {
    this._props.canDelete = value;
  }

  public get canDelete(): boolean {
    return this._props.canDelete;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
