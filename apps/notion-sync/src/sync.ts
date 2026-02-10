import type { Client } from '@notionhq/client';
import type Database from 'better-sqlite3';
import type { NotionPage } from './types.js';
import { NOTION_DB } from './types.js';
import { fetchDatabasePages } from './notion-client.js';
import { saveCursor, loadCursor } from './cursor.js';
import { mapTransaction, upsertTransactions } from './databases/transactions/index.js';
import { mapEntity, upsertEntities, buildEntityLookup } from './databases/entities/index.js';
import { mapInventoryItem, upsertInventory } from './databases/inventory/index.js';
import { mapBudget, upsertBudgets } from './databases/budgets/index.js';
import { mapWishListItem, upsertWishList } from './databases/wish-list/index.js';

/**
 * Run a full incremental sync from Notion to SQLite.
 * Entities are synced first — transactions and inventory need the entity
 * lookup table to resolve relation IDs to names.
 */
export async function runSync(notion: Client, db: Database.Database): Promise<void> {
  console.log('[sync] Starting incremental sync...');

  await syncEntities(notion, db);
  await syncBalanceSheet(notion, db);
  await syncInventory(notion, db);
  await syncBudgets(notion, db);
  await syncWishList(notion, db);

  console.log('[sync] Sync complete.');
}

// ─── Generic sync pipeline ──────────────────────────────────

/** Fetch pages from Notion, map to rows, upsert into SQLite, save cursor. */
async function syncDatabase<T>(
  notion: Client,
  db: Database.Database,
  label: string,
  dbId: string,
  mapFn: (pages: NotionPage[]) => T[],
  upsertFn: (db: Database.Database, rows: T[]) => void
): Promise<void> {
  const since = loadCursor(db, dbId);
  console.log(`[sync] ${label}: fetching pages${since ? ` since ${since}` : ' (full sync)'}...`);

  const pages = await fetchDatabasePages(notion, dbId, since);
  console.log(`[sync] ${label}: ${pages.length} pages to process.`);

  if (pages.length === 0) return;

  const rows = mapFn(pages);
  upsertFn(db, rows);
  console.log(`[sync] ${label}: upserted ${rows.length} rows.`);

  const lastPage = pages[pages.length - 1];
  if (lastPage) {
    saveCursor(db, { databaseId: dbId, lastEditedTime: lastPage.last_edited_time });
  }
}

// ─── Per-database sync orchestrators ────────────────────────

async function syncEntities(notion: Client, db: Database.Database): Promise<void> {
  await syncDatabase(
    notion,
    db,
    'Entities',
    NOTION_DB.ENTITIES,
    (pages) => pages.map(mapEntity),
    upsertEntities
  );
}

async function syncBalanceSheet(notion: Client, db: Database.Database): Promise<void> {
  const entityLookup = buildEntityLookup(db);
  await syncDatabase(
    notion,
    db,
    'Balance Sheet',
    NOTION_DB.BALANCE_SHEET,
    (pages) => pages.map((p) => mapTransaction(p, entityLookup)),
    upsertTransactions
  );
}

async function syncInventory(notion: Client, db: Database.Database): Promise<void> {
  const entityLookup = buildEntityLookup(db);
  await syncDatabase(
    notion,
    db,
    'Home Inventory',
    NOTION_DB.HOME_INVENTORY,
    (pages) => pages.map((p) => mapInventoryItem(p, entityLookup)),
    upsertInventory
  );
}

async function syncBudgets(notion: Client, db: Database.Database): Promise<void> {
  await syncDatabase(
    notion,
    db,
    'Budgets',
    NOTION_DB.BUDGET,
    (pages) => pages.map(mapBudget),
    upsertBudgets
  );
}

async function syncWishList(notion: Client, db: Database.Database): Promise<void> {
  await syncDatabase(
    notion,
    db,
    'Wish List',
    NOTION_DB.WISH_LIST,
    (pages) => pages.map(mapWishListItem),
    upsertWishList
  );
}

/*
 * Re-export mappers so tests and other consumers can import from sync.ts
 * for backwards compatibility. The canonical location is each database module.
 */
export { mapTransaction } from './databases/transactions/mapper.js';
export { mapEntity } from './databases/entities/mapper.js';
export { mapInventoryItem } from './databases/inventory/mapper.js';
export { mapBudget } from './databases/budgets/mapper.js';
export { mapWishListItem } from './databases/wish-list/mapper.js';
