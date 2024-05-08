export class RolePermissionAlreadyExistError extends Error {
  public error: string;

  constructor() {
    super('This role permission already exist');
    this.error = 'Role Permission Already Exist';
  }
}
