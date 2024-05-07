export class UsernameAlreadyInUseError extends Error {
  public error: string;

  constructor() {
    super('This username already in use');
    this.error = 'Username Not Available';
  }
}
