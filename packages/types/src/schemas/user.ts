import { z } from 'zod'
import { RelationshipType, LocationType } from '../enums'

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Person schema (for itinerary attendees)
export const personSchema = z.object({
  id: z.string(),
  name: z.string(),
  relationshipType: z.nativeEnum(RelationshipType),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  whatsapp: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Location schema
export const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: z.nativeEnum(LocationType),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Input schemas
export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  avatar: z.string().optional(),
})

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string(),
})

export const createPersonSchema = z.object({
  name: z.string().min(1),
  relationshipType: z.nativeEnum(RelationshipType),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  whatsapp: z.string().optional(),
  notes: z.string().optional(),
})

export const updatePersonSchema = createPersonSchema.partial().extend({
  id: z.string(),
})

export const createLocationSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: z.nativeEnum(LocationType),
})

export const updateLocationSchema = createLocationSchema.partial().extend({
  id: z.string(),
})
