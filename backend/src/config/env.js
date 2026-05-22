import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_MODEL: z.string().default('gemini-2.5-flash'),
  GEMINI_TIMEOUT_MS: z.coerce.number().default(55_000),
  /** Comma-separated allowed frontend origins (Vercel + localhost) */
  FRONTEND_URL: z.string().optional(),
  /** @deprecated Use FRONTEND_URL — kept for backward compatibility */
  CLIENT_ORIGIN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const hasGeminiKey = Boolean(env.GEMINI_API_KEY);

/** Resolve CORS origins from FRONTEND_URL or legacy CLIENT_ORIGIN */
export function getAllowedOrigins() {
  const raw =
    env.FRONTEND_URL ||
    env.CLIENT_ORIGIN ||
    'http://localhost:5173,http://127.0.0.1:5173';

  return raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}
