/**
 * Backfill boolean flag data into the Tags multi_select on the Notion Balance Sheet.
 *
 * The Category → Tags rename has already been done in Notion directly.
 * This script handles the optional step of copying boolean fields into Tags:
 *   Online = true       → adds "Online" tag
 *   Novated Lease = true → adds "Novated Lease" tag
 *   Tax Return = true    → adds "Tax Deductible" tag
 *
 * Pages that already have any Tags are skipped (idempotent).
 * Pages with all booleans false are skipped.
 *
 * Usage:
 *   yarn migrate:tags           # dry-run (no writes)
 *   yarn migrate:tags --execute # write to Notion
 *
 * Required env vars: NOTION_API_TOKEN, NOTION_BALANCE_SHEET_ID
 */

import { Client } from '@notionhq/client';

type RunMode = 'dry-run' | 'execute';

function parseArgs(): RunMode {
  return process.argv.includes('--execute') ? 'execute' : 'dry-run';
}

const NOTION_WRITE_DELAY_MS = 400;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getEnvRequired(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(`[migrate-tags] Missing required env var: ${key}`);
    process.exit(1);
  }
  return value;
}

function getMultiSelect(props: Record<string, unknown>, name: string): string[] {
  const prop = props[name];
  if (!prop || typeof prop !== 'object') return [];
  const p = prop as Record<string, unknown>;
  if (p['type'] !== 'multi_select') return [];
  const options = p['multi_select'];
  if (!Array.isArray(options)) return [];
  return options
    .filter((o): o is { name: string } => o !== null && typeof o === 'object' && 'name' in o)
    .map((o) => o.name);
}

function getCheckbox(props: Record<string, unknown>, name: string): boolean {
  const prop = props[name];
  if (!prop || typeof prop !== 'object') return false;
  const p = prop as Record<string, unknown>;
  return p['type'] === 'checkbox' && p['checkbox'] === true;
}

async function main(): Promise<void> {
  const mode = parseArgs();
  const notion = new Client({ auth: getEnvRequired('NOTION_API_TOKEN') });
  const databaseId = getEnvRequired('NOTION_BALANCE_SHEET_ID');

  console.log(`[migrate-tags] Mode: ${mode}`);
  console.log(`[migrate-tags] Backfilling boolean flags → Tags on ${databaseId}`);
  console.log(`[migrate-tags] Note: Category → Tags rename already done in Notion directly.`);

  let cursor: string | undefined;
  let processed = 0,
    skipped = 0,
    updated = 0,
    failed = 0;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of response.results) {
      if (page.object !== 'page') continue;
      processed++;

      const props = (page as { properties: Record<string, unknown> }).properties;
      const existingTags = getMultiSelect(props, 'Tags');

      // Determine which boolean tags to add
      const boolTags: string[] = [];
      if (getCheckbox(props, 'Online')) boolTags.push('Online');
      if (getCheckbox(props, 'Novated Lease')) boolTags.push('Novated Lease');
      if (getCheckbox(props, 'Tax Return')) boolTags.push('Tax Deductible');

      // Skip if no boolean flags to add
      if (boolTags.length === 0) {
        skipped++;
        continue;
      }

      // Merge: union of existing tags + new bool tags
      const merged = [...new Set([...existingTags, ...boolTags])].sort();

      if (mode === 'dry-run') {
        console.log(
          `  [dry-run] ${page.id}: Tags ${JSON.stringify(existingTags)} → ${JSON.stringify(merged)}`
        );
        updated++;
        continue;
      }

      try {
        await notion.pages.update({
          page_id: page.id,
          properties: { Tags: { multi_select: merged.map((name) => ({ name })) } },
        });
        console.log(`  [updated] ${page.id}: ${JSON.stringify(merged)}`);
        updated++;
        await sleep(NOTION_WRITE_DELAY_MS);
      } catch (err) {
        console.error(`  [error] ${page.id}: ${err instanceof Error ? err.message : String(err)}`);
        failed++;
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  console.log(
    `\n[migrate-tags] Done. processed=${processed} skipped=${skipped} updated=${updated} failed=${failed}`
  );
  if (failed > 0) process.exit(1);
}

main().catch((err: unknown) => {
  console.error('[migrate-tags] Fatal:', err);
  process.exit(1);
});
