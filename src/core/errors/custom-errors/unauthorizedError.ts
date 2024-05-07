export class UnauthorizedError extends Error {
  public error: string;

  constructor() {
    super('Unauthorized');
    this.error =
      'You are not authorized to access this resource. Please login.';
  }
}
