import type Database from 'better-sqlite3';
import type { SyncCursor } from './types.js';

/** Create the sync_cursors table. Idempotent. */
export function createCursorsTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sync_cursors (
      database_id      TEXT PRIMARY KEY,
      last_edited_time TEXT NOT NULL
    );
  `);
}

/** Save a sync cursor so the next run can resume incrementally. */
export function saveCursor(db: Database.Database, cursor: SyncCursor): void {
  db.prepare(
    `
    INSERT INTO sync_cursors (database_id, last_edited_time)
    VALUES (@databaseId, @lastEditedTime)
    ON CONFLICT(database_id) DO UPDATE SET
      last_edited_time = excluded.last_edited_time
  `
  ).run(cursor);
}

/** Load the last sync cursor for a database. */
export function loadCursor(db: Database.Database, databaseId: string): string | undefined {
  const row = db
    .prepare('SELECT last_edited_time FROM sync_cursors WHERE database_id = ?')
    .get(databaseId) as { last_edited_time: string } | undefined;
  return row?.last_edited_time;
}
