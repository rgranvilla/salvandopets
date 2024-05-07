export class NotFoundError extends Error {
  public error: string;

  constructor() {
    super('Not found');
    this.error = 'Not Found';
  }
}
