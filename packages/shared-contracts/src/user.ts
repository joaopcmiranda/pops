import { z } from 'zod'

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
  relationshipType: z.enum(['family', 'friend', 'colleague', 'contact']),
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
  type: z.enum(['venue', 'accommodation', 'workplace', 'tourist-spot', 'restaurant', 'other']),
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
  relationshipType: z.enum(['family', 'friend', 'colleague', 'contact']),
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
  type: z.enum(['venue', 'accommodation', 'workplace', 'tourist-spot', 'restaurant', 'other']),
})

export const updateLocationSchema = createLocationSchema.partial().extend({
  id: z.string(),
})

// Type exports
export type User = z.infer<typeof userSchema>
export type Person = z.infer<typeof personSchema>
export type Location = z.infer<typeof locationSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreatePersonInput = z.infer<typeof createPersonSchema>
export type UpdatePersonInput = z.infer<typeof updatePersonSchema>
export type CreateLocationInput = z.infer<typeof createLocationSchema>
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>
