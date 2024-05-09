import { IAddressesRepository } from '@/infra/repositories/address/IAddressesRepository';
import { Address, IAddressEntety } from '../../entities/address';

interface ICreateAddressUseCaseRequest
  extends Omit<IAddressEntety, 'id' | 'createdAt' | 'updatedAt'> {}

type ICreateAddressUseCaseResponse = Address;

export class CreateAddressUseCase {
  private addressesRepository: IAddressesRepository;

  constructor(addressesRepository: IAddressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute(
    data: ICreateAddressUseCaseRequest,
  ): Promise<ICreateAddressUseCaseResponse> {
    const createdAddress = new Address(data);

    const address = await this.addressesRepository.create(createdAddress);

    return address;
  }
}
