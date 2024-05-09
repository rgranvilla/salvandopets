import { describe, expect, it } from 'vitest';

import { User } from './user';

describe('User', () => {
  it('should create a new User instance', () => {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('john_doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('password123');
    expect(user.isActive).toBe(true);
    expect(user.deactivationDate).toBeNull();
    expect(user.deactivationReason).toBeNull();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should update the username', () => {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
    });

    user.username = 'jane_doe';

    expect(user.username).toBe('jane_doe');
  });

  it('should update the email', () => {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
    });

    user.email = 'jane@example.com';

    expect(user.email).toBe('jane@example.com');
  });

  it('should update the password', () => {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
    });

    user.password = 'newpassword123';

    expect(user.password).toBe('newpassword123');
  });

  it('should update the isActive property', () => {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
    });

    user.isActive = false;

    expect(user.isActive).toBe(false);
  });

  it('should update the deactivationDate property', () => {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
    });

    const date = new Date();
    user.deactivationDate = date;

    expect(user.deactivationDate).toBe(date);
  });

  it('should update the deactivationReason property', () => {
    const user = new User({
      username: 'john_doe',
      email: 'jhon@example.com',
      password: 'password123',
      isActive: true,
    });

    user.deactivationReason = 'Inactive account';

    expect(user.deactivationReason).toBe('Inactive account');
  });
});
