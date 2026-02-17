// Load .env FIRST using dynamic imports to avoid hoisting
import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../../../.env');
console.log('[notion-sync] Loading .env from:', envPath);
const result = config({ path: envPath });
if (result.error) {
  console.error('[notion-sync] Failed to load .env:', result.error);
  process.exit(1);
}
console.log('[notion-sync] .env loaded successfully');

async function main(): Promise<void> {
  // Import AFTER config() has run
  const { default: BetterSqlite3 } = await import('better-sqlite3');
  const { createNotionClient } = await import('./notion-client.js');
  const { initSchema } = await import('./schema.js');
  const { runSync } = await import('./sync.js');

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
