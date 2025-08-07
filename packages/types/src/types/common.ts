import { z } from 'zod'
import {
  baseSuccessResponseSchema,
  errorResponseSchema,
  paginationSchema,
  healthCheckSchema,
} from '../schemas/common'

// Inferred types from schemas
export type BaseSuccessResponse = z.infer<typeof baseSuccessResponseSchema>

export type SuccessResponse<T> = BaseSuccessResponse & {
  data: T
}

export type ErrorResponse = z.infer<typeof errorResponseSchema>

export type Pagination = z.infer<typeof paginationSchema>

export type PaginatedResponse<T> = {
  data: T[]
  pagination: Pagination
}

export type HealthCheck = z.infer<typeof healthCheckSchema>
