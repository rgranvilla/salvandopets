import { IAddressesRepository } from '@/infra/repositories/address/IAddressesRepository';

import { IAddressEntety } from '../../entities/address';

export interface IListAddressResponse {
  data: IAddressEntety[];
}

export class ListAddressUseCase {
  private addressesRepository: IAddressesRepository;

  constructor(addressesRepository: IAddressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute(): Promise<IListAddressResponse> {
    const addresses = await this.addressesRepository.list();

    return {
      data: addresses,
    };
  }
}
