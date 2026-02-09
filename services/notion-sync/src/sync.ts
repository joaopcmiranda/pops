import type { Client } from "@notionhq/client";
import type Database from "better-sqlite3";
import { NOTION_DB } from "./types.js";
import { fetchDatabasePages } from "./notion-client.js";
import {
  upsertTransactions,
  upsertEntities,
  upsertInventory,
  saveCursor,
  loadCursor,
} from "./sqlite-writer.js";

/**
 * Run a full incremental sync from Notion to SQLite.
 * Syncs Balance Sheet, Entities, and Home Inventory databases.
 */
export async function runSync(
  notion: Client,
  db: Database.Database
): Promise<void> {
  console.log("[sync] Starting incremental sync...");

  await syncEntities(notion, db);
  await syncBalanceSheet(notion, db);
  await syncInventory(notion, db);

  console.log("[sync] Sync complete.");
}

async function syncBalanceSheet(
  notion: Client,
  db: Database.Database
): Promise<void> {
  const dbId = NOTION_DB.BALANCE_SHEET;
  const since = loadCursor(db, dbId);
  console.log(
    `[sync] Balance Sheet: fetching pages${since ? ` since ${since}` : " (full sync)"}...`
  );

  const pages = await fetchDatabasePages(notion, dbId, since);
  console.log(`[sync] Balance Sheet: ${pages.length} pages to process.`);

  if (pages.length === 0) return;

  // TODO: Map Notion page properties to TransactionRow objects
  // This requires reading each page's properties and flattening them.
  // Implementation depends on the exact Notion property types.

  const lastPage = pages[pages.length - 1];
  if (lastPage) {
    saveCursor(db, {
      databaseId: dbId,
      lastEditedTime: lastPage.last_edited_time,
    });
  }
}

async function syncEntities(
  notion: Client,
  db: Database.Database
): Promise<void> {
  const dbId = NOTION_DB.ENTITIES;
  const since = loadCursor(db, dbId);
  console.log(
    `[sync] Entities: fetching pages${since ? ` since ${since}` : " (full sync)"}...`
  );

  const pages = await fetchDatabasePages(notion, dbId, since);
  console.log(`[sync] Entities: ${pages.length} pages to process.`);

  if (pages.length === 0) return;

  // TODO: Map Notion page properties to EntityRow objects

  const lastPage = pages[pages.length - 1];
  if (lastPage) {
    saveCursor(db, {
      databaseId: dbId,
      lastEditedTime: lastPage.last_edited_time,
    });
  }
}

async function syncInventory(
  notion: Client,
  db: Database.Database
): Promise<void> {
  const dbId = NOTION_DB.HOME_INVENTORY;
  const since = loadCursor(db, dbId);
  console.log(
    `[sync] Home Inventory: fetching pages${since ? ` since ${since}` : " (full sync)"}...`
  );

  const pages = await fetchDatabasePages(notion, dbId, since);
  console.log(`[sync] Home Inventory: ${pages.length} pages to process.`);

  if (pages.length === 0) return;

  // TODO: Map Notion page properties to InventoryRow objects

  const lastPage = pages[pages.length - 1];
  if (lastPage) {
    saveCursor(db, {
      databaseId: dbId,
      lastEditedTime: lastPage.last_edited_time,
    });
  }
}
