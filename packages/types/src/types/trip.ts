import { z } from 'zod'
import {
  tripBudgetSchema,
  tripSettingsSchema,
  tripCollaboratorSchema,
  tripStatsSchema,
  tripSchema,
  tripTemplateSchema,
  createTripSchema,
  updateTripSchema,
  tripFiltersSchema,
  tripListInputSchema,
  tripTemplateListInputSchema,
} from '../schemas/trip'

// Inferred types from schemas
export type TripBudget = z.infer<typeof tripBudgetSchema>
export type TripSettings = z.infer<typeof tripSettingsSchema>
export type TripCollaborator = z.infer<typeof tripCollaboratorSchema>
export type TripStats = z.infer<typeof tripStatsSchema>
export type Trip = z.infer<typeof tripSchema>
export type TripTemplate = z.infer<typeof tripTemplateSchema>

// Input types
export type CreateTripInput = z.infer<typeof createTripSchema>
export type UpdateTripInput = z.infer<typeof updateTripSchema>

// Filter and list types
export type TripFilters = z.infer<typeof tripFiltersSchema>
export type TripListInput = z.infer<typeof tripListInputSchema>
export type TripTemplateListInput = z.infer<typeof tripTemplateListInputSchema>
