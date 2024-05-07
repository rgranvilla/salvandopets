export class InvalidCredentialsError extends Error {
  public error: string;

  constructor() {
    super('Invalid Credentials');
    this.error =
      'The email or password you entered is incorrect. Please try again.';
  }
}
