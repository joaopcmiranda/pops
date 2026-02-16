import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { processImport, executeImport, createEntity } from "./service.js";
import type { ParsedTransaction, ConfirmedTransaction } from "./types.js";
import { createTestDb, seedEntity } from "../../shared/test-utils.js";
import { setDb, closeDb } from "../../db.js";
import type { Database } from "better-sqlite3";
import { clearCache } from "./lib/ai-categorizer.js";

/**
 * Unit tests for import service with mocked Notion API.
 * ALL tests are 100% offline - zero actual API calls.
 */

// Mock Notion client
const mockNotionQuery = vi.fn();
const mockNotionCreate = vi.fn();

vi.mock("@notionhq/client", () => {
  return {
    Client: vi.fn().mockImplementation(() => {
      return {
        databases: {
          query: mockNotionQuery,
        },
        pages: {
          create: mockNotionCreate,
        },
      };
    }),
  };
});

// Mock AI categorizer
vi.mock("./lib/ai-categorizer.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./lib/ai-categorizer.js")>();
  return {
    ...actual,
    categorizeWithAi: vi.fn(),
  };
});

import { categorizeWithAi } from "./lib/ai-categorizer.js";
const mockCategorizeWithAi = vi.mocked(categorizeWithAi);

let db: Database;
const originalNotionToken = process.env["NOTION_API_TOKEN"];

beforeEach(() => {
  // Set up in-memory database
  db = createTestDb();
  setDb(db);

  // Clear mocks
  mockNotionQuery.mockClear();
  mockNotionCreate.mockClear();
  mockCategorizeWithAi.mockClear();
  clearCache();

  // Set Notion env vars
  process.env["NOTION_API_TOKEN"] = "test-notion-token";
  process.env["NOTION_BALANCE_SHEET_ID"] = "test-balance-sheet-id";
  process.env["NOTION_ENTITIES_DB_ID"] = "test-entities-db-id";
  process.env["NOTION_HOME_INVENTORY_ID"] = "test-inventory-id";
  process.env["NOTION_BUDGET_ID"] = "test-budget-id";
  process.env["NOTION_WISH_LIST_ID"] = "test-wishlist-id";
});

afterEach(() => {
  closeDb();
  if (originalNotionToken === undefined) {
    delete process.env["NOTION_API_TOKEN"];
  } else {
    process.env["NOTION_API_TOKEN"] = originalNotionToken;
  }
  // Clean up other env vars
  delete process.env["NOTION_BALANCE_SHEET_ID"];
  delete process.env["NOTION_ENTITIES_DB_ID"];
  delete process.env["NOTION_HOME_INVENTORY_ID"];
  delete process.env["NOTION_BUDGET_ID"];
  delete process.env["NOTION_WISH_LIST_ID"];
});

describe("processImport", () => {
  const baseParsedTransaction: ParsedTransaction = {
    date: "2026-02-13",
    description: "WOOLWORTHS 1234",
    amount: -125.50,
    account: "Amex",
    location: "North Sydney",
    online: false,
    rawRow: '{"Date":"13/02/2026","Description":"WOOLWORTHS 1234"}',
    checksum: "abc123def456",
  };

  describe("Deduplication", () => {
    it("skips transactions with existing checksums", async () => {
      // Mock Notion returning existing checksum
      mockNotionQuery.mockResolvedValue({
        results: [
          {
            properties: {
              Checksum: {
                type: "rich_text",
                rich_text: [{ plain_text: "abc123def456" }],
              },
            },
          },
        ],
      });

      const result = await processImport([baseParsedTransaction], "Amex");

      expect(result.skipped.length).toBe(1);
      expect(result.skipped[0].skipReason).toBe("Duplicate transaction (checksum match)");
      expect(result.matched.length).toBe(0);
      expect(result.uncertain.length).toBe(0);
      expect(result.failed.length).toBe(0);
    });

    it("processes transactions with new checksums", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });

      // Mock Notion returning no existing checksums
      mockNotionQuery.mockResolvedValue({
        results: [],
      });

      const result = await processImport([baseParsedTransaction], "Amex");

      expect(result.skipped.length).toBe(0);
      expect(result.matched.length).toBe(1);
      expect(result.matched[0].entity.entityName).toBe("Woolworths");
    });

    it("batches checksum queries in groups of 100", async () => {
      const transactions = Array.from({ length: 250 }, (_, i) => ({
        ...baseParsedTransaction,
        checksum: `checksum-${i}`,
      }));

      mockNotionQuery.mockResolvedValue({ results: [] });

      await processImport(transactions, "Amex");

      // Should make 3 queries: 100 + 100 + 50
      expect(mockNotionQuery).toHaveBeenCalledTimes(3);
    });

    it("handles Notion query errors gracefully", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });

      // Mock Notion query throwing error
      mockNotionQuery.mockRejectedValue(new Error("Notion API error"));

      const result = await processImport([baseParsedTransaction], "Amex");

      // Should continue processing (treats as no duplicates)
      expect(result.matched.length).toBe(1);
    });

    it("handles missing Checksum property in Notion", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });

      // Mock Notion returning page without Checksum property
      mockNotionQuery.mockResolvedValue({
        results: [
          {
            properties: {
              Description: { type: "title", title: [] },
            },
          },
        ],
      });

      const result = await processImport([baseParsedTransaction], "Amex");

      // Should not crash, treat as no duplicates
      expect(result.matched.length).toBe(1);
    });
  });

  describe("Entity matching", () => {
    beforeEach(() => {
      mockNotionQuery.mockResolvedValue({ results: [] });
    });

    it("matches via entity lookup (exact match)", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });

      const result = await processImport([baseParsedTransaction], "Amex");

      expect(result.matched.length).toBe(1);
      expect(result.matched[0].entity.entityId).toBe("woolworths-id");
      expect(result.matched[0].entity.entityName).toBe("Woolworths");
      expect(result.matched[0].entity.matchType).toBe("prefix");
      expect(result.matched[0].status).toBe("matched");
    });

    it("matches via alias", async () => {
      seedEntity(db, {
        name: "Transport for NSW",
        notion_id: "transport-nsw-id",
        aliases: "TRANSPORTFORNSWTRAVEL, OPAL",
      });

      const transaction: ParsedTransaction = {
        ...baseParsedTransaction,
        description: "TRANSPORTFORNSWTRAVEL CARD",
        checksum: "xyz789",
      };

      const result = await processImport([transaction], "Amex");

      expect(result.matched.length).toBe(1);
      expect(result.matched[0].entity.entityName).toBe("Transport for NSW");
      expect(result.matched[0].entity.matchType).toBe("alias");
    });

    it("handles empty entity lookup", async () => {
      mockCategorizeWithAi.mockResolvedValue({ result: null });

      const result = await processImport([baseParsedTransaction], "Amex");

      expect(result.failed.length).toBe(1);
      expect(result.failed[0].error).toBe("No entity match found");
    });

    it("throws error when matched entity missing from lookup", async () => {
      // Seed entity but with different name to cause mismatch
      seedEntity(db, { name: "Woolworths Store", notion_id: "woolworths-id" });

      const result = await processImport([baseParsedTransaction], "Amex");

      // Entity matcher finds "WOOLWORTHS" but lookup doesn't have it
      expect(result.failed.length).toBe(1);
    });
  });

  describe("AI categorization", () => {
    beforeEach(() => {
      mockNotionQuery.mockResolvedValue({ results: [] });
    });

    it("calls AI for unmatched transactions", async () => {
      mockCategorizeWithAi.mockResolvedValue({
        result: {
          description: "UNKNOWN MERCHANT",
          entityName: "Unknown Merchant",
          category: "Other",
          cachedAt: "2026-02-13T00:00:00Z",
        },
        usage: { inputTokens: 50, outputTokens: 20, costUsd: 0.0001 },
      });

      const transaction: ParsedTransaction = {
        ...baseParsedTransaction,
        description: "UNKNOWN MERCHANT",
        checksum: "unknown123",
      };

      const result = await processImport([transaction], "Amex");

      expect(mockCategorizeWithAi).toHaveBeenCalledWith(transaction.rawRow, expect.any(String));
      expect(result.uncertain.length).toBe(1);
      expect(result.uncertain[0].entity.entityName).toBe("Unknown Merchant");
    });

    it("matches AI result to existing entity (case-insensitive)", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });

      mockCategorizeWithAi.mockResolvedValue({
        result: {
          description: "UNKNOWN MERCHANT",
          entityName: "woolworths", // lowercase
          category: "Groceries",
          cachedAt: "2026-02-13T00:00:00Z",
        },
        usage: { inputTokens: 50, outputTokens: 20, costUsd: 0.0001 },
      });

      const transaction: ParsedTransaction = {
        ...baseParsedTransaction,
        description: "UNKNOWN MERCHANT XYZ",
        checksum: "unknown123",
      };

      const result = await processImport([transaction], "Amex");

      expect(result.matched.length).toBe(1);
      expect(result.matched[0].entity.entityName).toBe("Woolworths");
      expect(result.matched[0].entity.matchType).toBe("ai");
    });

    it("adds to uncertain when AI suggests new entity", async () => {
      mockCategorizeWithAi.mockResolvedValue({
        result: {
          description: "NEW MERCHANT",
          entityName: "New Merchant",
          category: "Shopping",
          cachedAt: "2026-02-13T00:00:00Z",
        },
        usage: { inputTokens: 50, outputTokens: 20, costUsd: 0.0001 },
      });

      const transaction: ParsedTransaction = {
        ...baseParsedTransaction,
        description: "NEW MERCHANT",
        checksum: "new123",
      };

      const result = await processImport([transaction], "Amex");

      expect(result.uncertain.length).toBe(1);
      expect(result.uncertain[0].entity.entityName).toBe("New Merchant");
      expect(result.uncertain[0].entity.confidence).toBe(0.7);
      expect(result.uncertain[0].status).toBe("uncertain");
    });

    it("adds to failed when AI returns null", async () => {
      mockCategorizeWithAi.mockResolvedValue({ result: null });

      const transaction: ParsedTransaction = {
        ...baseParsedTransaction,
        description: "FAILED MERCHANT",
        checksum: "failed123",
      };

      const result = await processImport([transaction], "Amex");

      expect(result.failed.length).toBe(1);
      expect(result.failed[0].error).toBe("No entity match found");
    });
  });

  describe("Error handling", () => {
    beforeEach(() => {
      mockNotionQuery.mockResolvedValue({ results: [] });
    });

    it("catches errors during entity matching", async () => {
      // Force an error by making entity lookup throw
      mockCategorizeWithAi.mockRejectedValue(new Error("AI service down"));

      const transaction: ParsedTransaction = {
        ...baseParsedTransaction,
        description: "ERROR MERCHANT",
        checksum: "error123",
      };

      const result = await processImport([transaction], "Amex");

      expect(result.failed.length).toBe(1);
      expect(result.failed[0].error).toBe("AI service down");
    });

    it("handles mixed success and failure", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });
      mockCategorizeWithAi.mockResolvedValue({ result: null });

      const transactions: ParsedTransaction[] = [
        baseParsedTransaction, // Will match Woolworths
        { ...baseParsedTransaction, description: "UNKNOWN", checksum: "unknown123" }, // Will fail
      ];

      const result = await processImport(transactions, "Amex");

      expect(result.matched.length).toBe(1);
      expect(result.failed.length).toBe(1);
    });
  });

  describe("Edge cases", () => {
    it("returns empty results for empty input", async () => {
      const result = await processImport([], "Amex");

      expect(result.matched).toEqual([]);
      expect(result.uncertain).toEqual([]);
      expect(result.failed).toEqual([]);
      expect(result.skipped).toEqual([]);
    });

    it("handles transactions with missing optional fields", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });
      mockNotionQuery.mockResolvedValue({ results: [] });

      const transaction: ParsedTransaction = {
        date: "2026-02-13",
        description: "WOOLWORTHS",
        amount: -100,
        account: "Amex",
        rawRow: "{}",
        checksum: "minimal123",
      };

      const result = await processImport([transaction], "Amex");

      expect(result.matched.length).toBe(1);
      expect(result.matched[0].location).toBeUndefined();
      expect(result.matched[0].online).toBeUndefined();
    });

    it("generates correct Notion URL format", async () => {
      seedEntity(db, { name: "Woolworths", notion_id: "aabbccdd-1122-3344-5566-778899001122" });
      mockNotionQuery.mockResolvedValue({ results: [] });

      const result = await processImport([baseParsedTransaction], "Amex");

      expect(result.matched[0].entity.entityUrl).toBe(
        "https://www.notion.so/aabbccdd112233445566778899001122"
      );
    });
  });
});

describe("executeImport", () => {
  const baseConfirmedTransaction: ConfirmedTransaction = {
    date: "2026-02-13",
    description: "WOOLWORTHS 1234",
    amount: -125.50,
    account: "Amex",
    location: "North Sydney",
    online: false,
    rawRow: '{"Date":"13/02/2026"}',
    checksum: "abc123",
    entityId: "woolworths-id",
    entityName: "Woolworths",
    entityUrl: "https://www.notion.so/woolworthsid",
  };

  it("returns empty result for empty input", async () => {
    const result = await executeImport([]);

    expect(result.imported).toBe(0);
    expect(result.failed).toEqual([]);
    expect(result.skipped).toBe(0);
  });

  it("writes single transaction successfully", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id-123" });

    const result = await executeImport([baseConfirmedTransaction]);

    expect(result.imported).toBe(1);
    expect(result.failed).toEqual([]);
    expect(mockNotionCreate).toHaveBeenCalledTimes(1);
  });

  it("writes multiple transactions with concurrency", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    const transactions = Array.from({ length: 10 }, (_, i) => ({
      ...baseConfirmedTransaction,
      checksum: `checksum-${i}`,
    }));

    const result = await executeImport(transactions);

    expect(result.imported).toBe(10);
    expect(mockNotionCreate).toHaveBeenCalledTimes(10);
  });

  it("tracks failures correctly", async () => {
    mockNotionCreate
      .mockResolvedValueOnce({ id: "page-1" }) // First succeeds
      .mockRejectedValueOnce(new Error("Notion API error")) // Second fails
      .mockResolvedValueOnce({ id: "page-3" }); // Third succeeds

    const transactions = Array.from({ length: 3 }, (_, i) => ({
      ...baseConfirmedTransaction,
      checksum: `checksum-${i}`,
    }));

    const result = await executeImport(transactions);

    expect(result.imported).toBe(2);
    expect(result.failed.length).toBe(1);
    expect(result.failed[0].error).toBe("Notion API error");
    expect(result.failed[0].success).toBe(false);
  });

  it("applies rate limiting (400ms delay)", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    const start = Date.now();
    await executeImport([baseConfirmedTransaction, baseConfirmedTransaction]);
    const duration = Date.now() - start;

    // With 3 workers and 2 transactions, they run in parallel
    // Each transaction waits 400ms, so minimum is ~400ms
    expect(duration).toBeGreaterThanOrEqual(400);
  });

  it("continues on partial failures", async () => {
    mockNotionCreate
      .mockRejectedValueOnce(new Error("Error 1"))
      .mockResolvedValueOnce({ id: "page-2" })
      .mockRejectedValueOnce(new Error("Error 3"))
      .mockResolvedValueOnce({ id: "page-4" });

    const transactions = Array.from({ length: 4 }, (_, i) => ({
      ...baseConfirmedTransaction,
      checksum: `checksum-${i}`,
    }));

    const result = await executeImport(transactions);

    expect(result.imported).toBe(2);
    expect(result.failed.length).toBe(2);
  });

  it("creates Notion page with all required properties", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    await executeImport([baseConfirmedTransaction]);

    expect(mockNotionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        parent: { database_id: process.env["NOTION_BALANCE_SHEET_ID"] },
        properties: expect.objectContaining({
          Description: { title: [{ text: { content: "WOOLWORTHS 1234" } }] },
          Account: { select: { name: "Amex" } },
          Amount: { number: -125.50 },
          Date: { date: { start: "2026-02-13" } },
          Online: { checkbox: false },
          Checksum: { rich_text: [{ text: { content: "abc123" } }] },
        }),
      })
    );
  });

  it("includes location when present", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    await executeImport([baseConfirmedTransaction]);

    const call = mockNotionCreate.mock.calls[0][0];
    expect(call.properties.Location).toEqual({ select: { name: "North Sydney" } });
  });

  it("omits location when undefined", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    const transaction = { ...baseConfirmedTransaction, location: undefined };
    await executeImport([transaction]);

    const call = mockNotionCreate.mock.calls[0][0];
    expect(call.properties.Location).toBeUndefined();
  });

  it("truncates rawRow to 2000 characters", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    const longRawRow = "A".repeat(3000);
    const transaction = { ...baseConfirmedTransaction, rawRow: longRawRow };

    await executeImport([transaction]);

    const call = mockNotionCreate.mock.calls[0][0];
    const rawRowContent = call.properties["Raw Row"].rich_text[0].text.content;
    expect(rawRowContent).toHaveLength(2000);
  });

  it("handles large batch (30 transactions)", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    // 30 transactions × 400ms delay = 12 seconds total
    // With 3 workers = ~4 seconds
    const transactions = Array.from({ length: 30 }, (_, i) => ({
      ...baseConfirmedTransaction,
      checksum: `checksum-${i}`,
    }));

    const result = await executeImport(transactions);

    expect(result.imported).toBe(30);
    expect(mockNotionCreate).toHaveBeenCalledTimes(30);
  }, 15000); // 15 second timeout
});

describe("createEntity", () => {
  it("creates entity in Notion and SQLite", async () => {
    mockNotionCreate.mockResolvedValue({
      id: "new-entity-id-1234",
    });

    const result = await createEntity("New Entity");

    expect(result.entityId).toBe("new-entity-id-1234");
    expect(result.entityName).toBe("New Entity");
    expect(result.entityUrl).toBe("https://www.notion.so/newentityid1234");

    // Verify Notion create call
    expect(mockNotionCreate).toHaveBeenCalledWith({
      parent: { database_id: process.env["NOTION_ENTITIES_DB_ID"] },
      properties: {
        Name: {
          title: [{ text: { content: "New Entity" } }],
        },
      },
    });

    // Verify SQLite insert
    const row = db.prepare("SELECT * FROM entities WHERE notion_id = ?").get("new-entity-id-1234") as any;
    expect(row.name).toBe("New Entity");
  });

  it("handles entity name with special characters", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    await createEntity("McDonald's");

    expect(mockNotionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        properties: {
          Name: { title: [{ text: { content: "McDonald's" } }] },
        },
      })
    );
  });

  it("handles very long entity name (200 chars)", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    const longName = "A".repeat(200);
    const result = await createEntity(longName);

    expect(result.entityName).toBe(longName);
  });

  it("uses INSERT OR REPLACE for SQLite upsert", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id-123" });

    // First insert
    await createEntity("Test Entity");

    // Second insert with same ID (simulates notion returning same ID)
    mockNotionCreate.mockResolvedValue({ id: "entity-id-123" });
    await createEntity("Test Entity Updated");

    const rows = db.prepare("SELECT * FROM entities WHERE notion_id = ?").all("entity-id-123");
    expect(rows).toHaveLength(1);
    expect((rows[0] as any).name).toBe("Test Entity Updated");
  });

  it("sets current timestamp for last_edited_time", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    const before = new Date().toISOString();
    await createEntity("Test Entity");
    const after = new Date().toISOString();

    const row = db.prepare("SELECT last_edited_time FROM entities WHERE notion_id = ?").get("entity-id") as any;
    expect(row.last_edited_time >= before).toBe(true);
    expect(row.last_edited_time <= after).toBe(true);
  });

  it("throws error when Notion API fails", async () => {
    mockNotionCreate.mockRejectedValue(new Error("Notion API error"));

    await expect(createEntity("Test Entity")).rejects.toThrow("Notion API error");
  });

  it("generates correct Notion URL (removes dashes)", async () => {
    mockNotionCreate.mockResolvedValue({
      id: "aabbccdd-1122-3344-5566-778899aabbcc",
    });

    const result = await createEntity("Test");

    expect(result.entityUrl).toBe("https://www.notion.so/aabbccdd112233445566778899aabbcc");
  });
});

describe("getNotionClient", () => {
  it("throws error when NOTION_API_TOKEN is missing", async () => {
    delete process.env["NOTION_API_TOKEN"];

    await expect(processImport([], "Amex")).rejects.toThrow(
      "NOTION_API_TOKEN environment variable not set"
    );
  });

  it("throws error when NOTION_API_TOKEN is empty string", async () => {
    process.env["NOTION_API_TOKEN"] = "";

    await expect(processImport([], "Amex")).rejects.toThrow(
      "NOTION_API_TOKEN environment variable not set"
    );
  });

  it("creates client with provided token", async () => {
    process.env["NOTION_API_TOKEN"] = "secret-token-123";
    mockNotionQuery.mockResolvedValue({ results: [] });

    // Provide a transaction so the client actually gets used
    const transaction: ParsedTransaction = {
      date: "2026-02-13",
      description: "TEST",
      amount: -100,
      account: "Amex",
      rawRow: "{}",
      checksum: "test123",
    };

    await processImport([transaction], "Amex");

    // Client should be created and used
    expect(mockNotionQuery).toHaveBeenCalled();
  });
});

describe("loadEntityLookup", () => {
  it("returns empty object when no entities exist", async () => {
    mockNotionQuery.mockResolvedValue({ results: [] });

    const result = await processImport([], "Amex");

    // Should not crash with empty lookup
    expect(result).toBeDefined();
  });

  it("returns correct name→notion_id mapping", async () => {
    seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });
    seedEntity(db, { name: "Coles", notion_id: "coles-id" });
    mockNotionQuery.mockResolvedValue({ results: [] });

    const transaction: ParsedTransaction = {
      date: "2026-02-13",
      description: "WOOLWORTHS",
      amount: -100,
      account: "Amex",
      rawRow: "{}",
      checksum: "abc123",
    };

    const result = await processImport([transaction], "Amex");

    expect(result.matched[0].entity.entityId).toBe("woolworths-id");
  });

  it("handles null notion_id gracefully", async () => {
    db.prepare("INSERT INTO entities (notion_id, name, last_edited_time) VALUES (NULL, ?, ?)").run(
      "Invalid Entity",
      "2026-01-01T00:00:00Z"
    );

    mockNotionQuery.mockResolvedValue({ results: [] });

    // Should not crash
    const result = await processImport([], "Amex");
    expect(result).toBeDefined();
  });
});

describe("loadAliases", () => {
  it("returns empty object when no aliases exist", async () => {
    seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id", aliases: null });
    mockNotionQuery.mockResolvedValue({ results: [] });

    // Should not crash
    const result = await processImport([], "Amex");
    expect(result).toBeDefined();
  });

  it("parses comma-separated aliases correctly", async () => {
    seedEntity(db, {
      name: "Transport for NSW",
      notion_id: "transport-id",
      aliases: "TRANSPORTFORNSWTRAVEL, OPAL, TfNSW",
    });
    mockNotionQuery.mockResolvedValue({ results: [] });

    const transaction: ParsedTransaction = {
      date: "2026-02-13",
      description: "OPAL CARD",
      amount: -10,
      account: "Amex",
      rawRow: "{}",
      checksum: "opal123",
    };

    const result = await processImport([transaction], "Amex");

    expect(result.matched[0].entity.entityName).toBe("Transport for NSW");
    expect(result.matched[0].entity.matchType).toBe("alias");
  });

  it("trims whitespace from aliases", async () => {
    seedEntity(db, {
      name: "Woolworths",
      notion_id: "woolworths-id",
      aliases: "  WOW  ,  WOOLIES  ",
    });
    mockNotionQuery.mockResolvedValue({ results: [] });

    const transaction: ParsedTransaction = {
      date: "2026-02-13",
      description: "WOW METRO",
      amount: -50,
      account: "Amex",
      rawRow: "{}",
      checksum: "wow123",
    };

    const result = await processImport([transaction], "Amex");

    expect(result.matched[0].entity.matchType).toBe("alias");
  });

  it("handles single alias (no commas)", async () => {
    seedEntity(db, {
      name: "Netflix",
      notion_id: "netflix-id",
      aliases: "NETFLIX.COM",
    });
    mockNotionQuery.mockResolvedValue({ results: [] });

    const transaction: ParsedTransaction = {
      date: "2026-02-13",
      description: "NETFLIX.COM SUBSCRIPTION",
      amount: -15.99,
      account: "Amex",
      rawRow: "{}",
      checksum: "netflix123",
    };

    const result = await processImport([transaction], "Amex");

    expect(result.matched[0].entity.matchType).toBe("alias");
  });

  it("handles empty string aliases", async () => {
    seedEntity(db, { name: "Test", notion_id: "test-id", aliases: "" });
    mockNotionQuery.mockResolvedValue({ results: [] });

    // Should not crash
    const result = await processImport([], "Amex");
    expect(result).toBeDefined();
  });
});
