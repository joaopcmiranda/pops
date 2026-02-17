/**
 * Mock Notion client for testing.
 * Simulates Notion API responses without making actual HTTP requests.
 */
import type { Client } from "@notionhq/client";

interface MockPage {
  id: string;
  properties: Record<string, unknown>;
  archived: boolean;
  last_edited_time: string;
}

/**
 * In-memory store for mock Notion pages.
 * Keyed by page ID, stores page data for testing.
 */
const mockPages = new Map<string, MockPage>();

/**
 * Reset the mock store.
 * Call this in test setup to ensure clean state.
 */
export function resetNotionMock(): void {
  mockPages.clear();
}

/**
 * Get all mock pages for inspection in tests.
 */
export function getMockPages(): Map<string, MockPage> {
  return mockPages;
}

/**
 * Seed a mock page directly into the store.
 * Use this in test helpers to sync SQLite seeds with mock Notion pages.
 */
export function seedMockPage(id: string, properties: Record<string, unknown> = {}): void {
  mockPages.set(id, {
    id,
    properties,
    archived: false,
    last_edited_time: new Date().toISOString(),
  });
}

/**
 * Create a mock Notion client for testing.
 * Stores pages in memory instead of making API calls.
 */
export function createMockNotionClient(): Client {
  const mock = {
    pages: {
      /**
       * Mock pages.create()
       * Returns a mock page with generated ID and copies properties from input.
       */
      create: (args: {
        parent: { database_id: string };
        properties: Record<string, unknown>;
      }): Promise<MockPage> => {
        const pageId = crypto.randomUUID();
        const now = new Date().toISOString();

        const page: MockPage = {
          id: pageId,
          properties: args.properties,
          archived: false,
          last_edited_time: now,
        };

        mockPages.set(pageId, page);
        return Promise.resolve(page);
      },

      /**
       * Mock pages.update()
       * Updates properties of existing mock page.
       */
      update: (args: {
        page_id: string;
        properties?: Record<string, unknown>;
        archived?: boolean;
      }): Promise<MockPage> => {
        const existing = mockPages.get(args.page_id);
        if (!existing) {
          throw new Error(`Mock Notion page not found: ${args.page_id}`);
        }

        const now = new Date().toISOString();

        const updated: MockPage = {
          id: args.page_id,
          properties: args.properties
            ? { ...existing.properties, ...args.properties }
            : existing.properties,
          archived: args.archived ?? existing.archived,
          last_edited_time: now,
        };

        mockPages.set(args.page_id, updated);
        return Promise.resolve(updated);
      },

      /**
       * Mock pages.retrieve()
       * Returns existing mock page by ID.
       */
      retrieve: (args: { page_id: string }): Promise<MockPage> => {
        const page = mockPages.get(args.page_id);
        if (!page) {
          throw new Error(`Mock Notion page not found: ${args.page_id}`);
        }
        return Promise.resolve(page);
      },
    },

    databases: {
      /**
       * Mock databases.query()
       * Returns all pages in the mock store (simplified - no filtering).
       */
      query: (_args: {
        database_id: string;
        filter?: unknown;
      }): Promise<{ results: MockPage[] }> => {
        // Simplified: return all pages (no filtering applied)
        const results = Array.from(mockPages.values()).filter((p) => !p.archived);
        return Promise.resolve({ results });
      },
    },
  };

  return mock as unknown as Client;
}

/**
 * Type guard to check if a Notion client is a mock.
 */
export function isMockNotionClient(client: Client): boolean {
  return (
    typeof client === "object" &&
    "pages" in client &&
    typeof (client as unknown as { pages: { create: unknown } }).pages.create === "function"
  );
}
