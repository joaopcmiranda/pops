import BetterSqlite3 from "better-sqlite3";

let db: BetterSqlite3.Database | null = null;

/**
 * Get or create a read-only SQLite connection.
 * The finance-api only reads from SQLite — notion-sync is the sole writer.
 */
export function getDb(): BetterSqlite3.Database {
  if (!db) {
    const sqlitePath = process.env["SQLITE_PATH"] ?? "./data/pops.db";
    db = new BetterSqlite3(sqlitePath, { readonly: true });
    db.pragma("journal_mode = WAL");
    db.pragma("busy_timeout = 5000");
  }
  return db;
}

/** Close the database connection (for graceful shutdown). */
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}
