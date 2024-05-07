export class PermissionNotFoundError extends Error {
  public error: string;

  constructor() {
    super('Permission not found');
    this.error = 'Permission Not Found';
  }
}
