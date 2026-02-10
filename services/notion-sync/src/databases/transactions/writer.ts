import type Database from 'better-sqlite3';
import type { TransactionRow } from './types.js';

/** Upsert a batch of transaction rows into SQLite. */
export function upsertTransactions(db: Database.Database, rows: TransactionRow[]): void {
  const stmt = db.prepare(`
    INSERT INTO transactions (
      notion_id, description, account, amount, date, type, categories,
      entity_id, entity_name, location, country, online, novated_lease,
      tax_return, related_transaction_id, notes, last_edited_time
    ) VALUES (
      @notionId, @description, @account, @amount, @date, @type, @categories,
      @entityId, @entityName, @location, @country, @online, @novatedLease,
      @taxReturn, @relatedTransactionId, @notes, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      description = excluded.description,
      account = excluded.account,
      amount = excluded.amount,
      date = excluded.date,
      type = excluded.type,
      categories = excluded.categories,
      entity_id = excluded.entity_id,
      entity_name = excluded.entity_name,
      location = excluded.location,
      country = excluded.country,
      online = excluded.online,
      novated_lease = excluded.novated_lease,
      tax_return = excluded.tax_return,
      related_transaction_id = excluded.related_transaction_id,
      notes = excluded.notes,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: TransactionRow[]) => {
    for (const row of items) {
      stmt.run({
        ...row,
        online: row.online ? 1 : 0,
        novatedLease: row.novatedLease ? 1 : 0,
        taxReturn: row.taxReturn ? 1 : 0,
      });
    }
  });

  upsertMany(rows);
}
