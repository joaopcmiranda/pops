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

/** Flattened transaction row for SQLite */
export interface TransactionRow {
  notionId: string;
  description: string;
  account: string;
  amount: number;
  date: string;
  type: string;
  categories: string;
  entityId: string | null;
  entityName: string | null;
  location: string | null;
  country: string | null;
  online: boolean;
  novatedLease: boolean;
  taxReturn: boolean;
  relatedTransactionId: string | null;
  notes: string | null;
  lastEditedTime: string;
}

/** Flattened entity row for SQLite */
export interface EntityRow {
  notionId: string;
  name: string;
  type: string | null;
  abn: string | null;
  aliases: string | null;
  defaultTransactionType: string | null;
  defaultCategory: string | null;
  notes: string | null;
  lastEditedTime: string;
}

/** Flattened home inventory row for SQLite */
export interface InventoryRow {
  notionId: string;
  itemName: string;
  brand: string | null;
  model: string | null;
  itemId: string | null;
  room: string | null;
  location: string | null;
  type: string | null;
  condition: string | null;
  inUse: boolean;
  deductible: boolean;
  purchaseDate: string | null;
  warrantyExpires: string | null;
  replacementValue: number | null;
  resaleValue: number | null;
  purchaseTransactionId: string | null;
  purchasedFromId: string | null;
  purchasedFromName: string | null;
  lastEditedTime: string;
}

/** Flattened budget row for SQLite */
export interface BudgetRow {
  notionId: string;
  category: string;
  period: string | null;
  amount: number | null;
  active: boolean;
  notes: string | null;
  lastEditedTime: string;
}

/** Flattened wish list row for SQLite */
export interface WishListRow {
  notionId: string;
  item: string;
  targetAmount: number | null;
  saved: number | null;
  priority: string | null;
  url: string | null;
  notes: string | null;
  lastEditedTime: string;
}
