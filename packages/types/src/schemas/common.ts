import { z } from 'zod'
import { HealthStatus } from '../enums'

// Base response schemas - these will be extended with specific data types
export const baseSuccessResponseSchema = z.object({
  success: z.literal(true),
})

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
})

export const paginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

// Helper function to create success response schema with specific data type
export function createSuccessResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return baseSuccessResponseSchema.extend({
    data: dataSchema,
  })
}

// Helper function to create paginated response schema with specific data type
export function createPaginatedResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    data: z.array(dataSchema),
    pagination: paginationSchema,
  })
}

// Health check schema
export const healthCheckSchema = z.object({
  status: z.nativeEnum(HealthStatus),
  timestamp: z.string(),
  uptime: z.number(),
  services: z.record(z.string(), z.nativeEnum(HealthStatus)).optional(),
})
