import { pgTable, text, timestamp, real } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

// Users table - core user management
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
})

// People table (for contact management) - belongs to user service
export const people = pgTable('people', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  relationshipType: text('relationship_type').notNull(), // 'family' | 'friend' | 'colleague' | 'contact'
  phone: text('phone'),
  email: text('email'),
  whatsapp: text('whatsapp'),
  notes: text('notes'),
  userId: text('user_id').notNull(), // Associate with user for data separation
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Locations table (for location management) - belongs to user service
export const locations = pgTable('locations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  address: text('address'),
  city: text('city').notNull(),
  state: text('state'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  type: text('type').notNull(), // 'venue' | 'accommodation' | 'workplace' | 'tourist-spot' | 'restaurant' | 'other'
  userId: text('user_id').notNull(), // Associate with user for data separation
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Type exports for use in services
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Person = typeof people.$inferSelect
export type NewPerson = typeof people.$inferInsert
export type Location = typeof locations.$inferSelect
export type NewLocation = typeof locations.$inferInsert
