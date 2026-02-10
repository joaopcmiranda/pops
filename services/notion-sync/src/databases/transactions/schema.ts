import type Database from "better-sqlite3";

/** Create the transactions table and its indexes. Idempotent. */
export function createTransactionsTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      notion_id       TEXT PRIMARY KEY,
      description     TEXT NOT NULL,
      account         TEXT NOT NULL,
      amount          REAL NOT NULL,
      date            TEXT NOT NULL,
      type            TEXT NOT NULL DEFAULT '',
      categories      TEXT NOT NULL DEFAULT '',
      entity_id       TEXT,
      entity_name     TEXT,
      location        TEXT,
      country         TEXT,
      online          INTEGER NOT NULL DEFAULT 0,
      novated_lease   INTEGER NOT NULL DEFAULT 0,
      tax_return      INTEGER NOT NULL DEFAULT 0,
      related_transaction_id TEXT,
      notes           TEXT,
      last_edited_time TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
    CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account);
    CREATE INDEX IF NOT EXISTS idx_transactions_entity ON transactions(entity_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_last_edited ON transactions(last_edited_time);
  `);
}
