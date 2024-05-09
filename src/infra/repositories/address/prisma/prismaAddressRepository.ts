import { prisma } from '@/database/lib/prisma';
import { Address, IAddressFilters } from '@/domain/address/entities/address';
import { AddressMapper } from '@/infra/mappers/address/addressMapper';
import { IAddressesRepository } from '../IAddressesRepository';

export class PrismaAddressesRepository implements IAddressesRepository {
  async findWithFilters(filters: IAddressFilters): Promise<Address[]> {
    const foundedAddresses = await prisma.address.findMany({
      where: {
        city: filters.city,
        neighborhood: filters.neighborhood,
        state: filters.state,
        country: filters.country,
        postal_code: filters.postalCode,
      },
    });

    if (!foundedAddresses) return [];

    return foundedAddresses.map((address) => AddressMapper.toDomain(address));
  }

  async findById(id: string): Promise<Address | null> {
    const foundedAddress = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (!foundedAddress) return null;

    return AddressMapper.toDomain(foundedAddress);
  }

  async create(address: Address): Promise<Address> {
    const raw = AddressMapper.toDatabase(address);

    const createdAddress = await prisma.address.create({
      data: raw,
    });

    return AddressMapper.toDomain(createdAddress);
  }

  async update(address: Address): Promise<Address> {
    const addressData = AddressMapper.toDatabase(address);

    const updatedRole = await prisma.address.update({
      where: {
        id: addressData.id,
      },
      data: addressData,
    });

    return AddressMapper.toDomain(updatedRole);
  }

  async list(): Promise<Address[]> {
    const foundedAddress = await prisma.address.findMany();

    if (!foundedAddress) return new Array<Address>();

    return foundedAddress.map((address) => AddressMapper.toDomain(address));
  }

  async delete(id: string): Promise<{ message: string } | null> {
    const addressExists = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (!addressExists) return null;

    await prisma.address.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Address deleted successfully',
    };
  }
}
