import { pgTable, text, timestamp, boolean, numeric } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// Trips table - main entity for trip service
export const trips = pgTable('trips', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description'),
  destination: text('destination').notNull(),
  country: text('country').notNull(),
  type: text('type').notNull(), // TripType enum
  status: text('status').notNull().default('planning'), // TripStatus enum

  // Dates
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),

  // Settings and budget (stored as JSON)
  budget: text('budget'), // JSON TripBudget object
  settings: text('settings').notNull(), // JSON TripSettings object

  // Metadata
  coverImage: text('cover_image'),
  tags: text('tags'), // JSON array of strings
  isTemplate: boolean('is_template').default(false),
  templateId: text('template_id'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),

  // Foreign key to user service (cross-service reference)
  userId: text('user_id').notNull(), // References user_service.users.id
})

// Trip collaborators table
export const tripCollaborators = pgTable('trip_collaborators', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  role: text('role').notNull(), // 'viewer' | 'editor' | 'admin'
  permissions: text('permissions').notNull(), // JSON permissions object
  invitedAt: timestamp('invited_at', { withTimezone: true }).defaultNow(),
  acceptedAt: timestamp('accepted_at', { withTimezone: true }),
  invitedBy: text('invited_by').notNull(), // User ID who sent the invitation

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // References user_service.users.id
})

// Wishlist items table (trip-specific wishlist)
export const wishlistItems = pgTable('wishlist_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(), // 'food' | 'place' | 'experience' | 'accommodation' | 'transport' | 'activity'
  category: text('category').notNull(), // relates to trip categories: destinations, activities, etc.
  status: text('status').notNull().default('wishlist'), // 'wishlist' | 'planned' | 'booked' | 'completed'
  priority: text('priority').notNull().default('medium'), // 'low' | 'medium' | 'high'
  tags: text('tags'), // JSON array of strings
  location: text('location'),
  estimatedCost: numeric('estimated_cost', { precision: 10, scale: 2 }),
  notes: text('notes'),
  imageUrl: text('image_url'),
  websiteUrl: text('website_url'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // References user_service.users.id
})

// Trip templates table
export const tripTemplates = pgTable('trip_templates', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  destination: text('destination').notNull(),
  country: text('country').notNull(),
  type: text('type').notNull(), // TripType enum
  duration: numeric('duration', { precision: 5, scale: 0 }).notNull(), // days
  tags: text('tags').notNull(), // JSON array of strings

  // Template data
  itineraryTemplate: text('itinerary_template').notNull(), // JSON
  contentTemplate: text('content_template').notNull(), // JSON

  // Metadata
  createdBy: text('created_by').notNull(), // User ID
  isPublic: boolean('is_public').default(false),
  usageCount: numeric('usage_count', { precision: 10, scale: 0 }).default('0'),
  rating: numeric('rating', { precision: 3, scale: 2 }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// Content items table
export const contentItems = pgTable('content_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  category: text('category').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  tags: text('tags'), // JSON array of strings
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // Cross-service reference
})

// Budget categories table
export const budgetCategories = pgTable('budget_categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  color: text('color').notNull(), // hex color for UI
  icon: text('icon').notNull(), // icon name/emoji for UI
  description: text('description'),
  isDefault: boolean('is_default').default(false),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // Cross-service reference
})

// Budget items table
export const budgetItems = pgTable('budget_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  description: text('description').notNull(),
  budgetedAmount: numeric('budgeted_amount', { precision: 10, scale: 2 }).notNull(),
  actualAmount: numeric('actual_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  notes: text('notes'),
  tags: text('tags'), // JSON array of strings

  // Date tracking
  dateSpent: timestamp('date_spent', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),

  // Relations
  categoryId: text('category_id')
    .notNull()
    .references(() => budgetCategories.id, { onDelete: 'cascade' }),
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // Cross-service reference
})

// Define relations
export const tripsRelations = relations(trips, ({ many }) => ({
  collaborators: many(tripCollaborators),
  wishlistItems: many(wishlistItems),
  contentItems: many(contentItems),
  budgetCategories: many(budgetCategories),
  budgetItems: many(budgetItems),
}))

export const tripCollaboratorsRelations = relations(tripCollaborators, ({ one }) => ({
  trip: one(trips, {
    fields: [tripCollaborators.tripId],
    references: [trips.id],
  }),
}))

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  trip: one(trips, {
    fields: [wishlistItems.tripId],
    references: [trips.id],
  }),
}))

export const contentItemsRelations = relations(contentItems, ({ one }) => ({
  trip: one(trips, {
    fields: [contentItems.tripId],
    references: [trips.id],
  }),
}))

export const budgetCategoriesRelations = relations(budgetCategories, ({ one, many }) => ({
  trip: one(trips, {
    fields: [budgetCategories.tripId],
    references: [trips.id],
  }),
  budgetItems: many(budgetItems),
}))

export const budgetItemsRelations = relations(budgetItems, ({ one }) => ({
  category: one(budgetCategories, {
    fields: [budgetItems.categoryId],
    references: [budgetCategories.id],
  }),
  trip: one(trips, {
    fields: [budgetItems.tripId],
    references: [trips.id],
  }),
}))

// Type exports for use in services
export type Trip = typeof trips.$inferSelect
export type NewTrip = typeof trips.$inferInsert
export type TripCollaborator = typeof tripCollaborators.$inferSelect
export type NewTripCollaborator = typeof tripCollaborators.$inferInsert
export type WishlistItem = typeof wishlistItems.$inferSelect
export type NewWishlistItem = typeof wishlistItems.$inferInsert
export type ContentItem = typeof contentItems.$inferSelect
export type NewContentItem = typeof contentItems.$inferInsert
export type BudgetCategory = typeof budgetCategories.$inferSelect
export type NewBudgetCategory = typeof budgetCategories.$inferInsert
export type BudgetItem = typeof budgetItems.$inferSelect
export type NewBudgetItem = typeof budgetItems.$inferInsert
export type TripTemplate = typeof tripTemplates.$inferSelect
export type NewTripTemplate = typeof tripTemplates.$inferInsert
