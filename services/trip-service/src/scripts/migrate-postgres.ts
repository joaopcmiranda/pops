import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, pool, checkDatabaseHealth } from '../db/index.postgres.js'

async function runMigrations() {
  console.log('🔄 Starting PostgreSQL migrations...')

  try {
    // Check database health first
    const isHealthy = await checkDatabaseHealth()
    if (!isHealthy) {
      throw new Error('Database is not accessible')
    }

    console.log('✅ Database connection verified')

    // Run migrations
    await migrate(db, {
      migrationsFolder: './migrations/postgres',
      migrationsSchema: 'trip_service',
    })

    console.log('✅ Migrations completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

runMigrations()
