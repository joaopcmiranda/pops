import type Database from 'better-sqlite3';

/**
 * Build a map of entity Notion page ID to name from the entities table.
 * Used by transactions and inventory mappers to resolve entity relations.
 */
export function buildEntityLookup(db: Database.Database): Map<string, string> {
  const rows = db.prepare('SELECT notion_id, name FROM entities').all() as Array<{
    notion_id: string;
    name: string;
  }>;
  return new Map(rows.map((r) => [r.notion_id, r.name]));
}
