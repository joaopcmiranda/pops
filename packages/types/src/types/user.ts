import { z } from 'zod'
import {
  userSchema,
  personSchema,
  locationSchema,
  createUserSchema,
  updateUserSchema,
  createPersonSchema,
  updatePersonSchema,
  createLocationSchema,
  updateLocationSchema,
} from '../schemas/user'

// Inferred types from schemas
export type User = z.infer<typeof userSchema>
export type Person = z.infer<typeof personSchema>
export type Location = z.infer<typeof locationSchema>

// Input types
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreatePersonInput = z.infer<typeof createPersonSchema>
export type UpdatePersonInput = z.infer<typeof updatePersonSchema>
export type CreateLocationInput = z.infer<typeof createLocationSchema>
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>
