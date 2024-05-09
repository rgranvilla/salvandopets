import { AddressNotFoundError } from '@/core/errors/custom-errors/addressNotFoundError';

import { IAddressesRepository } from '@/infra/repositories/address/IAddressesRepository';

import { Address, IAddressEntety } from '../../entities/address';

interface IUpdateAddressUseCaseRequest
  extends Omit<IAddressEntety, 'createdAt' | 'updatedAt'> {}

type IUpdateAddressUseCaseResponse = Address;

export class UpdateAddressUseCase {
  private addressesRepository: IAddressesRepository;

  constructor(addressesRepository: IAddressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute(
    data: IUpdateAddressUseCaseRequest,
  ): Promise<IUpdateAddressUseCaseResponse> {
    const existingAddress = await this.addressesRepository.findById(data.id);

    if (!existingAddress) {
      throw new AddressNotFoundError();
    }

    const updatedAddress = new Address(
      {
        isMain: data.isMain,
        isBilling: data.isBilling,
        isShipping: data.isShipping,
        type: data.type,
        description: data.description,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        createdAt: existingAddress.createdAt,
      },
      existingAddress.id,
    );

    const address = await this.addressesRepository.update(updatedAddress);

    return address;
  }
}
