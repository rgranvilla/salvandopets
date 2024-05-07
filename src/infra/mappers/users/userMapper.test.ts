import { describe, expect, it } from 'vitest';
import { User } from '../../../domain/users/entities/user';
import { UserMapper } from './userMapper';

describe('UserMapper', () => {
  const user = new User({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    isActive: true,
  });

  const rawUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
    is_active: user.isActive,
    deactivation_date: user.deactivationDate,
    deactivation_reason: user.deactivationReason,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };

  it('should convert user to database format', () => {
    const dbUser = UserMapper.toDatabase(user);

    expect(dbUser).toEqual(rawUser);
  });

  it('should convert raw data to domain user', () => {
    const domainUser = UserMapper.toDomain(rawUser);

    expect(domainUser).toBeInstanceOf(User);
    expect(domainUser.username).toBe(rawUser.username);
    expect(domainUser.email).toBe(rawUser.email);
    expect(domainUser.password).toBe(rawUser.password);
    expect(domainUser.createdAt).toBe(rawUser.created_at);
    expect(domainUser.updatedAt).toBe(rawUser.updated_at);
    expect(domainUser.id).toBe(rawUser.id);
  });
});
