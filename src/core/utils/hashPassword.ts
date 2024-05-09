import { hash } from 'bcrypt';

import { env } from '@/config/env';

export async function hashPassword(password: string) {
  const { SALT_ROUNDS } = env;

  const hashedPassword = await hash(password, SALT_ROUNDS);

  return hashedPassword;
}
