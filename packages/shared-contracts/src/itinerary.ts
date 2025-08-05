import { z } from 'zod'
import { personSchema, locationSchema } from './user.js'

// Item types
export const itemTypeSchema = z.enum([
  'transport',
  'accommodation',
  'activity',
  'work',
  'overarching-event',
  'other',
])

// Item status
export const itemStatusSchema = z.enum(['planned', 'confirmed', 'completed', 'cancelled'])

// Item priority
export const itemPrioritySchema = z.enum(['low', 'medium', 'high'])

// Transportation types
export const transportationTypeSchema = z.enum(['flight', 'train', 'bus', 'car', 'boat', 'other'])

// Accommodation types
export const accommodationTypeSchema = z.enum([
  'hotel',
  'hostel',
  'airbnb',
  'friend',
  'family',
  'camping',
  'other',
])

// Activity types
export const activityTypeSchema = z.enum([
  'sightseeing',
  'leisure',
  'cultural',
  'adventure',
  'food',
  'shopping',
  'walking-tour',
  'planning',
  'other',
])

// Work types
export const workTypeSchema = z.enum([
  'meeting',
  'conference',
  'presentation',
  'interview',
  'other',
])

// Cost schema
export const costSchema = z.object({
  amount: z.number(),
  currency: z.string(),
})

// Base itinerary item schema
export const baseItineraryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  type: itemTypeSchema,
  startDate: z.date(),
  endDate: z.date().optional(),
  isAllDay: z.boolean(),
  status: itemStatusSchema,
  priority: itemPrioritySchema,
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Relations
  tripId: z.string(),
  userId: z.string(),
  locationId: z.string().optional(),
  location: locationSchema.optional(),
  attendees: z.array(personSchema).optional(),
  cost: costSchema.optional(),
})

// Type-specific data schemas
export const transportTypeDataSchema = z.object({
  transportationType: transportationTypeSchema,
  flightNumber: z.string().optional(),
  airline: z.string().optional(),
  trainNumber: z.string().optional(),
  busLine: z.string().optional(),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
  seat: z.string().optional(),
  confirmationNumber: z.string().optional(),
})

export const accommodationTypeDataSchema = z.object({
  accommodationType: accommodationTypeSchema,
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  roomType: z.string().optional(),
  roomNumber: z.string().optional(),
  confirmationNumber: z.string().optional(),
  contactInfo: z.string().optional(),
})

export const activityTypeDataSchema = z.object({
  activityType: activityTypeSchema,
  ticketRequired: z.boolean().optional(),
  ticketUrl: z.string().optional(),
  duration: z.number().optional(), // minutes
  capacity: z.number().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  equipment: z.array(z.string()).optional(),
})

export const workTypeDataSchema = z.object({
  workType: workTypeSchema,
  company: z.string().optional(),
  contactPerson: z.string().optional(),
  contactEmail: z.string().optional(),
  meetingUrl: z.string().optional(),
  agenda: z.string().optional(),
})

// Full itinerary item schema with type-specific data
export const itineraryItemSchema = baseItineraryItemSchema.extend({
  typeData: z.string().optional(), // JSON string containing type-specific data
})

// Typed itinerary item schemas
export const transportItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('transport'),
  transportationType: transportationTypeSchema,
  flightNumber: z.string().optional(),
  airline: z.string().optional(),
  trainNumber: z.string().optional(),
  busLine: z.string().optional(),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
  seat: z.string().optional(),
  confirmationNumber: z.string().optional(),
})

export const accommodationItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('accommodation'),
  accommodationType: accommodationTypeSchema,
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  roomType: z.string().optional(),
  roomNumber: z.string().optional(),
  confirmationNumber: z.string().optional(),
  contactInfo: z.string().optional(),
})

export const activityItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('activity'),
  activityType: activityTypeSchema,
  ticketRequired: z.boolean().optional(),
  ticketUrl: z.string().optional(),
  duration: z.number().optional(),
  capacity: z.number().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  equipment: z.array(z.string()).optional(),
})

export const workItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('work'),
  workType: workTypeSchema,
  company: z.string().optional(),
  contactPerson: z.string().optional(),
  contactEmail: z.string().optional(),
  meetingUrl: z.string().optional(),
  agenda: z.string().optional(),
})

export const overarchingEventItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('overarching-event'),
  subEvents: z.array(z.string()), // Array of item IDs
})

// Itinerary day schema
export const itineraryDaySchema = z.object({
  date: z.date(),
  items: z.array(itineraryItemSchema),
})

// Itinerary filters
export const itineraryFiltersSchema = z.object({
  types: z.array(itemTypeSchema).optional(),
  dateRange: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .optional(),
  location: z.string().optional(),
  attendees: z.array(z.string()).optional(), // Person IDs
  status: z.array(itemStatusSchema).optional(),
  tags: z.array(z.string()).optional(),
})

// Input schemas
export const createItineraryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: itemTypeSchema,
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isAllDay: z.boolean().default(false),
  status: itemStatusSchema.default('planned'),
  priority: itemPrioritySchema.default('medium'),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  tripId: z.string(),
  locationId: z.string().optional(),
  attendees: z.array(z.string()).optional(), // Person IDs
  cost: costSchema.optional(),
  typeData: z.string().optional(), // JSON string
})

export const updateItineraryItemSchema = createItineraryItemSchema.partial().extend({
  id: z.string(),
})

// Type exports
export type ItemType = z.infer<typeof itemTypeSchema>
export type ItemStatus = z.infer<typeof itemStatusSchema>
export type ItemPriority = z.infer<typeof itemPrioritySchema>
export type TransportationType = z.infer<typeof transportationTypeSchema>
export type AccommodationType = z.infer<typeof accommodationTypeSchema>
export type ActivityType = z.infer<typeof activityTypeSchema>
export type WorkType = z.infer<typeof workTypeSchema>
export type Cost = z.infer<typeof costSchema>
export type ItineraryItem = z.infer<typeof itineraryItemSchema>
export type TransportItem = z.infer<typeof transportItemSchema>
export type AccommodationItem = z.infer<typeof accommodationItemSchema>
export type ActivityItem = z.infer<typeof activityItemSchema>
export type WorkItem = z.infer<typeof workItemSchema>
export type OverarchingEventItem = z.infer<typeof overarchingEventItemSchema>
export type ItineraryDay = z.infer<typeof itineraryDaySchema>
export type ItineraryFilters = z.infer<typeof itineraryFiltersSchema>
export type CreateItineraryItemInput = z.infer<typeof createItineraryItemSchema>
export type UpdateItineraryItemInput = z.infer<typeof updateItineraryItemSchema>
