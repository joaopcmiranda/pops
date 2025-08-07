import { z } from 'zod'
import {
  costSchema,
  baseItineraryItemSchema,
  transportTypeDataSchema,
  accommodationTypeDataSchema,
  activityTypeDataSchema,
  workTypeDataSchema,
  itineraryItemSchema,
  transportItemSchema,
  accommodationItemSchema,
  activityItemSchema,
  workItemSchema,
  overarchingEventItemSchema,
  itineraryDaySchema,
  itineraryFiltersSchema,
  createItineraryItemSchema,
  updateItineraryItemSchema,
} from '../schemas/itinerary'

// Inferred types from schemas
export type Cost = z.infer<typeof costSchema>
export type BaseItineraryItem = z.infer<typeof baseItineraryItemSchema>

// Type-specific data types
export type TransportTypeData = z.infer<typeof transportTypeDataSchema>
export type AccommodationTypeData = z.infer<typeof accommodationTypeDataSchema>
export type ActivityTypeData = z.infer<typeof activityTypeDataSchema>
export type WorkTypeData = z.infer<typeof workTypeDataSchema>

// Item types
export type ItineraryItem = z.infer<typeof itineraryItemSchema>
export type TransportItem = z.infer<typeof transportItemSchema>
export type AccommodationItem = z.infer<typeof accommodationItemSchema>
export type ActivityItem = z.infer<typeof activityItemSchema>
export type WorkItem = z.infer<typeof workItemSchema>
export type OverarchingEventItem = z.infer<typeof overarchingEventItemSchema>

// Other types
export type ItineraryDay = z.infer<typeof itineraryDaySchema>
export type ItineraryFilters = z.infer<typeof itineraryFiltersSchema>

// Input types
export type CreateItineraryItemInput = z.infer<typeof createItineraryItemSchema>
export type UpdateItineraryItemInput = z.infer<typeof updateItineraryItemSchema>
