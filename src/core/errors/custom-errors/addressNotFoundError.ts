export class AddressNotFoundError extends Error {
  public error: string;

  constructor() {
    super('Address not found');
    this.error = 'Address Not Found';
  }
}
