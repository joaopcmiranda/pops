/** Flattened budget row for SQLite (mirrors Notion Budget database). */
export interface BudgetRow {
  notionId: string;
  category: string;
  period: string | null;
  amount: number | null;
  active: boolean;
  notes: string | null;
  lastEditedTime: string;
}
