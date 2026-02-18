/**
 * Initialize empty database for local development
 * Run with: tsx scripts/init-db.ts
 */
import BetterSqlite3 from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DB_PATH = process.env.SQLITE_PATH ?? "./data/pops.db";

// Create data directory if it doesn't exist
mkdirSync(dirname(DB_PATH), { recursive: true });

// Create database
const db = new BetterSqlite3(DB_PATH);

// Set pragmas
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    notion_id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    account TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    entity_id TEXT,
    entity_name TEXT,
    location TEXT,
    country TEXT,
    related_transaction_id TEXT,
    notes TEXT,
    last_edited_time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS entities (
    notion_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    abn TEXT,
    aliases TEXT,
    default_transaction_type TEXT,
    default_tags TEXT,
    notes TEXT,
    last_edited_time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS budgets (
    notion_id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    period TEXT NOT NULL,
    amount REAL,
    active INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    last_edited_time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS home_inventory (
    notion_id TEXT PRIMARY KEY,
    item_name TEXT NOT NULL,
    brand TEXT,
    model TEXT,
    item_id TEXT,
    room TEXT,
    location TEXT,
    type TEXT,
    condition TEXT,
    in_use INTEGER,
    deductible INTEGER,
    purchase_date TEXT,
    warranty_expires TEXT,
    replacement_value REAL,
    resale_value REAL,
    purchase_transaction_id TEXT,
    purchased_from_id TEXT,
    purchased_from_name TEXT,
    last_edited_time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS wish_list (
    notion_id TEXT PRIMARY KEY,
    item TEXT NOT NULL,
    target_amount REAL,
    saved REAL,
    priority TEXT,
    url TEXT,
    notes TEXT,
    last_edited_time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sync_cursors (
    database_id TEXT PRIMARY KEY,
    last_edited_time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ai_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    entity_name TEXT,
    category TEXT,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    cost_usd REAL NOT NULL,
    cached INTEGER NOT NULL DEFAULT 0,
    import_batch_id TEXT,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage(created_at);
  CREATE INDEX IF NOT EXISTS idx_ai_usage_batch ON ai_usage(import_batch_id);

  CREATE TABLE IF NOT EXISTS transaction_corrections (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    description_pattern TEXT NOT NULL,
    match_type TEXT CHECK(match_type IN ('exact', 'contains', 'regex')) NOT NULL DEFAULT 'exact',
    entity_id TEXT,
    entity_name TEXT,
    location TEXT,
    tags TEXT NOT NULL DEFAULT '[]',
    transaction_type TEXT CHECK(transaction_type IN ('purchase', 'transfer', 'income')),
    confidence REAL NOT NULL DEFAULT 0.5 CHECK(confidence >= 0.0 AND confidence <= 1.0),
    times_applied INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_used_at TEXT,
    FOREIGN KEY (entity_id) REFERENCES entities(notion_id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_corrections_pattern ON transaction_corrections(description_pattern);
  CREATE INDEX IF NOT EXISTS idx_corrections_confidence ON transaction_corrections(confidence DESC);
  CREATE INDEX IF NOT EXISTS idx_corrections_times_applied ON transaction_corrections(times_applied DESC);

  CREATE VIEW IF NOT EXISTS v_active_corrections AS
  SELECT * FROM transaction_corrections
  WHERE confidence >= 0.7
  ORDER BY confidence DESC, times_applied DESC;
`);

console.log(`✅ Database initialized at ${DB_PATH}`);
console.log("📝 Note: Database is empty. Run notion-sync to populate with real data.");

db.close();
