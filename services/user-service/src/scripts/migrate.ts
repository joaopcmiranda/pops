#!/usr/bin/env tsx

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from '../db/index.js'

/**
 * Database Migration Script
 *
 * Runs all pending database migrations.
 */
async function runMigrations() {
  console.log('🔄 Running database migrations...')

  try {
    // Run PostgreSQL migrations from the migrations directory
    await migrate(db, { migrationsFolder: './migrations' })
    console.log('✅ Migrations completed successfully!')
  } catch (error) {
    console.error('❌ Error running migrations:', error)
    process.exit(1)
  } finally {
    // PostgreSQL connections are handled by the connection pool
    // No explicit closing needed for individual operations
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations().catch(console.error)
}

export { runMigrations }
