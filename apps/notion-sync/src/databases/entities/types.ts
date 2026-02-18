/** Flattened entity row for SQLite (mirrors Notion Entities database). */
export interface EntityRow {
  notionId: string;
  name: string;
  type: string | null;
  abn: string | null;
  aliases: string | null;
  defaultTransactionType: string | null;
  defaultTags: string | null;
  notes: string | null;
  lastEditedTime: string;
}
