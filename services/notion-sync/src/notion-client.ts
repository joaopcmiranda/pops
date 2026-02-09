import { Client } from "@notionhq/client";
import { readFileSync } from "node:fs";
import type { NotionPage } from "./types.js";

/**
 * Read a Docker secret from /run/secrets/ or fall back to env var.
 */
function readSecret(envFileKey: string, envDirectKey: string): string {
  const filePath = process.env[envFileKey];
  if (filePath) {
    return readFileSync(filePath, "utf-8").trim();
  }
  const direct = process.env[envDirectKey];
  if (direct) {
    return direct;
  }
  throw new Error(
    `Missing secret: set ${envFileKey} (path) or ${envDirectKey} (value)`
  );
}

/** Create an authenticated Notion client using Docker secrets or env vars. */
export function createNotionClient(): Client {
  const token = readSecret("NOTION_TOKEN_FILE", "NOTION_API_TOKEN");
  return new Client({ auth: token });
}

/**
 * Fetch all pages from a Notion database, optionally filtering by last_edited_time.
 * Handles pagination automatically. Respects Notion rate limits with a 400ms delay.
 */
export async function fetchDatabasePages(
  client: Client,
  databaseId: string,
  since?: string
): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const response = await client.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
      ...(since
        ? {
            filter: {
              timestamp: "last_edited_time",
              last_edited_time: { after: since },
            },
          }
        : {}),
      sorts: [{ timestamp: "last_edited_time", direction: "ascending" }],
    });

    for (const page of response.results) {
      if ("properties" in page && "last_edited_time" in page) {
        pages.push(page as NotionPage);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;

    // Respect Notion rate limits
    if (cursor) {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  } while (cursor);

  return pages;
}
