#!/usr/bin/env tsx

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { DatabaseSync } from 'node:sqlite'
import { sql } from 'drizzle-orm'

const dbFile = './data/users.db'
const sqlite = new DatabaseSync(dbFile)

console.log('🏗️  Creating database schema...')

try {
  // Create tables for user service only
  const createStatements = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
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
