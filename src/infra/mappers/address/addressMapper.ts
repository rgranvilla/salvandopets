/* eslint-disable camelcase */
import { Address } from '@/domain/address/entities/address';
import { Address as AddressDB, AddressType } from '@prisma/client';

export class AddressMapper {
  static toDatabase(address: Address): AddressDB {
    return {
      id: address.id,
      is_main: address.isMain,
      is_billing: address.isBilling,
      is_shipping: address.isShipping,
      type: address.type,
      description: address.description,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      complement: address.complement,
      city: address.city,
      state: address.state,
      country: address.country,
      postal_code: address.postalCode,
      created_at: address.createdAt,
      updated_at: address.updatedAt,
    };
  }

  static toDomain(raw: AddressDB): Address {
    const address = new Address(
      {
        isMain: raw.is_main,
        isBilling: raw.is_billing,
        isShipping: raw.is_shipping,
        type: AddressType[raw.type] as AddressType,
        description: raw.description,
        street: raw.street,
        number: raw.number,
        neighborhood: raw.neighborhood,
        complement: raw.complement,
        city: raw.city,
        state: raw.state,
        country: raw.country,
        postalCode: raw.postal_code,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    return address;
  }
}
