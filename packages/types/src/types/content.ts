import { z } from 'zod'
import {
  contentItemSchema,
  createContentItemSchema,
  updateContentItemSchema,
  contentFiltersSchema,
} from '../schemas/content'

// Inferred types from schemas
export type ContentItem = z.infer<typeof contentItemSchema>

// Input types
export type CreateContentItemInput = z.infer<typeof createContentItemSchema>
export type UpdateContentItemInput = z.infer<typeof updateContentItemSchema>

// Filter types
export type ContentFilters = z.infer<typeof contentFiltersSchema>
