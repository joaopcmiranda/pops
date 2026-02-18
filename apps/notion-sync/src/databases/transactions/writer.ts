import type Database from 'better-sqlite3';
import type { TransactionRow } from './types.js';

/** Upsert a batch of transaction rows into SQLite. */
export function upsertTransactions(db: Database.Database, rows: TransactionRow[]): void {
  const stmt = db.prepare(`
    INSERT INTO transactions (
      notion_id, description, account, amount, date, type, tags,
      entity_id, entity_name, location, country,
      related_transaction_id, notes, last_edited_time
    ) VALUES (
      @notionId, @description, @account, @amount, @date, @type, @tags,
      @entityId, @entityName, @location, @country,
      @relatedTransactionId, @notes, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      description = excluded.description,
      account = excluded.account,
      amount = excluded.amount,
      date = excluded.date,
      type = excluded.type,
      tags = excluded.tags,
      entity_id = excluded.entity_id,
      entity_name = excluded.entity_name,
      location = excluded.location,
      country = excluded.country,
      related_transaction_id = excluded.related_transaction_id,
      notes = excluded.notes,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: TransactionRow[]) => {
    for (const row of items) {
      stmt.run(row);
    }
  });

  upsertMany(rows);
}
