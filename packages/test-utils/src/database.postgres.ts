import { Pool, PoolClient } from 'pg'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'

export interface TestDatabase {
  pool: Pool
  db: NodePgDatabase<Record<string, never>>
  schema: string
  cleanup: () => Promise<void>
}

/**
 * Creates a PostgreSQL test database connection with schema isolation.
 * Each test gets its own schema for complete isolation.
 */
export async function createTestDatabase(
  schemaPrefix = 'test_',
  service: 'trip' | 'user' | 'itinerary' = 'trip'
): Promise<TestDatabase> {
  // Use unique schema name based on timestamp and service
  const schemaName = `${schemaPrefix}${service}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

  // Connect to PostgreSQL test database
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433'), // Test database port
    database: process.env.DB_NAME || 'pops_test',
    user: process.env.DB_USER || 'pops_test_user',
    password: process.env.DB_PASSWORD || 'pops_test_password',
  })

  // Create schema and set search_path
  const client = await pool.connect()
  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`)
    await client.query(`SET search_path TO ${schemaName},public`)

    // Create service-specific tables
    await createTestSchema(client, service, schemaName)
  } finally {
    client.release()
  }

  // Create drizzle instance with proper schema
  const poolWithSchema = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433'),
    database: process.env.DB_NAME || 'pops_test',
    user: process.env.DB_USER || 'pops_test_user',
    password: process.env.DB_PASSWORD || 'pops_test_password',
    options: `-c search_path=${schemaName},public`,
  })

  const db = drizzle(poolWithSchema)

  const cleanup = async () => {
    try {
      const client = await pool.connect()
      try {
        await client.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`)
      } finally {
        client.release()
      }
    } catch (error) {
      console.warn('Error cleaning up test schema:', error)
    } finally {
      // Only end the poolWithSchema since pool and poolWithSchema are different instances
      await poolWithSchema.end()
      await pool.end()
    }
  }

  return {
    pool: poolWithSchema,
    db,
    schema: schemaName,
    cleanup,
  }
}

/**
 * Creates PostgreSQL schema tables for testing based on service type.
 */
async function createTestSchema(
  client: PoolClient,
  service: 'trip' | 'user' | 'itinerary',
  schemaName: string
): Promise<void> {
  if (service === 'trip') {
    // Trip service tables
    await client.query(`
      CREATE TABLE ${schemaName}.trips (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        destination TEXT NOT NULL,
        country TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'personal',
        status TEXT NOT NULL DEFAULT 'planning',
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        budget TEXT, -- JSON
        settings TEXT NOT NULL, -- JSON
        cover_image TEXT,
        tags TEXT, -- JSON array
        is_template BOOLEAN DEFAULT false,
        template_id TEXT,
        user_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE ${schemaName}.trip_collaborators (
        id TEXT PRIMARY KEY,
        trip_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer',
        permissions TEXT NOT NULL, -- JSON
        invited_at TIMESTAMPTZ DEFAULT NOW(),
        accepted_at TIMESTAMPTZ,
        invited_by TEXT NOT NULL
      );

      CREATE TABLE ${schemaName}.wishlist_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'wishlist',
        priority TEXT NOT NULL DEFAULT 'medium',
        tags TEXT, -- JSON array
        location TEXT,
        estimated_cost TEXT,
        notes TEXT,
        image_url TEXT,
        website_url TEXT,
        trip_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
  } else if (service === 'user') {
    // User service tables
    await client.query(`
      CREATE TABLE ${schemaName}.users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE ${schemaName}.people (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        relationship_type TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        whatsapp TEXT,
        notes TEXT,
        user_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE ${schemaName}.locations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        city TEXT NOT NULL,
        state TEXT,
        latitude REAL,
        longitude REAL,
        type TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
  } else if (service === 'itinerary') {
    // Itinerary service tables
    await client.query(`
      CREATE TABLE ${schemaName}.content_items (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        tags TEXT, -- JSON array
        trip_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE ${schemaName}.itinerary_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ,
        is_all_day BOOLEAN DEFAULT false,
        status TEXT NOT NULL DEFAULT 'planned',
        priority TEXT NOT NULL DEFAULT 'medium',
        tags TEXT, -- JSON array
        notes TEXT,
        type_data TEXT, -- JSON object
        trip_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        location_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE ${schemaName}.itinerary_item_attendees (
        itinerary_item_id TEXT NOT NULL,
        person_id TEXT NOT NULL,
        PRIMARY KEY (itinerary_item_id, person_id)
      );
    `)
  }
}

/**
 * Creates test fixtures for a specific service.
 * Returns created records for use in tests.
 */
export async function createTestFixtures(
  testDb: TestDatabase,
  service: 'trip' | 'user' | 'itinerary'
): Promise<Record<string, unknown>> {
  const { pool } = testDb
  const client = await pool.connect()

  try {
    if (service === 'trip') {
      // Create test trip
      await client.query(`
        INSERT INTO trips (id, title, description, destination, country, type, status, start_date, end_date, settings, user_id)
        VALUES (
          'test-trip-1',
          'Test Trip to Paris',
          'A wonderful test trip',
          'Paris',
          'France',
          'leisure',
          'planning',
          '2024-06-01T00:00:00Z',
          '2024-06-07T23:59:59Z',
          '{"currency": "EUR", "timezone": "Europe/Paris", "dateFormat": "EU"}',
          'test-user-1'
        )
      `)

      // Create test wishlist item
      await client.query(`
        INSERT INTO wishlist_items (id, title, type, category, trip_id, user_id)
        VALUES (
          'test-wishlist-1',
          'Visit Eiffel Tower',
          'experience',
          'activities',
          'test-trip-1',
          'test-user-1'
        )
      `)

      return {
        trip: { id: 'test-trip-1', title: 'Test Trip to Paris' },
        wishlistItem: { id: 'test-wishlist-1', title: 'Visit Eiffel Tower' },
      }
    } else if (service === 'user') {
      // Create test user
      await client.query(`
        INSERT INTO users (id, name, email, password)
        VALUES (
          'test-user-1',
          'Test User',
          'test@example.com',
          '$2b$10$test.hash.here'
        )
      `)

      return {
        user: { id: 'test-user-1', name: 'Test User', email: 'test@example.com' },
      }
    } else if (service === 'itinerary') {
      // Create test content item
      await client.query(`
        INSERT INTO content_items (id, category, title, content, slug, trip_id, user_id)
        VALUES (
          'test-content-1',
          'destinations',
          'Paris Guide',
          'Comprehensive guide to Paris',
          'paris-guide',
          'test-trip-1',
          'test-user-1'
        )
      `)

      // Create test itinerary item
      await client.query(`
        INSERT INTO itinerary_items (id, title, type, start_date, trip_id, user_id)
        VALUES (
          'test-itinerary-1',
          'Arrive in Paris',
          'transport',
          '2024-06-01T10:00:00Z',
          'test-trip-1',
          'test-user-1'
        )
      `)

      return {
        contentItem: { id: 'test-content-1', title: 'Paris Guide' },
        itineraryItem: { id: 'test-itinerary-1', title: 'Arrive in Paris' },
      }
    }

    return {}
  } finally {
    client.release()
  }
}

/**
 * Clears all data from test tables while preserving schema structure.
 */
export async function clearTestData(
  testDb: TestDatabase,
  service: 'trip' | 'user' | 'itinerary'
): Promise<void> {
  const { pool, schema } = testDb
  const client = await pool.connect()

  try {
    if (service === 'trip') {
      await client.query(
        `TRUNCATE ${schema}.wishlist_items, ${schema}.trip_collaborators, ${schema}.trips`
      )
    } else if (service === 'user') {
      await client.query(`TRUNCATE ${schema}.people, ${schema}.locations, ${schema}.users`)
    } else if (service === 'itinerary') {
      await client.query(
        `TRUNCATE ${schema}.itinerary_item_attendees, ${schema}.itinerary_items, ${schema}.content_items`
      )
    }
  } finally {
    client.release()
  }
}
