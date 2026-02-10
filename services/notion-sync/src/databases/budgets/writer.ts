import type Database from "better-sqlite3";
import type { BudgetRow } from "./types.js";

/** Upsert a batch of budget rows into SQLite. */
export function upsertBudgets(
  db: Database.Database,
  rows: BudgetRow[]
): void {
  const stmt = db.prepare(`
    INSERT INTO budgets (
      notion_id, category, period, amount, active, notes, last_edited_time
    ) VALUES (
      @notionId, @category, @period, @amount, @active, @notes, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      category = excluded.category,
      period = excluded.period,
      amount = excluded.amount,
      active = excluded.active,
      notes = excluded.notes,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: BudgetRow[]) => {
    for (const row of items) {
      stmt.run({
        ...row,
        active: row.active ? 1 : 0,
      });
    }
  });

  upsertMany(rows);
}
