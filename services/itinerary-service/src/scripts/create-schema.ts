#!/usr/bin/env tsx

import { DatabaseSync } from 'node:sqlite'

const dbFile = './data/trips.db'
const sqlite = new DatabaseSync(dbFile)

console.log('🏗️  Creating database schema...')

try {
  // Create tables for itinerary service only
  const createStatements = [
    // Content items table (references trip_id and user_id without FK constraints)
    `CREATE TABLE IF NOT EXISTS content_items (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      tags TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      trip_id TEXT NOT NULL,
      user_id TEXT NOT NULL
    )`,

    // Itinerary items table (references trip_id, user_id, location_id without FK constraints)
    `CREATE TABLE IF NOT EXISTS itinerary_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      start_date INTEGER NOT NULL,
      end_date INTEGER,
      is_all_day INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'planned',
      priority TEXT NOT NULL DEFAULT 'medium',
      tags TEXT,
      notes TEXT,
      type_data TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      trip_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      location_id TEXT
    )`,

    // Itinerary item attendees junction table (references person_id without FK constraint)
    `CREATE TABLE IF NOT EXISTS itinerary_item_attendees (
      itinerary_item_id TEXT NOT NULL,
      person_id TEXT NOT NULL,
      PRIMARY KEY (itinerary_item_id, person_id),
      FOREIGN KEY (itinerary_item_id) REFERENCES itinerary_items(id) ON DELETE CASCADE
    )`,
  ]

  // Execute each statement
  for (const statement of createStatements) {
    sqlite.exec(statement)
  }

  // Enable WAL mode for better performance
  sqlite.exec('PRAGMA journal_mode = WAL')
  sqlite.exec('PRAGMA foreign_keys = ON')

  console.log('✅ Database schema created successfully!')
} catch (error) {
  console.error('❌ Error creating schema:', error)
  process.exit(1)
} finally {
  sqlite.close()
}
