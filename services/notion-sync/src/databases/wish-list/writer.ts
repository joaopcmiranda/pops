import type Database from "better-sqlite3";
import type { WishListRow } from "./types.js";

/** Upsert a batch of wish list rows into SQLite. */
export function upsertWishList(
  db: Database.Database,
  rows: WishListRow[]
): void {
  const stmt = db.prepare(`
    INSERT INTO wish_list (
      notion_id, item, target_amount, saved, priority, url, notes, last_edited_time
    ) VALUES (
      @notionId, @item, @targetAmount, @saved, @priority, @url, @notes, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      item = excluded.item,
      target_amount = excluded.target_amount,
      saved = excluded.saved,
      priority = excluded.priority,
      url = excluded.url,
      notes = excluded.notes,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: WishListRow[]) => {
    for (const row of items) {
      stmt.run(row);
    }
  });

  upsertMany(rows);
}
