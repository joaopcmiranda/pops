import { z } from 'zod'
import { ContentCategory } from '../enums'

// Content item schema
export const contentItemSchema = z.object({
  id: z.string(),
  category: z.nativeEnum(ContentCategory),
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Relations
  tripId: z.string(),
  userId: z.string(),
})

// Input schemas
export const createContentItemSchema = z.object({
  category: z.nativeEnum(ContentCategory),
  title: z.string().min(1),
  content: z.string(),
  slug: z.string().min(1),
  tags: z.array(z.string()).optional(),
  tripId: z.string(),
})

export const updateContentItemSchema = createContentItemSchema.partial().extend({
  id: z.string(),
})

// Content filters
export const contentFiltersSchema = z.object({
  category: z.nativeEnum(ContentCategory).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
})
