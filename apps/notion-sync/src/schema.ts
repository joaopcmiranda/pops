import type Database from 'better-sqlite3';
import { createTransactionsTable } from './databases/transactions/schema.js';
import { createEntitiesTable } from './databases/entities/schema.js';
import { createInventoryTable } from './databases/inventory/schema.js';
import { createBudgetsTable } from './databases/budgets/schema.js';
import { createWishListTable } from './databases/wish-list/schema.js';
import { createCursorsTable } from './cursor.js';

/**
 * Initialise the SQLite schema for the POPS mirror database.
 * Delegates to per-database schema modules. Idempotent — safe to call on every sync run.
 */
export function initSchema(db: Database.Database): void {
  db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 5000');

  createTransactionsTable(db);
  createEntitiesTable(db);
  createInventoryTable(db);
  createBudgetsTable(db);
  createWishListTable(db);
  createCursorsTable(db);
}
