/**
 * Helper functions for building Notion properties for transactions.
 * Separated to keep service.ts cleaner.
 */
import type { UpdateTransactionInput } from "./types.js";

/**
 * Build Notion properties for transaction update.
 * Only includes fields that are being updated.
 */
export function buildTransactionUpdateProperties(
  input: UpdateTransactionInput
){
  const properties: { [key: string]: unknown } = {};

  if (input.description !== undefined) {
    properties.Description = {
      title: [{ text: { content: input.description } }],
    };
  }
  if (input.account !== undefined) {
    properties.Account = { select: { name: input.account } };
  }
  if (input.amount !== undefined) {
    properties.Amount = { number: input.amount };
  }
  if (input.date !== undefined) {
    properties.Date = { date: { start: input.date } };
  }
  if (input.type !== undefined) {
    properties.Type = { select: { name: input.type || "Expense" } };
  }
  if (input.categories !== undefined) {
    properties.Category = {
      multi_select: input.categories.length
        ? input.categories.map((cat) => ({ name: cat }))
        : [],
    };
  }
  if (input.entityId !== undefined) {
    properties.Entity = input.entityId
      ? { relation: [{ id: input.entityId }] }
      : { relation: [] };
  }
  if (input.location !== undefined) {
    properties.Location = input.location
      ? { select: { name: input.location } }
      : { select: null };
  }
  if (input.country !== undefined) {
    properties.Country = input.country
      ? { select: { name: input.country } }
      : { select: null };
  }
  if (input.online !== undefined) {
    properties.Online = { checkbox: input.online };
  }
  if (input.novatedLease !== undefined) {
    properties["Novated Lease"] = { checkbox: input.novatedLease };
  }
  if (input.taxReturn !== undefined) {
    properties["Tax Return"] = { checkbox: input.taxReturn };
  }
  if (input.relatedTransactionId !== undefined) {
    properties["Related Transaction"] = input.relatedTransactionId
      ? { relation: [{ id: input.relatedTransactionId }] }
      : { relation: [] };
  }
  if (input.notes !== undefined) {
    properties.Notes = input.notes
      ? { rich_text: [{ text: { content: input.notes } }] }
      : { rich_text: [] };
  }

  return properties;
}
