import { z } from "zod";
import type { TransactionRow } from "@pops/db-types";

export type { TransactionRow };

/** API response shape (camelCase). */
export interface Transaction {
  notionId: string;
  description: string;
  account: string;
  amount: number;
  date: string;
  type: string;
  categories: string[];
  entityId: string | null;
  entityName: string | null;
  location: string | null;
  country: string | null;
  online: boolean;
  novatedLease: boolean;
  taxReturn: boolean;
  relatedTransactionId: string | null;
  notes: string | null;
  lastEditedTime: string;
}

/** Map a SQLite row to the API response shape. */
export function toTransaction(row: TransactionRow): Transaction {
  return {
    notionId: row.notion_id,
    description: row.description,
    account: row.account,
    amount: row.amount,
    date: row.date,
    type: row.type,
    categories: row.categories
      ? (() => {
          try {
            const parsed = JSON.parse(row.categories) as unknown;
            if (Array.isArray(parsed)) {
              return parsed.filter((item): item is string => typeof item === "string");
            }
            return [];
          } catch {
            // Fallback to comma-separated if not JSON
            return row.categories
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean);
          }
        })()
      : [],
    entityId: row.entity_id,
    entityName: row.entity_name,
    location: row.location,
    country: row.country,
    online: row.online === 1,
    novatedLease: row.novated_lease === 1,
    taxReturn: row.tax_return === 1,
    relatedTransactionId: row.related_transaction_id,
    notes: row.notes,
    lastEditedTime: row.last_edited_time,
  };
}

/** Zod schema for creating a transaction. */
export const CreateTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  account: z.string().min(1, "Account is required"),
  amount: z.number(),
  date: z.string().min(1, "Date is required"),
  type: z.string().min(1, "Type is required"),
  categories: z.array(z.string()).optional().default([]),
  entityId: z.string().nullable().optional(),
  entityName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  online: z.boolean().optional().default(false),
  novatedLease: z.boolean().optional().default(false),
  taxReturn: z.boolean().optional().default(false),
  relatedTransactionId: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  /** Import-only: raw CSV row, stored in Notion for audit trail. Not persisted in SQLite. */
  rawRow: z.string().optional(),
  /** Import-only: checksum for deduplication, stored in Notion. Not persisted in SQLite. */
  checksum: z.string().optional(),
});
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;

/** Zod schema for updating a transaction (all fields optional). */
export const UpdateTransactionSchema = z.object({
  description: z.string().min(1, "Description cannot be empty").optional(),
  account: z.string().min(1, "Account cannot be empty").optional(),
  amount: z.number().optional(),
  date: z.string().min(1, "Date cannot be empty").optional(),
  type: z.string().optional(),
  categories: z.array(z.string()).optional(),
  entityId: z.string().nullable().optional(),
  entityName: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  online: z.boolean().optional(),
  novatedLease: z.boolean().optional(),
  taxReturn: z.boolean().optional(),
  relatedTransactionId: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});
export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>;

/** Zod schema for transaction list query params. */
export const TransactionQuerySchema = z.object({
  search: z.string().optional(),
  account: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  category: z.string().optional(),
  entityId: z.string().optional(),
  type: z.string().optional(),
  online: z.enum(["true", "false"]).optional(),
  novatedLease: z.enum(["true", "false"]).optional(),
  taxReturn: z.enum(["true", "false"]).optional(),
  limit: z.coerce.number().positive().optional(),
  offset: z.coerce.number().nonnegative().optional(),
});
export type TransactionQueryRaw = z.infer<typeof TransactionQuerySchema>;

/** Parsed filter params passed to the service layer (booleans resolved from strings). */
export interface TransactionFilters {
  search?: string;
  account?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  entityId?: string;
  type?: string;
  online?: boolean;
  novatedLease?: boolean;
  taxReturn?: boolean;
}
