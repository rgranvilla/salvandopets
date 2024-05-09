import { Address, IAddressFilters } from '@/domain/address/entities/address';

export abstract class IAddressesRepository {
  abstract create(address: Address): Promise<Address>;
  abstract update(address: Address): Promise<Address>;
  abstract list(): Promise<Address[]>;
  abstract delete(id: string): Promise<{ message: string } | null>;

  abstract findWithFilters(filters: IAddressFilters): Promise<Address[]>;
  abstract findById(id: string): Promise<Address | null>;
}
