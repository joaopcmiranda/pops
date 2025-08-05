import { z } from 'zod'

// Trip types
export const tripTypeSchema = z.enum([
  'leisure',
  'business',
  'family',
  'adventure',
  'honeymoon',
  'solo',
  'group',
  'other',
])

export const tripStatusSchema = z.enum(['planning', 'upcoming', 'active', 'completed', 'cancelled'])

// Trip budget schema
export const tripBudgetSchema = z.object({
  total: z.number().optional(),
  currency: z.string(),
  categories: z.object({
    accommodation: z.number().optional(),
    transport: z.number().optional(),
    activities: z.number().optional(),
    food: z.number().optional(),
    shopping: z.number().optional(),
    other: z.number().optional(),
  }),
  spent: z.number().optional(),
})

// Trip settings schema
export const tripSettingsSchema = z.object({
  timezone: z.string(),
  dateFormat: z.enum(['US', 'EU', 'ISO']),
  currency: z.string(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    reminders: z.boolean(),
  }),
  privacy: z.enum(['private', 'shared', 'public']),
  collaborators: z.array(z.string()).optional(),
})

// Trip collaborator schema
export const tripCollaboratorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.enum(['viewer', 'editor', 'admin']),
  permissions: z.object({
    canEdit: z.boolean(),
    canDelete: z.boolean(),
    canInvite: z.boolean(),
    canExport: z.boolean(),
  }),
  invitedAt: z.date(),
  acceptedAt: z.date().optional(),
  invitedBy: z.string(),
})

// Trip stats schema
export const tripStatsSchema = z.object({
  totalItems: z.number(),
  itemsByType: z.record(z.string(), z.number()),
  itemsByStatus: z.record(z.string(), z.number()),
  totalDays: z.number(),
  budgetUtilization: z.number().optional(),
  completionRate: z.number().optional(),
  lastActivity: z.date(),
})

// Main trip schema
export const tripSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  destination: z.string().min(1),
  country: z.string().min(1),
  type: tripTypeSchema,
  status: tripStatusSchema,

  // Dates
  startDate: z.date(),
  endDate: z.date(),

  // Budget and settings
  budget: tripBudgetSchema.optional(),
  settings: tripSettingsSchema,

  // Metadata
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isTemplate: z.boolean().optional(),
  templateId: z.string().optional(),

  // Ownership and collaboration
  userId: z.string(),
  collaborators: z.array(tripCollaboratorSchema).optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),

  // Statistics (computed)
  stats: tripStatsSchema.optional(),
})

// Trip template schema
export const tripTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  destination: z.string(),
  country: z.string(),
  type: tripTypeSchema,
  duration: z.number(), // days
  tags: z.array(z.string()),

  // Template data
  itineraryTemplate: z.string(), // JSON
  contentTemplate: z.string(), // JSON

  // Metadata
  createdBy: z.string(),
  isPublic: z.boolean(),
  usageCount: z.number(),
  rating: z.number().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
})

// Input schemas for API operations
export const createTripSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  destination: z.string().min(1),
  country: z.string().min(1),
  type: tripTypeSchema,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  budget: tripBudgetSchema.optional(),
  settings: tripSettingsSchema.optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  templateId: z.string().optional(),
})

export const updateTripSchema = createTripSchema.partial().extend({
  id: z.string(),
  status: tripStatusSchema.optional(),
})

// Trip filters schema
export const tripFiltersSchema = z.object({
  status: z.array(tripStatusSchema).optional(),
  type: z.array(tripTypeSchema).optional(),
  destination: z.string().optional(),
  country: z.string().optional(),
  dateRange: z
    .object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  collaborator: z.boolean().optional(),
})

// Trip list input schema
export const tripListInputSchema = z.object({
  filters: tripFiltersSchema.optional(),
  sortBy: z.enum(['title', 'startDate', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
})

// Trip template list input schema
export const tripTemplateListInputSchema = z.object({
  type: tripTypeSchema.optional(),
  destination: z.string().optional(),
  limit: z.number().min(1).max(50).optional(),
})

// Type exports
export type TripType = z.infer<typeof tripTypeSchema>
export type TripStatus = z.infer<typeof tripStatusSchema>
export type TripBudget = z.infer<typeof tripBudgetSchema>
export type TripSettings = z.infer<typeof tripSettingsSchema>
export type TripCollaborator = z.infer<typeof tripCollaboratorSchema>
export type TripStats = z.infer<typeof tripStatsSchema>
export type Trip = z.infer<typeof tripSchema>
export type TripTemplate = z.infer<typeof tripTemplateSchema>
export type CreateTripInput = z.infer<typeof createTripSchema>
export type UpdateTripInput = z.infer<typeof updateTripSchema>
export type TripFilters = z.infer<typeof tripFiltersSchema>
export type TripListInput = z.infer<typeof tripListInputSchema>
export type TripTemplateListInput = z.infer<typeof tripTemplateListInputSchema>
