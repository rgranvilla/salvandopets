export class RoleAlreadyInUseError extends Error {
  public error: string;

  constructor() {
    super('This role already in use');
    this.error = 'Role Not Available';
  }
}
