/**
 * Entity service — CRUD operations against the SQLite entities table.
 * All SQL uses parameterized queries (no string interpolation).
 */
import { randomUUID } from "node:crypto";
import { getDb } from "../../db.js";
import { NotFoundError, ConflictError } from "../../shared/errors.js";
import type { EntityRow, CreateEntityInput, UpdateEntityInput } from "./types.js";

/** Count + rows for a paginated list. */
export interface EntityListResult {
  rows: EntityRow[];
  total: number;
}

/** List entities with optional search and type filters. */
export function listEntities(
  search: string | undefined,
  type: string | undefined,
  limit: number,
  offset: number
): EntityListResult {
  const db = getDb();
  const conditions: string[] = [];
  const params: Record<string, string | number> = {};

  if (search) {
    conditions.push("name LIKE @search");
    params["search"] = `%${search}%`;
  }
  if (type) {
    conditions.push("type = @type");
    params["type"] = type;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(`SELECT * FROM entities ${where} ORDER BY name LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset }) as EntityRow[];

  const countRow = db.prepare(`SELECT COUNT(*) as total FROM entities ${where}`).get(params) as {
    total: number;
  };

  return { rows, total: countRow.total };
}

/** Get a single entity by notion_id. Throws NotFoundError if missing. */
export function getEntity(id: string): EntityRow {
  const db = getDb();
  const row = db.prepare("SELECT * FROM entities WHERE notion_id = ?").get(id) as
    | EntityRow
    | undefined;

  if (!row) throw new NotFoundError("Entity", id);
  return row;
}

/** Create a new entity. Returns the created row. */
export function createEntity(input: CreateEntityInput): EntityRow {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();

  const existing = db.prepare("SELECT notion_id FROM entities WHERE name = ?").get(input.name) as
    | { notion_id: string }
    | undefined;
  if (existing) {
    throw new ConflictError(`Entity with name '${input.name}' already exists`);
  }

  db.prepare(
    `
    INSERT INTO entities (notion_id, name, type, abn, aliases, default_transaction_type, default_category, notes, last_edited_time)
    VALUES (@notionId, @name, @type, @abn, @aliases, @defaultTransactionType, @defaultCategory, @notes, @lastEditedTime)
  `
  ).run({
    notionId: id,
    name: input.name,
    type: input.type ?? null,
    abn: input.abn ?? null,
    aliases: input.aliases?.length ? input.aliases.join(", ") : null,
    defaultTransactionType: input.defaultTransactionType ?? null,
    defaultCategory: input.defaultCategory ?? null,
    notes: input.notes ?? null,
    lastEditedTime: now,
  });

  return getEntity(id);
}

/** Update an existing entity. Returns the updated row. */
export function updateEntity(id: string, input: UpdateEntityInput): EntityRow {
  const db = getDb();

  // Verify it exists first
  getEntity(id);

  const fields: string[] = [];
  const params: Record<string, string | number | null> = { notionId: id };

  if (input.name !== undefined) {
    fields.push("name = @name");
    params["name"] = input.name;
  }
  if (input.type !== undefined) {
    fields.push("type = @type");
    params["type"] = input.type ?? null;
  }
  if (input.abn !== undefined) {
    fields.push("abn = @abn");
    params["abn"] = input.abn ?? null;
  }
  if (input.aliases !== undefined) {
    fields.push("aliases = @aliases");
    params["aliases"] = input.aliases.length ? input.aliases.join(", ") : null;
  }
  if (input.defaultTransactionType !== undefined) {
    fields.push("default_transaction_type = @defaultTransactionType");
    params["defaultTransactionType"] = input.defaultTransactionType ?? null;
  }
  if (input.defaultCategory !== undefined) {
    fields.push("default_category = @defaultCategory");
    params["defaultCategory"] = input.defaultCategory ?? null;
  }
  if (input.notes !== undefined) {
    fields.push("notes = @notes");
    params["notes"] = input.notes ?? null;
  }

  if (fields.length > 0) {
    fields.push("last_edited_time = @lastEditedTime");
    params["lastEditedTime"] = new Date().toISOString();

    db.prepare(`UPDATE entities SET ${fields.join(", ")} WHERE notion_id = @notionId`).run(params);
  }

  return getEntity(id);
}

/** Delete an entity by ID. Throws NotFoundError if missing. */
export function deleteEntity(id: string): void {
  const db = getDb();
  const result = db.prepare("DELETE FROM entities WHERE notion_id = ?").run(id);
  if (result.changes === 0) throw new NotFoundError("Entity", id);
}
