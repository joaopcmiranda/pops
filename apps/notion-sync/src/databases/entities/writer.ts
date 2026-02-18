import type Database from 'better-sqlite3';
import type { EntityRow } from './types.js';

/** Upsert a batch of entity rows into SQLite. */
export function upsertEntities(db: Database.Database, rows: EntityRow[]): void {
  const stmt = db.prepare(`
    INSERT INTO entities (
      notion_id, name, type, abn, aliases,
      default_transaction_type, default_tags, notes, last_edited_time
    ) VALUES (
      @notionId, @name, @type, @abn, @aliases,
      @defaultTransactionType, @defaultTags, @notes, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      name = excluded.name,
      type = excluded.type,
      abn = excluded.abn,
      aliases = excluded.aliases,
      default_transaction_type = excluded.default_transaction_type,
      default_tags = excluded.default_tags,
      notes = excluded.notes,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: EntityRow[]) => {
    for (const row of items) {
      stmt.run(row);
    }
  });

  upsertMany(rows);
}
