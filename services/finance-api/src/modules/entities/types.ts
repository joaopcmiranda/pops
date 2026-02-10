import { z } from "zod";
import type { EntityRow } from "@pops/db-types";

export type { EntityRow };

/** API response shape (camelCase). */
export interface Entity {
  notionId: string;
  name: string;
  type: string | null;
  abn: string | null;
  aliases: string[];
  defaultTransactionType: string | null;
  defaultCategory: string | null;
  notes: string | null;
  lastEditedTime: string;
}

/** Map a SQLite row to the API response shape. */
export function toEntity(row: EntityRow): Entity {
  return {
    notionId: row.notion_id,
    name: row.name,
    type: row.type,
    abn: row.abn,
    aliases: row.aliases
      ? row.aliases
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    defaultTransactionType: row.default_transaction_type,
    defaultCategory: row.default_category,
    notes: row.notes,
    lastEditedTime: row.last_edited_time,
  };
}

/** Zod schema for creating an entity. */
export const CreateEntitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().nullable().optional(),
  abn: z.string().nullable().optional(),
  aliases: z.array(z.string()).optional().default([]),
  defaultTransactionType: z.string().nullable().optional(),
  defaultCategory: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});
export type CreateEntityInput = z.infer<typeof CreateEntitySchema>;

/** Zod schema for updating an entity (all fields optional). */
export const UpdateEntitySchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),
  type: z.string().nullable().optional(),
  abn: z.string().nullable().optional(),
  aliases: z.array(z.string()).optional(),
  defaultTransactionType: z.string().nullable().optional(),
  defaultCategory: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});
export type UpdateEntityInput = z.infer<typeof UpdateEntitySchema>;

/** Zod schema for entity list query params. */
export const EntityQuerySchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  limit: z.coerce.number().positive().optional(),
  offset: z.coerce.number().nonnegative().optional(),
});
export type EntityQuery = z.infer<typeof EntityQuerySchema>;
