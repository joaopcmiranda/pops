/** Flattened transaction row for SQLite (mirrors Notion Balance Sheet). */
export interface TransactionRow {
  notionId: string;
  description: string;
  account: string;
  amount: number;
  date: string;
  type: string;
  tags: string;
  entityId: string | null;
  entityName: string | null;
  location: string | null;
  country: string | null;
  relatedTransactionId: string | null;
  notes: string | null;
  lastEditedTime: string;
}
