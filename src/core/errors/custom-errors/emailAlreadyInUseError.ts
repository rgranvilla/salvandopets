export class EmailAlreadyInUseError extends Error {
  public error: string;

  constructor() {
    super('This email already in use');
    this.error = 'Email Not Available';
  }
}
