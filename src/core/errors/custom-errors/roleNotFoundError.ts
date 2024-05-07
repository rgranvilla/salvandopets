export class RoleNotFoundError extends Error {
  public error: string;

  constructor() {
    super('Role not found');
    this.error = 'Role Not Found';
  }
}
