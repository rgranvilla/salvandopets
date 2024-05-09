import { Replace } from '@/core/helpers/replace';
import { AddressType } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface IAddressFilters {
  city?: string;
  neighborhood?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface IAddressEntety {
  id: string;
  isMain: boolean;
  isBilling: boolean;
  isShipping: boolean;
  type: AddressType;
  description: string | null;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddressProps {
  isMain: boolean;
  isBilling: boolean;
  isShipping: boolean;
  type: AddressType;
  description: string | null;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Address {
  private _id: string;
  private _props: IAddressProps;

  constructor(
    props: Replace<
      IAddressProps,
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

  public set isMain(value: boolean) {
    this._props.isMain = value;
  }

  public get isMain(): boolean {
    return this._props.isMain;
  }

  public set isBilling(value: boolean) {
    this._props.isBilling = value;
  }

  public get isBilling(): boolean {
    return this._props.isBilling;
  }

  public set isShipping(value: boolean) {
    this._props.isShipping = value;
  }

  public get isShipping(): boolean {
    return this._props.isShipping;
  }

  public set type(value: AddressType) {
    this._props.type = value;
  }

  public get type(): AddressType {
    return this._props.type;
  }

  public set description(value: string) {
    this._props.description = value;
  }

  public get description(): string | null {
    return this._props.description;
  }

  public set street(value: string) {
    this._props.street = value;
  }

  public get street(): string {
    return this._props.street;
  }

  public set number(value: string) {
    this._props.number = value;
  }

  public get number(): string {
    return this._props.number;
  }

  public set neighborhood(value: string) {
    this._props.neighborhood = value;
  }

  public get neighborhood(): string {
    return this._props.neighborhood;
  }

  public set complement(value: string) {
    this._props.complement = value;
  }

  public get complement(): string | null {
    return this._props.complement;
  }

  public set city(value: string) {
    this._props.city = value;
  }

  public get city(): string {
    return this._props.city;
  }

  public set state(value: string) {
    this._props.state = value;
  }

  public get state(): string {
    return this._props.state;
  }

  public set country(value: string) {
    this._props.country = value;
  }

  public get country(): string {
    return this._props.country;
  }

  public set postalCode(value: string) {
    this._props.postalCode = value;
  }

  public get postalCode(): string {
    return this._props.postalCode;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
