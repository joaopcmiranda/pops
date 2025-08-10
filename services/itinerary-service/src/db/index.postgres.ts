import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.postgres.js'

// Environment detection
const isTest = process.env.NODE_ENV === 'test'

// PostgreSQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || (isTest ? '5433' : '5432')),
  database: process.env.DB_NAME || (isTest ? 'pops_test' : 'pops_development'),
  user: process.env.DB_USER || 'pops_user',
  password: process.env.DB_PASSWORD || 'pops_password',
  // Set search_path to itinerary_service schema, with public as fallback
  options: `-c search_path=itinerary_service,public`,
}

console.log('Connecting to PostgreSQL:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  schema: 'itinerary_service',
})

// Create connection pool
const pool = new Pool(dbConfig)

// Handle pool errors
pool.on('error', err => {
  console.error('PostgreSQL pool error:', err)
  process.exit(-1)
})

// Create Drizzle instance with PostgreSQL
export const db = drizzle(pool, { schema })

// Export schema for use in services
export * from './schema.postgres.js'
