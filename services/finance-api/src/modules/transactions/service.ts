/**
 * Transaction service — CRUD operations against the SQLite transactions table.
 * All SQL uses parameterized queries (no string interpolation).
 */
import { randomUUID } from "node:crypto";
import { getDb } from "../../db.js";
import { NotFoundError } from "../../shared/errors.js";
import type {
  TransactionRow,
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilters,
} from "./types.js";

/** Count + rows for a paginated list. */
export interface TransactionListResult {
  rows: TransactionRow[];
  total: number;
}

/** List transactions with optional filters. */
export function listTransactions(
  filters: TransactionFilters,
  limit: number,
  offset: number
): TransactionListResult {
  const db = getDb();
  const conditions: string[] = [];
  const params: Record<string, string | number> = {};

  if (filters.search) {
    conditions.push("description LIKE @search");
    params["search"] = `%${filters.search}%`;
  }
  if (filters.account) {
    conditions.push("account = @account");
    params["account"] = filters.account;
  }
  if (filters.startDate) {
    conditions.push("date >= @startDate");
    params["startDate"] = filters.startDate;
  }
  if (filters.endDate) {
    conditions.push("date <= @endDate");
    params["endDate"] = filters.endDate;
  }
  if (filters.category) {
    conditions.push("categories LIKE @category");
    params["category"] = `%${filters.category}%`;
  }
  if (filters.entityId) {
    conditions.push("entity_id = @entityId");
    params["entityId"] = filters.entityId;
  }
  if (filters.type) {
    conditions.push("type = @type");
    params["type"] = filters.type;
  }
  if (filters.online !== undefined) {
    conditions.push("online = @online");
    params["online"] = filters.online ? 1 : 0;
  }
  if (filters.novatedLease !== undefined) {
    conditions.push("novated_lease = @novatedLease");
    params["novatedLease"] = filters.novatedLease ? 1 : 0;
  }
  if (filters.taxReturn !== undefined) {
    conditions.push("tax_return = @taxReturn");
    params["taxReturn"] = filters.taxReturn ? 1 : 0;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(`SELECT * FROM transactions ${where} ORDER BY date DESC LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset }) as TransactionRow[];

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM transactions ${where}`)
    .get(params) as { total: number };

  return { rows, total: countRow.total };
}

/** Get a single transaction by notion_id. Throws NotFoundError if missing. */
export function getTransaction(id: string): TransactionRow {
  const db = getDb();
  const row = db.prepare("SELECT * FROM transactions WHERE notion_id = ?").get(id) as
    | TransactionRow
    | undefined;

  if (!row) throw new NotFoundError("Transaction", id);
  return row;
}

/** Create a new transaction. Returns the created row. */
export function createTransaction(input: CreateTransactionInput): TransactionRow {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `
    INSERT INTO transactions (
      notion_id, description, account, amount, date, type, categories,
      entity_id, entity_name, location, country, online, novated_lease,
      tax_return, related_transaction_id, notes, last_edited_time
    )
    VALUES (
      @notionId, @description, @account, @amount, @date, @type, @categories,
      @entityId, @entityName, @location, @country, @online, @novatedLease,
      @taxReturn, @relatedTransactionId, @notes, @lastEditedTime
    )
  `
  ).run({
    notionId: id,
    description: input.description,
    account: input.account,
    amount: input.amount,
    date: input.date,
    type: input.type,
    categories: input.categories?.length ? input.categories.join(", ") : "",
    entityId: input.entityId ?? null,
    entityName: input.entityName ?? null,
    location: input.location ?? null,
    country: input.country ?? null,
    online: input.online ? 1 : 0,
    novatedLease: input.novatedLease ? 1 : 0,
    taxReturn: input.taxReturn ? 1 : 0,
    relatedTransactionId: input.relatedTransactionId ?? null,
    notes: input.notes ?? null,
    lastEditedTime: now,
  });

  return getTransaction(id);
}

/** Update an existing transaction. Returns the updated row. */
export function updateTransaction(id: string, input: UpdateTransactionInput): TransactionRow {
  const db = getDb();

  // Verify it exists first
  getTransaction(id);

  const fields: string[] = [];
  const params: Record<string, string | number | null> = { notionId: id };

  if (input.description !== undefined) {
    fields.push("description = @description");
    params["description"] = input.description;
  }
  if (input.account !== undefined) {
    fields.push("account = @account");
    params["account"] = input.account;
  }
  if (input.amount !== undefined) {
    fields.push("amount = @amount");
    params["amount"] = input.amount;
  }
  if (input.date !== undefined) {
    fields.push("date = @date");
    params["date"] = input.date;
  }
  if (input.type !== undefined) {
    fields.push("type = @type");
    params["type"] = input.type ?? "";
  }
  if (input.categories !== undefined) {
    fields.push("categories = @categories");
    params["categories"] = input.categories.length ? input.categories.join(", ") : "";
  }
  if (input.entityId !== undefined) {
    fields.push("entity_id = @entityId");
    params["entityId"] = input.entityId ?? null;
  }
  if (input.entityName !== undefined) {
    fields.push("entity_name = @entityName");
    params["entityName"] = input.entityName ?? null;
  }
  if (input.location !== undefined) {
    fields.push("location = @location");
    params["location"] = input.location ?? null;
  }
  if (input.country !== undefined) {
    fields.push("country = @country");
    params["country"] = input.country ?? null;
  }
  if (input.online !== undefined) {
    fields.push("online = @online");
    params["online"] = input.online ? 1 : 0;
  }
  if (input.novatedLease !== undefined) {
    fields.push("novated_lease = @novatedLease");
    params["novatedLease"] = input.novatedLease ? 1 : 0;
  }
  if (input.taxReturn !== undefined) {
    fields.push("tax_return = @taxReturn");
    params["taxReturn"] = input.taxReturn ? 1 : 0;
  }
  if (input.relatedTransactionId !== undefined) {
    fields.push("related_transaction_id = @relatedTransactionId");
    params["relatedTransactionId"] = input.relatedTransactionId ?? null;
  }
  if (input.notes !== undefined) {
    fields.push("notes = @notes");
    params["notes"] = input.notes ?? null;
  }

  if (fields.length > 0) {
    fields.push("last_edited_time = @lastEditedTime");
    params["lastEditedTime"] = new Date().toISOString();

    db.prepare(`UPDATE transactions SET ${fields.join(", ")} WHERE notion_id = @notionId`).run(
      params
    );
  }

  return getTransaction(id);
}

/** Delete a transaction by ID. Throws NotFoundError if missing. */
export function deleteTransaction(id: string): void {
  const db = getDb();
  const result = db.prepare("DELETE FROM transactions WHERE notion_id = ?").run(id);
  if (result.changes === 0) throw new NotFoundError("Transaction", id);
}
