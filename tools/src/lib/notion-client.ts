import { Client } from "@notionhq/client";
import { readFileSync } from "node:fs";

/**
 * Read a secret from a Docker secret file path or direct env var.
 */
function readSecret(envFileKey: string, envDirectKey: string): string {
  const filePath = process.env[envFileKey];
  if (filePath) {
    return readFileSync(filePath, "utf-8").trim();
  }
  const direct = process.env[envDirectKey];
  if (direct) return direct;
  throw new Error(`Missing ${envFileKey} or ${envDirectKey}`);
}

/** Create an authenticated Notion client. */
export function createNotionClient(): Client {
  const token = readSecret("NOTION_TOKEN_FILE", "NOTION_API_TOKEN");
  return new Client({ auth: token });
}

/**
 * Create a page in a Notion database.
 * Respects rate limits with configurable delay.
 */
export async function createNotionPage(
  client: Client,
  databaseId: string,
  properties: Record<string, unknown>,
  delay = 400
): Promise<string> {
  const response = await client.pages.create({
    parent: { database_id: databaseId },
    properties: properties as Parameters<typeof client.pages.create>[0]["properties"],
  });

  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return response.id;
}
