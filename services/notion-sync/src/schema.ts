import Database from "better-sqlite3";

/**
 * Initialise the SQLite schema for the POPS mirror database.
 * Idempotent — safe to call on every sync run.
 */
export function initSchema(db: Database.Database): void {
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");

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

    CREATE TABLE IF NOT EXISTS entities (
      notion_id                TEXT PRIMARY KEY,
      name                     TEXT NOT NULL,
      type                     TEXT,
      abn                      TEXT,
      aliases                  TEXT,
      default_transaction_type TEXT,
      default_category         TEXT,
      notes                    TEXT,
      last_edited_time         TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_entities_name ON entities(name);

    CREATE TABLE IF NOT EXISTS home_inventory (
      notion_id              TEXT PRIMARY KEY,
      item_name              TEXT NOT NULL,
      brand                  TEXT,
      model                  TEXT,
      item_id                TEXT,
      room                   TEXT,
      location               TEXT,
      type                   TEXT,
      condition              TEXT,
      in_use                 INTEGER NOT NULL DEFAULT 0,
      deductible             INTEGER NOT NULL DEFAULT 0,
      purchase_date          TEXT,
      warranty_expires       TEXT,
      replacement_value      REAL,
      resale_value           REAL,
      purchase_transaction_id TEXT,
      purchased_from_id      TEXT,
      purchased_from_name    TEXT,
      last_edited_time       TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS budgets (
      notion_id        TEXT PRIMARY KEY,
      category         TEXT NOT NULL,
      period           TEXT,
      amount           REAL,
      active           INTEGER NOT NULL DEFAULT 0,
      notes            TEXT,
      last_edited_time TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_budgets_category ON budgets(category);

    CREATE TABLE IF NOT EXISTS wish_list (
      notion_id        TEXT PRIMARY KEY,
      item             TEXT NOT NULL,
      target_amount    REAL,
      saved            REAL,
      priority         TEXT,
      url              TEXT,
      notes            TEXT,
      last_edited_time TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sync_cursors (
      database_id      TEXT PRIMARY KEY,
      last_edited_time TEXT NOT NULL
    );
  `);
}
