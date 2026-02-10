/**
 * Shared test utilities for finance-api.
 * Provides in-memory SQLite setup, app factory, and seed helpers.
 */
import type { Database } from "better-sqlite3";
import type { Test } from "supertest";
import BetterSqlite3 from "better-sqlite3";
import { setDb, closeDb } from "../db.js";
import { createApp } from "../app.js";

const TEST_API_KEY = "test-api-key-for-tests";

/** Wrap a supertest request with the test auth header. */
export function withAuth(req: Test): Test {
  return req.set("Authorization", `Bearer ${TEST_API_KEY}`);
}

/**
 * Create an in-memory SQLite DB with the entities table schema.
 * Call this in beforeEach to get a fresh DB per test.
 */
export function createTestDb(): Database {
  const db = new BetterSqlite3(":memory:");
  db.pragma("journal_mode = WAL");

  // Create all tables that finance-api might query
  db.exec(`
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
  `);

  return db;
}

/** Seed a single entity row into the test DB. Returns the notion_id. */
export function seedEntity(
  db: Database,
  overrides: Partial<{
    notion_id: string;
    name: string;
    type: string | null;
    abn: string | null;
    aliases: string | null;
    default_transaction_type: string | null;
    default_category: string | null;
    notes: string | null;
    last_edited_time: string;
  }> = {}
): string {
  const id = overrides.notion_id ?? crypto.randomUUID();
  db.prepare(`
    INSERT INTO entities (notion_id, name, type, abn, aliases, default_transaction_type, default_category, notes, last_edited_time)
    VALUES (@notion_id, @name, @type, @abn, @aliases, @default_transaction_type, @default_category, @notes, @last_edited_time)
  `).run({
    notion_id: id,
    name: overrides.name ?? "Test Entity",
    type: overrides.type ?? null,
    abn: overrides.abn ?? null,
    aliases: overrides.aliases ?? null,
    default_transaction_type: overrides.default_transaction_type ?? null,
    default_category: overrides.default_category ?? null,
    notes: overrides.notes ?? null,
    last_edited_time: overrides.last_edited_time ?? "2025-01-01T00:00:00.000Z",
  });
  return id;
}

/** Seed a single transaction row into the test DB. Returns the notion_id. */
export function seedTransaction(
  db: Database,
  overrides: Partial<{
    notion_id: string;
    description: string;
    account: string;
    amount: number;
    date: string;
    type: string;
    categories: string;
    entity_id: string | null;
    entity_name: string | null;
    location: string | null;
    country: string | null;
    online: number;
    novated_lease: number;
    tax_return: number;
    related_transaction_id: string | null;
    notes: string | null;
    last_edited_time: string;
  }> = {}
): string {
  const id = overrides.notion_id ?? crypto.randomUUID();
  db.prepare(`
    INSERT INTO transactions (
      notion_id, description, account, amount, date, type, categories,
      entity_id, entity_name, location, country, online, novated_lease,
      tax_return, related_transaction_id, notes, last_edited_time
    )
    VALUES (
      @notion_id, @description, @account, @amount, @date, @type, @categories,
      @entity_id, @entity_name, @location, @country, @online, @novated_lease,
      @tax_return, @related_transaction_id, @notes, @last_edited_time
    )
  `).run({
    notion_id: id,
    description: overrides.description ?? "Test Transaction",
    account: overrides.account ?? "Test Account",
    amount: overrides.amount ?? 100.0,
    date: overrides.date ?? "2025-01-01",
    type: overrides.type ?? "",
    categories: overrides.categories ?? "",
    entity_id: overrides.entity_id ?? null,
    entity_name: overrides.entity_name ?? null,
    location: overrides.location ?? null,
    country: overrides.country ?? null,
    online: overrides.online ?? 0,
    novated_lease: overrides.novated_lease ?? 0,
    tax_return: overrides.tax_return ?? 0,
    related_transaction_id: overrides.related_transaction_id ?? null,
    notes: overrides.notes ?? null,
    last_edited_time: overrides.last_edited_time ?? "2025-01-01T00:00:00.000Z",
  });
  return id;
}

/** Seed a single inventory item row into the test DB. Returns the notion_id. */
export function seedInventoryItem(
  db: Database,
  overrides: Partial<{
    notion_id: string;
    item_name: string;
    brand: string | null;
    model: string | null;
    item_id: string | null;
    room: string | null;
    location: string | null;
    type: string | null;
    condition: string | null;
    in_use: number;
    deductible: number;
    purchase_date: string | null;
    warranty_expires: string | null;
    replacement_value: number | null;
    resale_value: number | null;
    purchase_transaction_id: string | null;
    purchased_from_id: string | null;
    purchased_from_name: string | null;
    last_edited_time: string;
  }> = {}
): string {
  const id = overrides.notion_id ?? crypto.randomUUID();
  db.prepare(`
    INSERT INTO home_inventory (
      notion_id, item_name, brand, model, item_id, room, location, type, condition,
      in_use, deductible, purchase_date, warranty_expires, replacement_value, resale_value,
      purchase_transaction_id, purchased_from_id, purchased_from_name, last_edited_time
    )
    VALUES (
      @notion_id, @item_name, @brand, @model, @item_id, @room, @location, @type, @condition,
      @in_use, @deductible, @purchase_date, @warranty_expires, @replacement_value, @resale_value,
      @purchase_transaction_id, @purchased_from_id, @purchased_from_name, @last_edited_time
    )
  `).run({
    notion_id: id,
    item_name: overrides.item_name ?? "Test Item",
    brand: overrides.brand ?? null,
    model: overrides.model ?? null,
    item_id: overrides.item_id ?? null,
    room: overrides.room ?? null,
    location: overrides.location ?? null,
    type: overrides.type ?? null,
    condition: overrides.condition ?? null,
    in_use: overrides.in_use ?? 0,
    deductible: overrides.deductible ?? 0,
    purchase_date: overrides.purchase_date ?? null,
    warranty_expires: overrides.warranty_expires ?? null,
    replacement_value: overrides.replacement_value ?? null,
    resale_value: overrides.resale_value ?? null,
    purchase_transaction_id: overrides.purchase_transaction_id ?? null,
    purchased_from_id: overrides.purchased_from_id ?? null,
    purchased_from_name: overrides.purchased_from_name ?? null,
    last_edited_time: overrides.last_edited_time ?? "2025-01-01T00:00:00.000Z",
  });
  return id;
}

/**
 * Setup helper for test suites. Call in beforeEach/afterEach.
 * Returns the test DB and an Express app wired to it.
 */
export function setupTestContext() {
  let db: Database;

  function setup(): { db: Database; app: ReturnType<typeof createApp> } {
    process.env["FINANCE_API_KEY"] = TEST_API_KEY;
    db = createTestDb();
    setDb(db);
    return { db, app: createApp() };
  }

  function teardown() {
    closeDb();
  }

  return { setup, teardown };
}
