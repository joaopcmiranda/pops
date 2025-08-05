import { drizzle } from 'drizzle-orm/sqlite-proxy'
import { DatabaseSync } from 'node:sqlite'
import * as schema from './schema.js'

// Database file path
const dbFile = process.env.DATABASE_URL?.replace('file:', '') || './data/trips.db'

// Create database connection function
export function createDbConnection() {
  const sqlite = new DatabaseSync(dbFile)
  sqlite.exec('PRAGMA journal_mode = WAL')
  sqlite.exec('PRAGMA foreign_keys = ON')
  return sqlite
}

// Create or connect to SQLite database using Node.js built-in SQLite
const sqlite = createDbConnection()

// Create Drizzle instance with proxy
export const db = drizzle(
  async (sql, params, method) => {
    try {
      const stmt = sqlite.prepare(sql)

      if (method === 'run') {
        const result = stmt.run(...(params || []))
        return { rows: [], changes: result.changes, lastInsertRowid: result.lastInsertRowid }
      } else if (method === 'all') {
        const rows = stmt.all(...(params || []))
        return { rows: rows || [] }
      } else if (method === 'values') {
        const rows = stmt.all(...(params || []))
        return { rows: (rows || []).map(row => Object.values(row)) }
      } else if (method === 'get') {
        const row = stmt.get(...(params || []))
        return { rows: row ? [row] : [] }
      }

      // Default case
      return { rows: [] }
    } catch (error: any) {
      console.error('Database query error:', error)
      console.error('SQL:', sql)
      console.error('Params:', params)
      throw error
    }
  },
  { schema }
)

// Export the database instance for manual queries if needed
export { sqlite }

// Export all schema
export * from './schema.js'
