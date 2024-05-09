import { AddressNotFoundError } from '@/core/errors/custom-errors/addressNotFoundError';
import { IAddressesRepository } from '@/infra/repositories/address/IAddressesRepository';

interface IDeleteAddressUseCaseRequest {
  id: string;
}

interface IDeleteAddressUseCaseResponse {
  message: string;
}

export class DeleteAddressUseCase {
  private addressesRepository: IAddressesRepository;

  constructor(addressesRepository: IAddressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute(
    data: IDeleteAddressUseCaseRequest,
  ): Promise<IDeleteAddressUseCaseResponse> {
    const deletedResult = await this.addressesRepository.delete(data.id);

    if (!deletedResult) {
      throw new AddressNotFoundError();
    }

    return deletedResult;
  }
}
