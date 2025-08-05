import { z } from 'zod'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3005),
  HOST: z.string().default('localhost'),

  // Database
  DATABASE_URL: z.string().default('../trip-service/data/trips.db'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3001'), // API Gateway

  // Rate limiting
  RATE_LIMIT_MAX: z.coerce.number().default(1000),
  RATE_LIMIT_WINDOW: z.coerce.number().default(15 * 60 * 1000), // 15 minutes

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
})

export const config = envSchema.parse(process.env)
