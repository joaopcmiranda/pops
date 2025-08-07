import { z } from 'zod'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8000),
  HOST: z.string().default('localhost'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:4003'),

  // Service URLs
  TRIP_SERVICE_URL: z.string().default('http://localhost:8030'),
  ITINERARY_SERVICE_URL: z.string().default('http://localhost:8031'),
  USER_SERVICE_URL: z.string().default('http://localhost:8011'),

  // Rate limiting
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW: z.coerce.number().default(15 * 60 * 1000), // 15 minutes

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
})

export const config = envSchema.parse(process.env)
