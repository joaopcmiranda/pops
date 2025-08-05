import { z } from 'zod'

// Content categories
export const contentCategorySchema = z.enum([
  'destinations',
  'itinerary',
  'transport',
  'accommodation',
  'activities',
  'budget',
  'documents',
  'notes',
  'other',
])

// Content item schema
export const contentItemSchema = z.object({
  id: z.string(),
  category: contentCategorySchema,
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
  category: contentCategorySchema,
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
  category: contentCategorySchema.optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
})

// Type exports
export type ContentCategory = z.infer<typeof contentCategorySchema>
export type ContentItem = z.infer<typeof contentItemSchema>
export type CreateContentItemInput = z.infer<typeof createContentItemSchema>
export type UpdateContentItemInput = z.infer<typeof updateContentItemSchema>
export type ContentFilters = z.infer<typeof contentFiltersSchema>
