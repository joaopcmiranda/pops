#!/usr/bin/env tsx

import { DatabaseSync } from 'node:sqlite'
import { createId } from '@paralleldrive/cuid2'

const dbFile = './data/trips.db'
const sqlite = new DatabaseSync(dbFile)

console.log('🌱 Seeding trip database...')

try {
  // Disable foreign keys temporarily for seeding
  sqlite.exec('PRAGMA foreign_keys = OFF')

  // Clear existing data first
  sqlite.exec('DELETE FROM trip_collaborators')
  sqlite.exec('DELETE FROM trips')
  sqlite.exec('DELETE FROM locations')

  const now = Date.now()

  // Locations
  const locations = [
    // Rio de Janeiro
    {
      id: 'loc_copacabana_palace',
      name: 'Copacabana Palace Hotel',
      address: 'Av. Atlântica, 1702',
      city: 'Rio de Janeiro',
      state: 'RJ',
      latitude: -22.9663,
      longitude: -43.1792,
      type: 'accommodation',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_christ_redeemer',
      name: 'Christ the Redeemer',
      address: 'Parque Nacional da Tijuca',
      city: 'Rio de Janeiro',
      state: 'RJ',
      latitude: -22.9519,
      longitude: -43.2105,
      type: 'tourist-spot',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_sugarloaf_mountain',
      name: 'Sugarloaf Mountain',
      address: 'Av. Pasteur, 520 - Urca',
      city: 'Rio de Janeiro',
      state: 'RJ',
      latitude: -22.9486,
      longitude: -43.1566,
      type: 'tourist-spot',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_copacabana_beach',
      name: 'Copacabana Beach',
      address: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      latitude: -22.9711,
      longitude: -43.1822,
      type: 'other',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_galeao_airport',
      name: 'Galeão International Airport',
      address: 'Av. Vinte de Janeiro, s/n - Galeão',
      city: 'Rio de Janeiro',
      state: 'RJ',
      latitude: -22.8099,
      longitude: -43.2506,
      type: 'other',
      created_at: now,
      updated_at: now,
    },

    // Tokyo
    {
      id: 'loc_narita_airport',
      name: 'Narita International Airport',
      address: '1-1 Furugome, Narita',
      city: 'Tokyo',
      state: 'Chiba',
      latitude: 35.772,
      longitude: 140.3928,
      type: 'other',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_shibuya_office',
      name: 'Shibuya Business Tower',
      address: '1-2-3 Shibuya, Shibuya-ku',
      city: 'Tokyo',
      state: 'Tokyo',
      latitude: 35.6598,
      longitude: 139.7006,
      type: 'workplace',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_tokyo_hotel',
      name: 'Tokyo Grand Hotel',
      address: '1-1-1 Shinjuku, Shinjuku-ku',
      city: 'Tokyo',
      state: 'Tokyo',
      latitude: 35.6896,
      longitude: 139.7006,
      type: 'accommodation',
      created_at: now,
      updated_at: now,
    },

    // London
    {
      id: 'loc_heathrow_airport',
      name: 'Heathrow Airport',
      address: 'Longford TW6 1AP',
      city: 'London',
      state: 'England',
      latitude: 51.47,
      longitude: -0.4543,
      type: 'other',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_tower_of_london',
      name: 'Tower of London',
      address: "St Katharine's & Wapping, London EC3N 4AB",
      city: 'London',
      state: 'England',
      latitude: 51.5081,
      longitude: -0.0759,
      type: 'tourist-spot',
      created_at: now,
      updated_at: now,
    },
    {
      id: 'loc_london_hotel',
      name: 'The Savoy London',
      address: 'Strand, London WC2R 0EZ',
      city: 'London',
      state: 'England',
      latitude: 51.5103,
      longitude: -0.1209,
      type: 'accommodation',
      created_at: now,
      updated_at: now,
    },
  ]

  // Sample trips
  const trips = [
    {
      id: 'trip_rio_vacation',
      title: 'Rio de Janeiro Adventure',
      description:
        'A week-long vacation exploring the beautiful city of Rio de Janeiro, including beaches, cultural sites, and local cuisine.',
      destination: 'Rio de Janeiro',
      country: 'Brazil',
      type: 'leisure',
      status: 'active',
      start_date: new Date('2024-03-15').getTime(),
      end_date: new Date('2024-03-22').getTime(),
      budget: JSON.stringify({
        total: 3500,
        currency: 'USD',
        categories: {
          accommodation: 1200,
          transport: 900,
          activities: 800,
          food: 600,
        },
      }),
      settings: JSON.stringify({
        timezone: 'America/Sao_Paulo',
        currency: 'USD',
        notifications: true,
        sharing: {
          public: false,
          collaborative: true,
        },
      }),
      cover_image: null,
      tags: JSON.stringify(['vacation', 'beach', 'culture', 'south-america']),
      is_template: 0,
      template_id: null,
      created_at: now,
      updated_at: now,
      user_id: 'user_test_john_doe',
    },
    {
      id: 'trip_tokyo_business',
      title: 'Tokyo Business Trip',
      description:
        'Business meetings and conferences in Tokyo with some sightseeing opportunities.',
      destination: 'Tokyo',
      country: 'Japan',
      type: 'business',
      status: 'completed',
      start_date: new Date('2024-02-10').getTime(),
      end_date: new Date('2024-02-15').getTime(),
      budget: JSON.stringify({
        total: 2800,
        currency: 'USD',
        categories: {
          accommodation: 1200,
          transport: 1100,
          activities: 300,
          food: 200,
        },
      }),
      settings: JSON.stringify({
        timezone: 'Asia/Tokyo',
        currency: 'JPY',
        notifications: true,
        sharing: {
          public: false,
          collaborative: false,
        },
      }),
      cover_image: null,
      tags: JSON.stringify(['business', 'asia', 'meetings', 'conferences']),
      is_template: 0,
      template_id: null,
      created_at: now,
      updated_at: now,
      user_id: 'user_test_jane_smith',
    },
    {
      id: 'trip_london_weekend',
      title: 'London Weekend Getaway',
      description: 'A short weekend trip to London for sightseeing and theater.',
      destination: 'London',
      country: 'United Kingdom',
      type: 'leisure',
      status: 'planning',
      start_date: new Date('2024-06-14').getTime(),
      end_date: new Date('2024-06-16').getTime(),
      budget: JSON.stringify({
        total: 1500,
        currency: 'USD',
        categories: {
          accommodation: 600,
          transport: 400,
          activities: 350,
          food: 150,
        },
      }),
      settings: JSON.stringify({
        timezone: 'Europe/London',
        currency: 'GBP',
        notifications: true,
        sharing: {
          public: false,
          collaborative: true,
        },
      }),
      cover_image: null,
      tags: JSON.stringify(['weekend', 'city-break', 'theater', 'history']),
      is_template: 0,
      template_id: null,
      created_at: now,
      updated_at: now,
      user_id: 'user_test_john_doe',
    },
    {
      id: 'trip_european_template',
      title: 'Classic European City Break',
      description: 'A template for a 4-day European city break with cultural activities.',
      destination: 'Various',
      country: 'Europe',
      type: 'leisure',
      status: 'template',
      start_date: new Date('2024-01-01').getTime(),
      end_date: new Date('2024-01-05').getTime(),
      budget: JSON.stringify({
        total: 2000,
        currency: 'EUR',
        categories: {
          accommodation: 800,
          transport: 600,
          activities: 400,
          food: 200,
        },
      }),
      settings: JSON.stringify({
        timezone: 'Europe/London',
        currency: 'EUR',
        notifications: true,
        sharing: {
          public: true,
          collaborative: false,
        },
      }),
      cover_image: null,
      tags: JSON.stringify(['template', 'city-break', 'culture', 'europe']),
      is_template: 1,
      template_id: null,
      created_at: now,
      updated_at: now,
      user_id: 'user_test_admin',
    },
  ]

  // Insert locations
  const insertLocationStmt = sqlite.prepare(`
    INSERT INTO locations (id, name, address, city, state, latitude, longitude, type, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const location of locations) {
    insertLocationStmt.run(
      location.id,
      location.name,
      location.address,
      location.city,
      location.state,
      location.latitude,
      location.longitude,
      location.type,
      location.created_at,
      location.updated_at
    )
    console.log(`✅ Created location: ${location.name}`)
  }

  // Insert trips
  const insertTripStmt = sqlite.prepare(`
    INSERT INTO trips (id, title, description, destination, country, type, status, start_date, end_date, budget, settings, cover_image, tags, is_template, template_id, created_at, updated_at, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const trip of trips) {
    insertTripStmt.run(
      trip.id,
      trip.title,
      trip.description,
      trip.destination,
      trip.country,
      trip.type,
      trip.status,
      trip.start_date,
      trip.end_date,
      trip.budget,
      trip.settings,
      trip.cover_image,
      trip.tags,
      trip.is_template,
      trip.template_id,
      trip.created_at,
      trip.updated_at,
      trip.user_id
    )
    console.log(`✅ Created trip: ${trip.title}`)
  }

  // Re-enable foreign keys
  sqlite.exec('PRAGMA foreign_keys = ON')

  console.log(`🎉 Successfully seeded ${locations.length} locations and ${trips.length} trips!`)
} catch (error) {
  console.error('❌ Error seeding trip data:', error)
  process.exit(1)
} finally {
  sqlite.close()
}
