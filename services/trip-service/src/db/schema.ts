import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// Users table
export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// People table (for itinerary attendees)
export const people = sqliteTable('people', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  relationshipType: text('relationship_type').notNull(), // 'family' | 'friend' | 'colleague' | 'contact'
  phone: text('phone'),
  email: text('email'),
  whatsapp: text('whatsapp'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Locations table
export const locations = sqliteTable('locations', {
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
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Trips table
export const trips = sqliteTable('trips', {
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
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }).notNull(),

  // Settings and budget (stored as JSON)
  budget: text('budget'), // JSON TripBudget object
  settings: text('settings').notNull(), // JSON TripSettings object

  // Metadata
  coverImage: text('cover_image'),
  tags: text('tags'), // JSON array of strings
  isTemplate: integer('is_template', { mode: 'boolean' }).default(false),
  templateId: text('template_id'),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),

  // Relations
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

// Trip collaborators table
export const tripCollaborators = sqliteTable('trip_collaborators', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  role: text('role').notNull(), // 'viewer' | 'editor' | 'admin'
  permissions: text('permissions').notNull(), // JSON permissions object
  invitedAt: integer('invited_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  acceptedAt: integer('accepted_at', { mode: 'timestamp' }),
  invitedBy: text('invited_by').notNull(), // User ID who sent the invitation

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

// Itinerary items table
export const itineraryItems = sqliteTable('itinerary_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(), // ItemType enum
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }),
  isAllDay: integer('is_all_day', { mode: 'boolean' }).default(false),
  status: text('status').notNull().default('planned'), // 'planned' | 'confirmed' | 'completed' | 'cancelled'
  priority: text('priority').notNull().default('medium'), // 'low' | 'medium' | 'high'
  tags: text('tags'), // JSON array of strings
  notes: text('notes'),

  // Type-specific fields (stored as JSON)
  typeData: text('type_data'), // JSON object with type-specific data

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  locationId: text('location_id').references(() => locations.id, { onDelete: 'set null' }),
})

// Content items table
export const contentItems = sqliteTable('content_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  category: text('category').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  tags: text('tags'), // JSON array of strings
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

// Trip templates table
export const tripTemplates = sqliteTable('trip_templates', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  destination: text('destination').notNull(),
  country: text('country').notNull(),
  type: text('type').notNull(), // TripType enum
  duration: integer('duration').notNull(), // days
  tags: text('tags').notNull(), // JSON array of strings

  // Template data
  itineraryTemplate: text('itinerary_template').notNull(), // JSON
  contentTemplate: text('content_template').notNull(), // JSON

  // Metadata
  createdBy: text('created_by').notNull(), // User ID
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  usageCount: integer('usage_count').default(0),
  rating: real('rating'),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Many-to-many relationship table for itinerary item attendees
export const itineraryItemAttendees = sqliteTable('itinerary_item_attendees', {
  itineraryItemId: text('itinerary_item_id')
    .notNull()
    .references(() => itineraryItems.id, { onDelete: 'cascade' }),
  personId: text('person_id')
    .notNull()
    .references(() => people.id, { onDelete: 'cascade' }),
})

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
  itineraryItems: many(itineraryItems),
  contentItems: many(contentItems),
  collaborations: many(tripCollaborators),
  wishlistItems: many(wishlistItems),
  budgetCategories: many(budgetCategories),
  budgetItems: many(budgetItems),
}))

export const tripsRelations = relations(trips, ({ one, many }) => ({
  user: one(users, {
    fields: [trips.userId],
    references: [users.id],
  }),
  collaborators: many(tripCollaborators),
  itineraryItems: many(itineraryItems),
  contentItems: many(contentItems),
  wishlistItems: many(wishlistItems),
  budgetCategories: many(budgetCategories),
  budgetItems: many(budgetItems),
}))

export const tripCollaboratorsRelations = relations(tripCollaborators, ({ one }) => ({
  trip: one(trips, {
    fields: [tripCollaborators.tripId],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [tripCollaborators.userId],
    references: [users.id],
  }),
}))

export const itineraryItemsRelations = relations(itineraryItems, ({ one, many }) => ({
  trip: one(trips, {
    fields: [itineraryItems.tripId],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [itineraryItems.userId],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [itineraryItems.locationId],
    references: [locations.id],
  }),
  attendees: many(itineraryItemAttendees),
}))

export const contentItemsRelations = relations(contentItems, ({ one }) => ({
  trip: one(trips, {
    fields: [contentItems.tripId],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [contentItems.userId],
    references: [users.id],
  }),
}))

export const peopleRelations = relations(people, ({ many }) => ({
  itineraryItemAttendees: many(itineraryItemAttendees),
}))

export const locationsRelations = relations(locations, ({ many }) => ({
  itineraryItems: many(itineraryItems),
}))

export const itineraryItemAttendeesRelations = relations(itineraryItemAttendees, ({ one }) => ({
  itineraryItem: one(itineraryItems, {
    fields: [itineraryItemAttendees.itineraryItemId],
    references: [itineraryItems.id],
  }),
  person: one(people, {
    fields: [itineraryItemAttendees.personId],
    references: [people.id],
  }),
}))

// Wishlist items table
export const wishlistItems = sqliteTable('wishlist_items', {
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
  estimatedCost: real('estimated_cost'),
  notes: text('notes'),
  imageUrl: text('image_url'),
  websiteUrl: text('website_url'),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

// Type exports for use in services
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Trip = typeof trips.$inferSelect
export type NewTrip = typeof trips.$inferInsert
export type TripCollaborator = typeof tripCollaborators.$inferSelect
export type NewTripCollaborator = typeof tripCollaborators.$inferInsert
export type ItineraryItem = typeof itineraryItems.$inferSelect
export type NewItineraryItem = typeof itineraryItems.$inferInsert
export type ContentItem = typeof contentItems.$inferSelect
export type NewContentItem = typeof contentItems.$inferInsert
export type Person = typeof people.$inferSelect
export type NewPerson = typeof people.$inferInsert
export type Location = typeof locations.$inferSelect
export type NewLocation = typeof locations.$inferInsert
export type TripTemplate = typeof tripTemplates.$inferSelect
export type NewTripTemplate = typeof tripTemplates.$inferInsert
export type WishlistItem = typeof wishlistItems.$inferSelect
export type NewWishlistItem = typeof wishlistItems.$inferInsert
export type BudgetCategory = typeof budgetCategories.$inferSelect
export type NewBudgetCategory = typeof budgetCategories.$inferInsert
export type BudgetItem = typeof budgetItems.$inferSelect
export type NewBudgetItem = typeof budgetItems.$inferInsert

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  trip: one(trips, {
    fields: [wishlistItems.tripId],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [wishlistItems.userId],
    references: [users.id],
  }),
}))

// Budget categories table
export const budgetCategories = sqliteTable('budget_categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  color: text('color').notNull(), // hex color for UI
  icon: text('icon').notNull(), // icon name/emoji for UI
  description: text('description'),
  isDefault: integer('is_default', { mode: 'boolean' }).default(false),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),

  // Relations
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

// Budget items table
export const budgetItems = sqliteTable('budget_items', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  description: text('description').notNull(),
  budgetedAmount: real('budgeted_amount').notNull(),
  actualAmount: real('actual_amount').notNull().default(0),
  notes: text('notes'),
  tags: text('tags'), // JSON array of strings

  // Date tracking
  dateSpent: integer('date_spent', { mode: 'timestamp' }),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),

  // Relations
  categoryId: text('category_id')
    .notNull()
    .references(() => budgetCategories.id, { onDelete: 'cascade' }),
  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

// Budget categories relations
export const budgetCategoriesRelations = relations(budgetCategories, ({ one, many }) => ({
  trip: one(trips, {
    fields: [budgetCategories.tripId],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [budgetCategories.userId],
    references: [users.id],
  }),
  budgetItems: many(budgetItems),
}))

// Budget items relations
export const budgetItemsRelations = relations(budgetItems, ({ one }) => ({
  category: one(budgetCategories, {
    fields: [budgetItems.categoryId],
    references: [budgetCategories.id],
  }),
  trip: one(trips, {
    fields: [budgetItems.tripId],
    references: [trips.id],
  }),
  user: one(users, {
    fields: [budgetItems.userId],
    references: [users.id],
  }),
}))
