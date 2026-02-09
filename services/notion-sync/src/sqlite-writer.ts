import type Database from "better-sqlite3";
import type { TransactionRow, EntityRow, InventoryRow, SyncCursor } from "./types.js";

/** Upsert a batch of transaction rows into SQLite. */
export function upsertTransactions(
  db: Database.Database,
  rows: TransactionRow[]
): void {
  const stmt = db.prepare(`
    INSERT INTO transactions (
      notion_id, description, account, amount, date, type, categories,
      entity_id, entity_name, location, country, online, novated_lease,
      tax_return, related_transaction_id, last_edited_time
    ) VALUES (
      @notionId, @description, @account, @amount, @date, @type, @categories,
      @entityId, @entityName, @location, @country, @online, @novatedLease,
      @taxReturn, @relatedTransactionId, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      description = excluded.description,
      account = excluded.account,
      amount = excluded.amount,
      date = excluded.date,
      type = excluded.type,
      categories = excluded.categories,
      entity_id = excluded.entity_id,
      entity_name = excluded.entity_name,
      location = excluded.location,
      country = excluded.country,
      online = excluded.online,
      novated_lease = excluded.novated_lease,
      tax_return = excluded.tax_return,
      related_transaction_id = excluded.related_transaction_id,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: TransactionRow[]) => {
    for (const row of items) {
      stmt.run({
        ...row,
        online: row.online ? 1 : 0,
        novatedLease: row.novatedLease ? 1 : 0,
        taxReturn: row.taxReturn ? 1 : 0,
      });
    }
  });

  upsertMany(rows);
}

/** Upsert a batch of entity rows into SQLite. */
export function upsertEntities(
  db: Database.Database,
  rows: EntityRow[]
): void {
  const stmt = db.prepare(`
    INSERT INTO entities (notion_id, name, last_edited_time)
    VALUES (@notionId, @name, @lastEditedTime)
    ON CONFLICT(notion_id) DO UPDATE SET
      name = excluded.name,
      last_edited_time = excluded.last_edited_time
  `);

  const upsertMany = db.transaction((items: EntityRow[]) => {
    for (const row of items) {
      stmt.run(row);
    }
  });

  upsertMany(rows);
}

/** Upsert a batch of home inventory rows into SQLite. */
export function upsertInventory(
  db: Database.Database,
  rows: InventoryRow[]
): void {
  const stmt = db.prepare(`
    INSERT INTO home_inventory (
      notion_id, item_name, brand, model, item_id, room, location, type,
      condition, in_use, deductible, purchase_date, warranty_expires,
      replacement_value, resale_value, last_edited_time
    ) VALUES (
      @notionId, @itemName, @brand, @model, @itemId, @room, @location, @type,
      @condition, @inUse, @deductible, @purchaseDate, @warrantyExpires,
      @replacementValue, @resaleValue, @lastEditedTime
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

/** Save a sync cursor so the next run can resume incrementally. */
export function saveCursor(
  db: Database.Database,
  cursor: SyncCursor
): void {
  db.prepare(`
    INSERT INTO sync_cursors (database_id, last_edited_time)
    VALUES (@databaseId, @lastEditedTime)
    ON CONFLICT(database_id) DO UPDATE SET
      last_edited_time = excluded.last_edited_time
  `).run(cursor);
}

/** Load the last sync cursor for a database. */
export function loadCursor(
  db: Database.Database,
  databaseId: string
): string | undefined {
  const row = db
    .prepare("SELECT last_edited_time FROM sync_cursors WHERE database_id = ?")
    .get(databaseId) as { last_edited_time: string } | undefined;
  return row?.last_edited_time;
}
