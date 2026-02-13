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
    categories TEXT,
    entity_id TEXT,
    entity_name TEXT,
    location TEXT,
    country TEXT,
    online INTEGER NOT NULL DEFAULT 0,
    novated_lease INTEGER NOT NULL DEFAULT 0,
    tax_return INTEGER NOT NULL DEFAULT 0,
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
    default_category TEXT,
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
    database_name TEXT PRIMARY KEY,
    cursor TEXT NOT NULL,
    last_sync_time TEXT NOT NULL
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
`);

console.log(`✅ Database initialized at ${DB_PATH}`);
console.log("📝 Note: Database is empty. Run notion-sync to populate with real data.");

db.close();
