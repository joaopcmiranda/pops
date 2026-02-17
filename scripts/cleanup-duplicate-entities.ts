#!/usr/bin/env tsx
/**
 * Clean up duplicate entities from Notion and local database
 *
 * Duplicates found:
 * - Ampol: Keep 2fe40f45-3d91-81a4-8b6a-c7b61389bdeb (Feb 5), delete 2 newer ones
 * - IKEA: Keep 2fe40f45-3d91-8164-be8d-e64c3e608de3 (Feb 5), delete 2 newer ones
 */

import { Client } from "@notionhq/client";
import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
const db = new Database(path.join(__dirname, "../apps/finance-api/data/pops.db"));

interface DuplicateEntity {
  name: string;
  keep: string;
  delete: string[];
}

const duplicates: DuplicateEntity[] = [
  {
    name: "Ampol",
    keep: "2fe40f45-3d91-81a4-8b6a-c7b61389bdeb",
    delete: [
      "30640f45-3d91-81f8-8f37-dd236f76b2c0",
      "30640f45-3d91-81e6-8835-f31ccfe0ec9e",
    ],
  },
  {
    name: "IKEA",
    keep: "2fe40f45-3d91-8164-be8d-e64c3e608de3",
    delete: [
      "30640f45-3d91-81df-9017-e8c517bd844b",
      "30640f45-3d91-814d-b68f-cccca5a1e2cb",
    ],
  },
];

async function main() {
  console.log("🧹 Cleaning up duplicate entities...\n");

  for (const dup of duplicates) {
    console.log(`\n📝 Processing ${dup.name}:`);
    console.log(`  ✅ Keeping: ${dup.keep}`);
    console.log(`  ❌ Deleting: ${dup.delete.join(", ")}`);

    // Delete from Notion (archive the pages)
    for (const pageId of dup.delete) {
      try {
        await notion.pages.update({
          page_id: pageId,
          archived: true,
        });
        console.log(`  ✓ Archived from Notion: ${pageId}`);
      } catch (error) {
        console.error(`  ✗ Failed to archive from Notion: ${pageId}`, error);
      }

      // Delete from local database
      try {
        const stmt = db.prepare("DELETE FROM entities WHERE notion_id = ?");
        const result = stmt.run(pageId);
        if (result.changes > 0) {
          console.log(`  ✓ Deleted from local DB: ${pageId}`);
        } else {
          console.log(`  ℹ Not found in local DB: ${pageId}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to delete from local DB: ${pageId}`, error);
      }
    }

    // Verify the kept entity exists in local DB
    const kept = db
      .prepare("SELECT * FROM entities WHERE notion_id = ?")
      .get(dup.keep);
    if (!kept) {
      console.log(`  ⚠ Warning: Kept entity ${dup.keep} not in local DB yet`);
      console.log(`  → Run notion-sync to pull it from Notion`);
    } else {
      console.log(`  ✓ Kept entity exists in local DB`);
    }
  }

  console.log("\n✨ Cleanup complete!\n");
  console.log("Next steps:");
  console.log("  1. Run 'cd apps/notion-sync && yarn dev' to sync remaining entities");
  console.log("  2. Verify with: sqlite3 apps/finance-api/data/pops.db \"SELECT name, notion_id FROM entities WHERE LOWER(name) IN ('ampol', 'ikea')\"");

  db.close();
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
