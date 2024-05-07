export class ExpiredTokenError extends Error {
  public error: string;

  constructor() {
    super('EXPIRED_TOKEN');
    this.error = 'The token has expired. Please log in to obtain a new one.';
  }
}
