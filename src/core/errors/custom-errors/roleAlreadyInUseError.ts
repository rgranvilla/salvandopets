export class RoleAlreadyInUseError extends Error {
  public error: string;

  constructor() {
    super('This role name already in use');
    this.error = 'Role Name Not Available';
  }
}
