import { env } from '@/config/env';

export const auth = {
  secretToken: env.JWT_SECRET,
  expiresInToken: '15m',
  expiresInRefreshToken: '30d',
  expiresRefreshTokenDays: 30,
};
