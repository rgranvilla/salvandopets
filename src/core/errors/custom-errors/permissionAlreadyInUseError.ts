export class PermissionAlreadyInUseError extends Error {
  public error: string;

  constructor() {
    super('This permission name already in use');
    this.error = 'Permission Name Not Available';
  }
}
