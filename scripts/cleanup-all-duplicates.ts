#!/usr/bin/env tsx
/**
 * Find and clean up ALL duplicate entities from Notion and local database
 * Strategy: Keep the oldest entity, archive all newer duplicates
 */

import { Client } from "@notionhq/client";
import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
const db = new Database(path.join(__dirname, "../apps/finance-api/data/pops.db"));

interface DuplicateGroup {
  name: string;
  ids: string[];
  count: number;
}

interface EntityWithTimestamp {
  id: string;
  createdTime: string;
}

async function getEntityCreatedTime(pageId: string): Promise<string> {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return (page as any).created_time;
}

async function findDuplicates(): Promise<DuplicateGroup[]> {
  const results = db
    .prepare(
      `
    SELECT LOWER(name) as normalized_name, name, GROUP_CONCAT(notion_id) as ids, COUNT(*) as count
    FROM entities
    GROUP BY LOWER(name)
    HAVING count > 1
    ORDER BY count DESC, name
  `
    )
    .all() as any[];

  return results.map((row) => ({
    name: row.name,
    ids: row.ids.split(","),
    count: row.count,
  }));
}

async function main() {
  console.log("🔍 Finding duplicate entities...\n");

  const duplicates = await findDuplicates();
  console.log(`Found ${duplicates.length} entities with duplicates\n`);

  let totalProcessed = 0;
  let totalArchived = 0;

  for (const dup of duplicates) {
    console.log(`\n📝 ${dup.name} (${dup.count} duplicates)`);
    totalProcessed++;

    try {
      // Fetch created times for all duplicates
      const entities: EntityWithTimestamp[] = [];
      for (const id of dup.ids) {
        try {
          const createdTime = await getEntityCreatedTime(id);
          entities.push({ id, createdTime });
          console.log(`  ${id.slice(0, 8)}... created ${createdTime}`);
        } catch (error) {
          console.log(`  ${id.slice(0, 8)}... ⚠ not found in Notion (already deleted?)`);
        }
      }

      if (entities.length === 0) {
        console.log(`  ⚠ No entities found in Notion, skipping`);
        continue;
      }

      // Sort by created time (oldest first)
      entities.sort((a, b) => a.createdTime.localeCompare(b.createdTime));

      const keep = entities[0];
      const toDelete = entities.slice(1);

      console.log(`  ✅ Keeping: ${keep.id.slice(0, 8)}... (oldest)`);

      // Archive duplicates from Notion
      for (const entity of toDelete) {
        try {
          await notion.pages.update({
            page_id: entity.id,
            archived: true,
          });
          console.log(`  ✓ Archived: ${entity.id.slice(0, 8)}...`);
          totalArchived++;
        } catch (error) {
          console.error(`  ✗ Failed to archive ${entity.id}:`, error);
        }
      }

      // Delete duplicates from local DB
      for (const entity of toDelete) {
        db.prepare("DELETE FROM entities WHERE notion_id = ?").run(entity.id);
      }

      // Also delete from local DB any IDs that weren't found in Notion
      for (const id of dup.ids) {
        if (!entities.find((e) => e.id === id)) {
          db.prepare("DELETE FROM entities WHERE notion_id = ?").run(id);
          console.log(`  ✓ Deleted orphaned: ${id.slice(0, 8)}...`);
        }
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`  ✗ Error processing ${dup.name}:`, error);
    }
  }

  console.log(`\n✨ Cleanup complete!`);
  console.log(`  Processed: ${totalProcessed} entity groups`);
  console.log(`  Archived: ${totalArchived} duplicate pages from Notion`);
  console.log(`\nRun the verification script to confirm cleanup.`);

  db.close();
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
