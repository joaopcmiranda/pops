#!/usr/bin/env tsx

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { db } from '../db/index.js'
import { users, people, locations } from '../db/index.js'

/**
 * Clear Database Script
 *
 * Completely wipes all data from all tables.
 * Useful for testing and development resets.
 */
async function clearDatabase() {
  console.log('🗑️  Clearing database...')

  try {
    // Helper function to safely delete from table
    const safeDelete = async (table: any, tableName: string) => {
      try {
        await db.delete(table)
        console.log(`   ✓ Cleared ${tableName}`)
      } catch (error: any) {
        if (error.message?.includes('no such table')) {
          console.log(`   ~ Skipped ${tableName} (table doesn't exist)`)
        } else {
          throw error
        }
      }
    }

    // Delete in reverse dependency order to avoid foreign key constraints
    await safeDelete(people, 'people')
    await safeDelete(locations, 'locations')
    await safeDelete(users, 'users')

    console.log('✅ Database cleared successfully!')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    process.exit(1)
  } finally {
    // PostgreSQL connections are handled by the connection pool
    // No explicit closing needed for individual operations
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  clearDatabase().catch(console.error)
}

export { clearDatabase }
