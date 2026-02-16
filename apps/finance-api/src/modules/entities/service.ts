/**
 * Entity service — CRUD operations against Notion and SQLite.
 * Notion is the source of truth. All writes go to Notion first, then sync to SQLite.
 * All SQL uses parameterized queries (no string interpolation).
 */
import { getDb } from "../../db.js";
import { NotFoundError, ConflictError } from "../../shared/errors.js";
import { getNotionClient, getEntitiesDbId } from "../../shared/notion-client.js";
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

/**
 * Create a new entity. Returns the created row.
 *
 * Flow:
 * 1. Check for duplicates in SQLite
 * 2. Create page in Notion
 * 3. Insert into SQLite using Notion's response
 * 4. Return created row
 */
export async function createEntity(input: CreateEntityInput): Promise<EntityRow> {
  const db = getDb();

  const existing = db.prepare("SELECT notion_id FROM entities WHERE name = ?").get(input.name) as
    | { notion_id: string }
    | undefined;
  if (existing) {
    throw new ConflictError(`Entity with name '${input.name}' already exists`);
  }

  // 1. Create in Notion
  const notion = getNotionClient();
  const properties: { [key: string]: unknown } = {
    Name: {
      title: [{ text: { content: input.name } }],
    },
  };

  if (input.type) {
    properties.Type = { select: { name: input.type } };
  }
  if (input.abn) {
    properties.ABN = { rich_text: [{ text: { content: input.abn } }] };
  }
  if (input.aliases?.length) {
    properties.Aliases = { rich_text: [{ text: { content: input.aliases.join(", ") } }] };
  }
  if (input.defaultTransactionType) {
    properties["Default Transaction Type"] = { select: { name: input.defaultTransactionType } };
  }
  if (input.defaultCategory) {
    properties["Default Category"] = { multi_select: [{ name: input.defaultCategory }] };
  }
  if (input.notes) {
    properties.Notes = { rich_text: [{ text: { content: input.notes } }] };
  }

  const response = await notion.pages.create({
    parent: { database_id: getEntitiesDbId() },
    // @ts-expect-error - Dynamic property building conflicts with Notion's strict types, but properties are correct at runtime
    properties,
  });

  const now = new Date().toISOString();

  // 2. Insert into SQLite using Notion's ID
  db.prepare(
    `
    INSERT INTO entities (notion_id, name, type, abn, aliases, default_transaction_type, default_category, notes, last_edited_time)
    VALUES (@notionId, @name, @type, @abn, @aliases, @defaultTransactionType, @defaultCategory, @notes, @lastEditedTime)
  `
  ).run({
    notionId: response.id,
    name: input.name,
    type: input.type ?? null,
    abn: input.abn ?? null,
    aliases: input.aliases?.length ? input.aliases.join(", ") : null,
    defaultTransactionType: input.defaultTransactionType ?? null,
    defaultCategory: input.defaultCategory ?? null,
    notes: input.notes ?? null,
    lastEditedTime: now,
  });

  return getEntity(response.id);
}

/**
 * Update an existing entity. Returns the updated row.
 *
 * Flow:
 * 1. Verify entity exists in SQLite
 * 2. Update page in Notion
 * 3. Update SQLite with same data
 * 4. Return updated row
 */
export async function updateEntity(id: string, input: UpdateEntityInput): Promise<EntityRow> {
  const db = getDb();

  // Verify it exists first
  getEntity(id);

  // Build Notion properties update
  const properties: { [key: string]: unknown } = {};

  if (input.name !== undefined) {
    properties.Name = {
      title: [{ text: { content: input.name } }],
    };
  }
  if (input.type !== undefined) {
    properties.Type = input.type ? { select: { name: input.type } } : { select: null };
  }
  if (input.abn !== undefined) {
    properties.ABN = input.abn
      ? { rich_text: [{ text: { content: input.abn } }] }
      : { rich_text: [] };
  }
  if (input.aliases !== undefined) {
    properties.Aliases = input.aliases.length
      ? { rich_text: [{ text: { content: input.aliases.join(", ") } }] }
      : { rich_text: [] };
  }
  if (input.defaultTransactionType !== undefined) {
    properties["Default Transaction Type"] = input.defaultTransactionType
      ? { select: { name: input.defaultTransactionType } }
      : { select: null };
  }
  if (input.defaultCategory !== undefined) {
    properties["Default Category"] = input.defaultCategory
      ? { multi_select: [{ name: input.defaultCategory }] }
      : { multi_select: [] };
  }
  if (input.notes !== undefined) {
    properties.Notes = input.notes
      ? { rich_text: [{ text: { content: input.notes } }] }
      : { rich_text: [] };
  }

  // 1. Update in Notion
  const notion = getNotionClient();
  await notion.pages.update({
    page_id: id,
    // @ts-expect-error - Dynamic property building conflicts with Notion's strict types, but properties are correct at runtime
    properties,
  });

  // 2. Update in SQLite
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

/**
 * Delete an entity by ID. Throws NotFoundError if missing.
 *
 * Flow:
 * 1. Archive page in Notion
 * 2. Delete from SQLite
 */
export async function deleteEntity(id: string): Promise<void> {
  const db = getDb();

  // Verify it exists first
  getEntity(id);

  // 1. Archive in Notion
  const notion = getNotionClient();
  await notion.pages.update({
    page_id: id,
    archived: true,
  });

  // 2. Delete from SQLite
  const result = db.prepare("DELETE FROM entities WHERE notion_id = ?").run(id);
  if (result.changes === 0) throw new NotFoundError("Entity", id);
}
