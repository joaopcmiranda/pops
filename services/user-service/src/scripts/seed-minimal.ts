#!/usr/bin/env tsx

import { db, sqlite } from '../db/index.js'
import { users } from '../db/schema.js'
import { clearDatabase } from './clear-db.js'

/**
 * Seed Minimal Data Script
 *
 * Creates only essential data:
 * - Default admin user
 * - System settings
 * - Required enum values
 */
async function seedMinimalData() {
  console.log('🌱 Seeding minimal data...')

  try {
    // Clear existing data first
    await clearDatabase()

    // Create minimal user
    const minimalUsers = [
      {
        id: 'user-admin',
        name: 'Admin User',
        email: 'admin@pops.travel',
        avatar: undefined,
      },
    ]

    await db.insert(users).values(minimalUsers)
    console.log('   ✓ Created admin user')

    console.log('✅ Minimal data seeded successfully!')
    console.log('📊 Data summary:')
    console.log('   - Users: 1 (admin)')
    console.log('   - Trips: 0')
    console.log('   - Itinerary Items: 0')
  } catch (error) {
    console.error('❌ Error seeding minimal data:', error)
    process.exit(1)
  } finally {
    sqlite.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedMinimalData().catch(console.error)
}

export { seedMinimalData }
