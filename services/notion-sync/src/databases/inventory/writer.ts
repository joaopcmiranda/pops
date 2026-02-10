import type Database from 'better-sqlite3';
import type { InventoryRow } from './types.js';

/** Upsert a batch of home inventory rows into SQLite. */
export function upsertInventory(db: Database.Database, rows: InventoryRow[]): void {
  const stmt = db.prepare(`
    INSERT INTO home_inventory (
      notion_id, item_name, brand, model, item_id, room, location, type,
      condition, in_use, deductible, purchase_date, warranty_expires,
      replacement_value, resale_value,
      purchase_transaction_id, purchased_from_id, purchased_from_name,
      last_edited_time
    ) VALUES (
      @notionId, @itemName, @brand, @model, @itemId, @room, @location, @type,
      @condition, @inUse, @deductible, @purchaseDate, @warrantyExpires,
      @replacementValue, @resaleValue,
      @purchaseTransactionId, @purchasedFromId, @purchasedFromName,
      @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      item_name = excluded.item_name,
      brand = excluded.brand,
      model = excluded.model,
      item_id = excluded.item_id,
      room = excluded.room,
      location = excluded.location,
      type = excluded.type,
      condition = excluded.condition,
      in_use = excluded.in_use,
      deductible = excluded.deductible,
      purchase_date = excluded.purchase_date,
      warranty_expires = excluded.warranty_expires,
      replacement_value = excluded.replacement_value,
      resale_value = excluded.resale_value,
      purchase_transaction_id = excluded.purchase_transaction_id,
      purchased_from_id = excluded.purchased_from_id,
      purchased_from_name = excluded.purchased_from_name,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: InventoryRow[]) => {
    for (const row of items) {
      stmt.run({
        ...row,
        inUse: row.inUse ? 1 : 0,
        deductible: row.deductible ? 1 : 0,
      });
    }
  });

  upsertMany(rows);
}
