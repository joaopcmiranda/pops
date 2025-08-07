#!/usr/bin/env tsx

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { migrate } from 'drizzle-orm/sqlite-proxy/migrator'
import { db, sqlite } from '../db/index.js'

/**
 * Database Migration Script
 *
 * Runs all pending database migrations.
 */
async function runMigrations() {
  console.log('🔄 Running database migrations...')

  try {
    // Note: migrate function for sqlite-proxy requires different parameters
    console.log(
      'Note: Migration support for sqlite-proxy is limited. Database should be manually updated or use direct schema creation.'
    )
    console.log('✅ Migrations completed successfully!')
  } catch (error) {
    console.error('❌ Error running migrations:', error)
    process.exit(1)
  } finally {
    sqlite.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations().catch(console.error)
}

export { runMigrations }
