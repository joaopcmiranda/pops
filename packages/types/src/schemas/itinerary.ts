import { z } from 'zod'
import {
  ItemType,
  ItemStatus,
  ItemPriority,
  TransportationType,
  AccommodationType,
  ActivityType,
  WorkType,
  DifficultyLevel,
} from '../enums'
import { personSchema, locationSchema } from './user'

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
  type: z.nativeEnum(ItemType),
  startDate: z.date(),
  endDate: z.date().optional(),
  isAllDay: z.boolean(),
  status: z.nativeEnum(ItemStatus),
  priority: z.nativeEnum(ItemPriority),
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
  transportationType: z.nativeEnum(TransportationType),
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
  accommodationType: z.nativeEnum(AccommodationType),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  roomType: z.string().optional(),
  roomNumber: z.string().optional(),
  confirmationNumber: z.string().optional(),
  contactInfo: z.string().optional(),
})

export const activityTypeDataSchema = z.object({
  activityType: z.nativeEnum(ActivityType),
  ticketRequired: z.boolean().optional(),
  ticketUrl: z.string().optional(),
  duration: z.number().optional(), // minutes
  capacity: z.number().optional(),
  difficulty: z.nativeEnum(DifficultyLevel).optional(),
  equipment: z.array(z.string()).optional(),
})

export const workTypeDataSchema = z.object({
  workType: z.nativeEnum(WorkType),
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
  transportationType: z.nativeEnum(TransportationType),
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
  accommodationType: z.nativeEnum(AccommodationType),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  roomType: z.string().optional(),
  roomNumber: z.string().optional(),
  confirmationNumber: z.string().optional(),
  contactInfo: z.string().optional(),
})

export const activityItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('activity'),
  activityType: z.nativeEnum(ActivityType),
  ticketRequired: z.boolean().optional(),
  ticketUrl: z.string().optional(),
  duration: z.number().optional(),
  capacity: z.number().optional(),
  difficulty: z.nativeEnum(DifficultyLevel).optional(),
  equipment: z.array(z.string()).optional(),
})

export const workItemSchema = baseItineraryItemSchema.extend({
  type: z.literal('work'),
  workType: z.nativeEnum(WorkType),
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
  types: z.array(z.nativeEnum(ItemType)).optional(),
  dateRange: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .optional(),
  location: z.string().optional(),
  attendees: z.array(z.string()).optional(), // Person IDs
  status: z.array(z.nativeEnum(ItemStatus)).optional(),
  tags: z.array(z.string()).optional(),
})

// Input schemas
export const createItineraryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.nativeEnum(ItemType),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isAllDay: z.boolean().default(false),
  status: z.nativeEnum(ItemStatus).default(ItemStatus.PLANNED),
  priority: z.nativeEnum(ItemPriority).default(ItemPriority.MEDIUM),
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
