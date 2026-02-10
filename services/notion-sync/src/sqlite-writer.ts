import type Database from "better-sqlite3";
import type {
  TransactionRow,
  EntityRow,
  InventoryRow,
  BudgetRow,
  WishListRow,
  SyncCursor,
} from "./types.js";

/** Upsert a batch of transaction rows into SQLite. */
export function upsertTransactions(
  db: Database.Database,
  rows: TransactionRow[]
): void {
  const stmt = db.prepare(`
    INSERT INTO transactions (
      notion_id, description, account, amount, date, type, categories,
      entity_id, entity_name, location, country, online, novated_lease,
      tax_return, related_transaction_id, notes, last_edited_time
    ) VALUES (
      @notionId, @description, @account, @amount, @date, @type, @categories,
      @entityId, @entityName, @location, @country, @online, @novatedLease,
      @taxReturn, @relatedTransactionId, @notes, @lastEditedTime
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
      notes = excluded.notes,
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
    INSERT INTO entities (
      notion_id, name, type, abn, aliases,
      default_transaction_type, default_category, notes, last_edited_time
    ) VALUES (
      @notionId, @name, @type, @abn, @aliases,
      @defaultTransactionType, @defaultCategory, @notes, @lastEditedTime
    ) ON CONFLICT(notion_id) DO UPDATE SET
      name = excluded.name,
      type = excluded.type,
      abn = excluded.abn,
      aliases = excluded.aliases,
      default_transaction_type = excluded.default_transaction_type,
      default_category = excluded.default_category,
      notes = excluded.notes,
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
