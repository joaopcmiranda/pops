#!/usr/bin/env tsx

import { db, sqlite } from '../db/index.js'
import { users, trips, people, locations, itineraryItems } from '../db/schema.js'
import {
  sampleUsers,
  sampleTrips,
  samplePeople,
  sampleLocations,
  sampleItineraryItems,
} from '../db/seed-data.js'
import { clearDatabase } from './clear-db.js'

/**
 * Seed Examples Data Script
 *
 * Populates all the sample data from hardcoded values:
 * - All sample trips
 * - All itinerary items
 * - Sample people and locations
 * - Demo content items
 */
async function seedExampleData() {
  console.log('🌱 Seeding example data...')

  try {
    // Clear existing data first
    await clearDatabase()

    // Insert sample data in dependency order
    console.log('   📝 Inserting users...')
    await db.insert(users).values(sampleUsers)
    console.log(`   ✓ Created ${sampleUsers.length} users`)

    console.log('   👥 Inserting people...')
    await db.insert(people).values(samplePeople)
    console.log(`   ✓ Created ${samplePeople.length} people`)

    console.log('   📍 Inserting locations...')
    await db.insert(locations).values(sampleLocations)
    console.log(`   ✓ Created ${sampleLocations.length} locations`)

    console.log('   🧳 Inserting trips...')
    await db.insert(trips).values(sampleTrips)
    console.log(`   ✓ Created ${sampleTrips.length} trips`)

    console.log('   📅 Inserting itinerary items...')
    await db.insert(itineraryItems).values(sampleItineraryItems)
    console.log(`   ✓ Created ${sampleItineraryItems.length} itinerary items`)

    console.log('✅ Example data seeded successfully!')
    console.log('📊 Data summary:')
    console.log(`   - Users: ${sampleUsers.length}`)
    console.log(`   - Trips: ${sampleTrips.length}`)
    console.log(`   - People: ${samplePeople.length}`)
    console.log(`   - Locations: ${sampleLocations.length}`)
    console.log(`   - Itinerary Items: ${sampleItineraryItems.length}`)
    console.log('')
    console.log('🚀 You can now start the services and see the sample data!')
    console.log('📝 Sample trips available:')
    sampleTrips.forEach(trip => {
      console.log(`   • ${trip.title} (${trip.destination})`)
    })
  } catch (error) {
    console.error('❌ Error seeding example data:', error)
    console.error('Error details:', error)
    process.exit(1)
  } finally {
    sqlite.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedExampleData().catch(console.error)
}

export { seedExampleData }
