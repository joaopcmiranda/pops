/**
 * Global test state - avoids circular dependencies.
 * Both notion-client.ts and test-utils.ts can safely import this.
 */
import type { Client } from "@notionhq/client";

let mockNotionClient: Client | null = null;

export function setMockNotionClient(client: Client | null): void {
  mockNotionClient = client;
}

export function getMockNotionClient(): Client | null {
  return mockNotionClient;
}

export function clearMockNotionClient(): void {
  mockNotionClient = null;
}
