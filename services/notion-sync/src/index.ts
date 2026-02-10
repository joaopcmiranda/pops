import BetterSqlite3 from 'better-sqlite3';
import { createNotionClient } from './notion-client.js';
import { initSchema } from './schema.js';
import { runSync } from './sync.js';

async function main(): Promise<void> {
  const sqlitePath = process.env['SQLITE_PATH'] ?? './data/pops.db';
  console.log(`[notion-sync] SQLite path: ${sqlitePath}`);

  const db = new BetterSqlite3(sqlitePath);
  initSchema(db);

  const notion = createNotionClient();

  try {
    await runSync(notion, db);
  } finally {
    db.close();
  }
}

main().catch((err: unknown) => {
  console.error('[notion-sync] Fatal error:', err);
  process.exit(1);
});
