#!/usr/bin/env tsx

import { DatabaseSync } from 'node:sqlite'

const dbFile = './data/trips.db'
const sqlite = new DatabaseSync(dbFile)

console.log('🏗️  Creating database schema...')

try {
  // Create tables in dependency order
  const createStatements = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      avatar TEXT,
      created_at INTEGER,
      updated_at INTEGER
    )`,

    // People table
    `CREATE TABLE IF NOT EXISTS people (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      relationship_type TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      whatsapp TEXT,
      notes TEXT,
      created_at INTEGER,
      updated_at INTEGER
    )`,

    // Locations table
    `CREATE TABLE IF NOT EXISTS locations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT,
      city TEXT NOT NULL,
      state TEXT,
      latitude REAL,
      longitude REAL,
      type TEXT NOT NULL,
      created_at INTEGER,
      updated_at INTEGER
    )`,

    // Trips table
    `CREATE TABLE IF NOT EXISTS trips (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      destination TEXT NOT NULL,
      country TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'planning',
      start_date INTEGER NOT NULL,
      end_date INTEGER NOT NULL,
      budget TEXT,
      settings TEXT NOT NULL,
      cover_image TEXT,
      tags TEXT,
      is_template INTEGER DEFAULT 0,
      template_id TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      user_id TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // Content items table
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
      user_id TEXT NOT NULL,
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // Itinerary items table
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
      location_id TEXT,
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
    )`,

    // Trip collaborators table
    `CREATE TABLE IF NOT EXISTS trip_collaborators (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      permissions TEXT NOT NULL,
      invited_at INTEGER,
      accepted_at INTEGER,
      invited_by TEXT NOT NULL,
      trip_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // Trip templates table
    `CREATE TABLE IF NOT EXISTS trip_templates (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      destination TEXT NOT NULL,
      country TEXT NOT NULL,
      type TEXT NOT NULL,
      duration INTEGER NOT NULL,
      tags TEXT NOT NULL,
      itinerary_template TEXT NOT NULL,
      content_template TEXT NOT NULL,
      created_by TEXT NOT NULL,
      is_public INTEGER DEFAULT 0,
      usage_count INTEGER DEFAULT 0,
      rating REAL,
      created_at INTEGER,
      updated_at INTEGER
    )`,

    // Itinerary item attendees junction table
    `CREATE TABLE IF NOT EXISTS itinerary_item_attendees (
      itinerary_item_id TEXT NOT NULL,
      person_id TEXT NOT NULL,
      PRIMARY KEY (itinerary_item_id, person_id),
      FOREIGN KEY (itinerary_item_id) REFERENCES itinerary_items(id) ON DELETE CASCADE,
      FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE
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
