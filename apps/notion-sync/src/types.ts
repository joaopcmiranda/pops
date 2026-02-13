import type { Client } from '@notionhq/client';

/**
 * Notion database IDs for POPS.
 * Loaded from environment variables to avoid committing workspace-specific IDs.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable not set`);
  }
  return value;
}

/** Notion database IDs for POPS */
export const NOTION_DB = {
  BALANCE_SHEET: requireEnv('NOTION_BALANCE_SHEET_ID'),
  ENTITIES: requireEnv('NOTION_ENTITIES_DB_ID'),
  HOME_INVENTORY: requireEnv('NOTION_HOME_INVENTORY_ID'),
  BUDGET: requireEnv('NOTION_BUDGET_ID'),
  WISH_LIST: requireEnv('NOTION_WISH_LIST_ID'),
} as const;

/** Extract the page type from the Notion client's query response */
type QueryResponse = Awaited<ReturnType<Client['databases']['query']>>;
type QueryResult = QueryResponse['results'][number];

/**
 * A full Notion page object from a database query.
 * The `object: "page"` discriminant excludes DatabaseObjectResponse (which
 * also has `properties` but with schema-config shapes instead of values).
 */
export type NotionPage = Extract<
  QueryResult,
  { object: 'page'; properties: unknown; last_edited_time: string }
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
export type { TransactionRow } from './databases/transactions/types.js';
export type { EntityRow } from './databases/entities/types.js';
export type { InventoryRow } from './databases/inventory/types.js';
export type { BudgetRow } from './databases/budgets/types.js';
export type { WishListRow } from './databases/wish-list/types.js';
