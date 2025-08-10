import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.postgres.js'

// Environment-specific database configuration
const _isDevelopment = process.env.NODE_ENV !== 'production'
const isTest = process.env.NODE_ENV === 'test'

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || (isTest ? '5433' : '5432')),
  database: process.env.DB_NAME || (isTest ? 'pops_test' : 'pops_development'),
  user: process.env.DB_USER || (isTest ? 'pops_test_user' : 'pops_user'),
  password: process.env.DB_PASSWORD || (isTest ? 'pops_test_password' : 'pops_password'),
  // Schema-specific search path for the trip service
  options: `-c search_path=trip_service,public`,
  // Connection pool settings
  max: parseInt(process.env.DB_POOL_SIZE || '10'),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '2000'),
}

console.log('Connecting to PostgreSQL:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  schema: 'trip_service',
})

// Create connection pool
const pool = new Pool(dbConfig)

// Create Drizzle instance
export const db = drizzle(pool, { schema })

// Export pool for manual queries if needed
export { pool }

// Health check function
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await pool.query('SELECT 1')
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}

// Graceful shutdown
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await pool.end()
    console.log('Database connection pool closed')
  } catch (error) {
    console.error('Error closing database connection:', error)
  }
}

// Export all schema for service usage
export * from './schema.postgres.js'
