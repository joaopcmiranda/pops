// Trip schemas and types
export * from './trip.js'

// User, person, and location schemas and types
export * from './user.js'

// Itinerary schemas and types
export * from './itinerary.js'

// Content schemas and types
export * from './content.js'

// Common response schemas
import { z } from 'zod'

export const successResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
})

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
})

export const paginatedResponseSchema = z.object({
  data: z.array(z.unknown()),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
})

// Health check schema
export const healthCheckSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string(),
  uptime: z.number(),
  services: z.record(z.string(), z.enum(['healthy', 'unhealthy'])).optional(),
})

// Type exports for common responses
export type SuccessResponse<T> = {
  success: true
  data: T
}

export type ErrorResponse = z.infer<typeof errorResponseSchema>

export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type HealthCheck = z.infer<typeof healthCheckSchema>
