import { z } from 'zod'

// Utility types for common patterns
export type ID = string

export type Timestamp = Date

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type WithTimestamps<T = Record<string, never>> = T & {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type WithId<T = Record<string, never>> = T & {
  id: ID
}

export type WithUserOwnership<T = Record<string, never>> = T & {
  userId: ID
}

export type WithTripRelation<T = Record<string, never>> = T & {
  tripId: ID
}

// API Response utility types
export type ApiResponse<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
      code?: string
      details?: Record<string, string | number | boolean>
    }

// Pagination utility types
export type PaginationInput = {
  page?: number
  limit?: number
  offset?: number
}

export type SortInput<T extends string> = {
  sortBy?: T
  sortOrder?: 'asc' | 'desc'
}

// Date range utility type
export type DateRange = {
  start: Date
  end: Date
}

export type DateRangeInput = {
  start: string
  end: string
}

// Common Zod utilities for reuse
export const idSchema = z.string().min(1)
export const emailSchema = z.string().email()
export const urlSchema = z.string().url()
export const dateStringSchema = z.string().datetime()
export const phoneSchema = z.string().min(1)
export const currencySchema = z.string().length(3) // ISO 4217 currency codes

// Validation helpers
export function createPaginationSchema(maxLimit = 100) {
  return z.object({
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(maxLimit).optional(),
    offset: z.number().min(0).optional(),
  })
}

export function createSortSchema<T extends readonly [string, ...string[]]>(sortFields: T) {
  return z.object({
    sortBy: z.enum(sortFields).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  })
}

export function createDateRangeSchema() {
  return z.object({
    start: dateStringSchema,
    end: dateStringSchema,
  })
}
