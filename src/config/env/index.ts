import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  REFRESH_SECRET: z.string(),
  SALT_ROUNDS: z.coerce.number().default(8),
  CRYPTO_SECRET: z.string(),
  API_BASE_URL: z.string().default('http://localhost'),
  PORT: z.coerce.number().default(3001),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORTS: z.coerce.number().default(5432),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables.', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
