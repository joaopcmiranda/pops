/**
 * Rebuild entity_lookup.json from the Notion Entities database.
 * Maps entity name -> Notion page URL for use by import scripts.
 *
 * Usage: yarn entities:lookup
 */

async function main(): Promise<void> {
  console.log('[regenerate-entity-lookup] Starting...');

  // TODO: Migrate from ~/Downloads/transactions/regenerate_entity_lookup.js

  console.log('[regenerate-entity-lookup] Not yet implemented');
}

main().catch((err: unknown) => {
  console.error('[regenerate-entity-lookup] Fatal:', err);
  process.exit(1);
});
