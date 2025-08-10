import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

// Content items table - rich content for trip categories
export const contentItems = pgTable('content_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  category: text('category').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  tags: text('tags'), // JSON array of strings
  tripId: text('trip_id').notNull(), // Foreign key reference to trip service
  userId: text('user_id').notNull(), // Foreign key reference to user service
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Itinerary items table - structured timeline items
export const itineraryItems = pgTable('itinerary_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(), // ItemType enum
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  isAllDay: boolean('is_all_day').default(false),
  status: text('status').notNull().default('planned'), // 'planned' | 'confirmed' | 'completed' | 'cancelled'
  priority: text('priority').notNull().default('medium'), // 'low' | 'medium' | 'high'
  tags: text('tags'), // JSON array of strings
  notes: text('notes'),
  // Type-specific fields (stored as JSON)
  typeData: text('type_data'), // JSON object with type-specific data
  tripId: text('trip_id').notNull(), // Foreign key reference to trip service
  userId: text('user_id').notNull(), // Foreign key reference to user service
  locationId: text('location_id'), // Foreign key reference to location (could be in user service)
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Many-to-many relationship table for itinerary item attendees
export const itineraryItemAttendees = pgTable('itinerary_item_attendees', {
  itineraryItemId: text('itinerary_item_id').notNull(),
  personId: text('person_id').notNull(), // Foreign key reference to person (in user service)
})

// Type exports for use in services
export type ContentItem = typeof contentItems.$inferSelect
export type NewContentItem = typeof contentItems.$inferInsert
export type ItineraryItem = typeof itineraryItems.$inferSelect
export type NewItineraryItem = typeof itineraryItems.$inferInsert
