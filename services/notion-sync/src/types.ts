import type { Client } from "@notionhq/client";

/** Notion database IDs for POPS */
export const NOTION_DB = {
  BALANCE_SHEET: "9ad27001-d723-4a3f-8b3a-cf19cf715eec",
  ENTITIES: "3062f475-7765-406e-bde5-117f3e0a473f",
  HOME_INVENTORY: "542bb48c-740c-4848-93ad-eb91c86a612e",
  BUDGET: "8fdf1583-4b0c-4314-9377-b1cee4cc9e63",
  WISH_LIST: "9e13e606-92d1-4316-aad4-f837a9e8cb9f",
} as const;

/** Extract the page type from the Notion client's query response */
type QueryResponse = Awaited<ReturnType<Client["databases"]["query"]>>;
type QueryResult = QueryResponse["results"][number];

/**
 * A full Notion page object from a database query.
 * The `object: "page"` discriminant excludes DatabaseObjectResponse (which
 * also has `properties` but with schema-config shapes instead of values).
 */
export type NotionPage = Extract<
  QueryResult,
  { object: "page"; properties: unknown; last_edited_time: string }
>;

/** Sync state persisted between runs */
export interface SyncCursor {
  databaseId: string;
  lastEditedTime: string;
}

/*
 * Per-database row types are co-located with their database modules:
 *   - TransactionRow  → ./databases/transactions/types.js
 *   - EntityRow       → ./databases/entities/types.js
 *   - InventoryRow    → ./databases/inventory/types.js
 *   - BudgetRow       → ./databases/budgets/types.js
 *   - WishListRow     → ./databases/wish-list/types.js
 *
 * Re-exported here for convenience so existing consumers can keep
 * importing from "./types.js" if they prefer a single entry point.
 */
export type { TransactionRow } from "./databases/transactions/types.js";
export type { EntityRow } from "./databases/entities/types.js";
export type { InventoryRow } from "./databases/inventory/types.js";
export type { BudgetRow } from "./databases/budgets/types.js";
export type { WishListRow } from "./databases/wish-list/types.js";
