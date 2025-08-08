#!/usr/bin/env tsx

import { DatabaseSync } from 'node:sqlite'
import { sql } from 'drizzle-orm'

const dbFile = './data/trips.db'
const sqlite = new DatabaseSync(dbFile)

console.log('🏗️  Creating database schema...')

try {
  // Create tables for trip service only
  const createStatements = [
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

    // Trips table (user_id as string reference, no FK constraint for microservices)
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
      user_id TEXT NOT NULL
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
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
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
