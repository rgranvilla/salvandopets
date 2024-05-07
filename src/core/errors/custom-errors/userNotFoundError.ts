export class UserNotFoundError extends Error {
  public error: string;

  constructor() {
    super('User not found');
    this.error = 'User Not Found';
  }
}
