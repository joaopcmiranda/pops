import BetterSqlite3 from "better-sqlite3";

let db: BetterSqlite3.Database | null = null;

/**
 * Get or create the SQLite connection.
 * Uses WAL mode and a 5-second busy timeout for concurrent reader support.
 */
export function getDb(): BetterSqlite3.Database {
  if (!db) {
    const sqlitePath = process.env["SQLITE_PATH"] ?? "./data/pops.db";
    db = new BetterSqlite3(sqlitePath);
    db.pragma("journal_mode = WAL");
    db.pragma("busy_timeout = 5000");
  }
  return db;
}

/** Close the database connection (for graceful shutdown or test teardown). */
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

/**
 * Replace the current connection with a custom one (for testing).
 * Returns the previous connection so callers can restore it if needed.
 */
export function setDb(newDb: BetterSqlite3.Database): BetterSqlite3.Database | null {
  const prev = db;
  db = newDb;
  return prev;
}
