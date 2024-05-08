export class RolePermissionNotFoundError extends Error {
  public error: string;

  constructor() {
    super('Role permission not found');
    this.error = 'Role Permission Not Found';
  }
}
