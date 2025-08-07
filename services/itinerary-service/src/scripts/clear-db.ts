#!/usr/bin/env tsx

import { db } from '../db/index.js'
import {
  users,
  trips,
  tripCollaborators,
  itineraryItems,
  contentItems,
  people,
  locations,
  tripTemplates,
  itineraryItemAttendees,
} from '../db/schema.js'
import type { SQLiteTable } from 'drizzle-orm/sqlite-core'

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
    const safeDelete = async (table: SQLiteTable, tableName: string) => {
      try {
        await db.delete(table)
        console.log(`   ✓ Cleared ${tableName}`)
      } catch (error: unknown) {
        if (error instanceof Error && error.message?.includes('no such table')) {
          console.log(`   ~ Skipped ${tableName} (table doesn't exist)`)
        } else {
          throw error
        }
      }
    }

    // Delete in reverse dependency order to avoid foreign key constraints
    await safeDelete(itineraryItemAttendees, 'itinerary item attendees')
    await safeDelete(contentItems, 'content items')
    await safeDelete(itineraryItems, 'itinerary items')
    await safeDelete(tripCollaborators, 'trip collaborators')
    await safeDelete(trips, 'trips')
    await safeDelete(tripTemplates, 'trip templates')
    await safeDelete(locations, 'locations')
    await safeDelete(people, 'people')
    await safeDelete(users, 'users')

    console.log('✅ Database cleared successfully!')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    process.exit(1)
  } finally {
    // Don't close the database connection here as it might be used by other operations
    // sqlite.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  clearDatabase().catch(console.error)
}

export { clearDatabase }
