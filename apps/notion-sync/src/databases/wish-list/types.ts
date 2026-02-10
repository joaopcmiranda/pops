/** Flattened wish list row for SQLite (mirrors Notion Wish List database). */
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
