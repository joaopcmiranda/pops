import type { Client } from "@notionhq/client";
import type Database from "better-sqlite3";
import type { NotionPage, TransactionRow, EntityRow, InventoryRow, BudgetRow, WishListRow } from "./types.js";
import { NOTION_DB } from "./types.js";
import { fetchDatabasePages } from "./notion-client.js";
import {
  upsertTransactions,
  upsertEntities,
  upsertInventory,
  upsertBudgets,
  upsertWishList,
  saveCursor,
  loadCursor,
} from "./sqlite-writer.js";
import {
  getTitle,
  getRichText,
  getNumber,
  getSelect,
  getMultiSelect,
  getDate,
  getCheckbox,
  getRelationIds,
  getUrl,
} from "./property-mapper.js";

/**
 * Run a full incremental sync from Notion to SQLite.
 * Entities synced first (needed for name resolution in transactions and inventory).
 */
export async function runSync(
  notion: Client,
  db: Database.Database
): Promise<void> {
  console.log("[sync] Starting incremental sync...");

  await syncEntities(notion, db);
  await syncBalanceSheet(notion, db);
  await syncInventory(notion, db);
  await syncBudgets(notion, db);
  await syncWishList(notion, db);

  console.log("[sync] Sync complete.");
}

// ─── Entity lookup ──────────────────────────────────────────

/** Build a map of entity Notion page ID → name from the entities table. */
function buildEntityLookup(db: Database.Database): Map<string, string> {
  const rows = db
    .prepare("SELECT notion_id, name FROM entities")
    .all() as Array<{ notion_id: string; name: string }>;
  return new Map(rows.map((r) => [r.notion_id, r.name]));
}

// ─── Page → Row mappers ─────────────────────────────────────

/** Map a Notion Balance Sheet page to a TransactionRow. */
export function mapTransaction(
  page: NotionPage,
  entityLookup: Map<string, string>
): TransactionRow {
  const props = page.properties;

  const entityIds = getRelationIds(props, "Entity");
  const firstEntityId = entityIds[0] ?? null;

  const relatedIds = getRelationIds(props, "Related Transaction");
  const firstRelatedId = relatedIds[0] ?? null;

  return {
    notionId: page.id,
    description: getTitle(props, "Description"),
    account: getSelect(props, "Account") ?? "",
    amount: getNumber(props, "Amount") ?? 0,
    date: getDate(props, "Date") ?? "",
    type: getSelect(props, "Type") ?? "",
    categories: JSON.stringify(getMultiSelect(props, "Category")),
    entityId: firstEntityId,
    entityName: firstEntityId ? (entityLookup.get(firstEntityId) ?? null) : null,
    location: getSelect(props, "Location"),
    country: getSelect(props, "Country"),
    online: getCheckbox(props, "Online"),
    novatedLease: getCheckbox(props, "Novated Lease"),
    taxReturn: getCheckbox(props, "Tax Return"),
    relatedTransactionId: firstRelatedId,
    notes: getRichText(props, "Notes"),
    lastEditedTime: page.last_edited_time,
  };
}

/** Map a Notion Entities page to an EntityRow. */
export function mapEntity(page: NotionPage): EntityRow {
  const props = page.properties;
  const defaultCategories = getMultiSelect(props, "Default Category");

  return {
    notionId: page.id,
    name: getTitle(props, "Name"),
    type: getSelect(props, "Type"),
    abn: getRichText(props, "ABN"),
    aliases: getRichText(props, "Aliases"),
    defaultTransactionType: getSelect(props, "Default Transaction Type"),
    defaultCategory: defaultCategories.length > 0
      ? JSON.stringify(defaultCategories)
      : null,
    notes: getRichText(props, "Notes"),
    lastEditedTime: page.last_edited_time,
  };
}

/** Map a Notion Home Inventory page to an InventoryRow. */
export function mapInventoryItem(
  page: NotionPage,
  entityLookup: Map<string, string>
): InventoryRow {
  const props = page.properties;

  const purchaseTxIds = getRelationIds(props, "Purchase Transaction");
  const purchasedFromIds = getRelationIds(props, "Purchased From");
  const firstPurchasedFromId = purchasedFromIds[0] ?? null;

  return {
    notionId: page.id,
    itemName: getTitle(props, "Item Name"),
    brand: getRichText(props, "Brand/Manufacturer"),
    model: getRichText(props, "Model"),
    itemId: getRichText(props, "ID"),
    room: getSelect(props, "Room"),
    location: getSelect(props, "Location"),
    type: getSelect(props, "Type"),
    condition: getSelect(props, "Condition"),
    inUse: getCheckbox(props, "In-use"),
    deductible: getCheckbox(props, "Deductible"),
    purchaseDate: getDate(props, "Purchase Date"),
    warrantyExpires: getDate(props, "Warranty Expires"),
    replacementValue: getNumber(props, "Est. Replacement Value"),
    resaleValue: getNumber(props, "Est. Resale Value"),
    purchaseTransactionId: purchaseTxIds[0] ?? null,
    purchasedFromId: firstPurchasedFromId,
    purchasedFromName: firstPurchasedFromId
      ? (entityLookup.get(firstPurchasedFromId) ?? null)
      : null,
    lastEditedTime: page.last_edited_time,
  };
}

/** Map a Notion Budget page to a BudgetRow. */
export function mapBudget(page: NotionPage): BudgetRow {
  const props = page.properties;

  return {
    notionId: page.id,
    category: getTitle(props, "Category"),
    period: getSelect(props, "Period"),
    amount: getNumber(props, "Amount"),
    active: getCheckbox(props, "Active"),
    notes: getRichText(props, "Notes"),
    lastEditedTime: page.last_edited_time,
  };
}

/** Map a Notion Wish List page to a WishListRow. */
export function mapWishListItem(page: NotionPage): WishListRow {
  const props = page.properties;

  return {
    notionId: page.id,
    item: getTitle(props, "Item"),
    targetAmount: getNumber(props, "Target Amount"),
    saved: getNumber(props, "Saved"),
    priority: getSelect(props, "Priority"),
    url: getUrl(props, "URL"),
    notes: getRichText(props, "Notes"),
    lastEditedTime: page.last_edited_time,
  };
}

// ─── Sync orchestrators ─────────────────────────────────────

/** Generic sync: fetch pages, map to rows, upsert, save cursor. */
async function syncDatabase<T>(
  notion: Client,
  db: Database.Database,
  label: string,
  dbId: string,
  mapFn: (pages: NotionPage[]) => T[],
  upsertFn: (db: Database.Database, rows: T[]) => void
): Promise<void> {
  const since = loadCursor(db, dbId);
  console.log(`[sync] ${label}: fetching pages${since ? ` since ${since}` : " (full sync)"}...`);

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

async function syncEntities(notion: Client, db: Database.Database): Promise<void> {
  await syncDatabase(notion, db, "Entities", NOTION_DB.ENTITIES,
    (pages) => pages.map(mapEntity), upsertEntities);
}

async function syncBalanceSheet(notion: Client, db: Database.Database): Promise<void> {
  const entityLookup = buildEntityLookup(db);
  await syncDatabase(notion, db, "Balance Sheet", NOTION_DB.BALANCE_SHEET,
    (pages) => pages.map((p) => mapTransaction(p, entityLookup)), upsertTransactions);
}

async function syncInventory(notion: Client, db: Database.Database): Promise<void> {
  const entityLookup = buildEntityLookup(db);
  await syncDatabase(notion, db, "Home Inventory", NOTION_DB.HOME_INVENTORY,
    (pages) => pages.map((p) => mapInventoryItem(p, entityLookup)), upsertInventory);
}

async function syncBudgets(notion: Client, db: Database.Database): Promise<void> {
  await syncDatabase(notion, db, "Budgets", NOTION_DB.BUDGET,
    (pages) => pages.map(mapBudget), upsertBudgets);
}

async function syncWishList(notion: Client, db: Database.Database): Promise<void> {
  await syncDatabase(notion, db, "Wish List", NOTION_DB.WISH_LIST,
    (pages) => pages.map(mapWishListItem), upsertWishList);
}
