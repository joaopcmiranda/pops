import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TRPCError } from "@trpc/server";
import type { Database } from "better-sqlite3";
import { setupTestContext, seedEntity, createCaller } from "../../shared/test-utils.js";
import { clearCache } from "./lib/ai-categorizer.js";
import type { ProcessImportOutput, ExecuteImportOutput } from "./types.js";

/**
 * Unit tests for imports tRPC router.
 * Tests input validation and service function integration with mocked Notion API.
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
    categorizeWithAi: vi.fn().mockResolvedValue(null),
  };
});

const ctx = setupTestContext();
let caller: ReturnType<typeof createCaller>;
let db: Database;
const originalNotionToken = process.env["NOTION_API_TOKEN"];

/**
 * Helper to poll for import progress until completion
 */
async function waitForCompletion<T = any>(sessionId: string, maxAttempts = 50): Promise<T> {
  for (let i = 0; i < maxAttempts; i++) {
    const progress = await caller.imports.getImportProgress({ sessionId });
    if (!progress) {
      throw new Error("Progress not found");
    }
    if (progress.status === "completed") {
      return progress.result as T;
    }
    if (progress.status === "failed") {
      throw new Error(`Import failed: ${progress.errors?.map((e) => e.error).join(", ")}`);
    }
    // Wait 10ms before next poll (tests run fast)
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("Timeout waiting for import to complete");
}

beforeEach(() => {
  ({ caller, db } = ctx.setup());
  mockNotionQuery.mockClear();
  mockNotionCreate.mockClear();
  clearCache();
  process.env["NOTION_API_TOKEN"] = "test-notion-token";
});

afterEach(() => {
  ctx.teardown();
  if (originalNotionToken === undefined) {
    delete process.env["NOTION_API_TOKEN"];
  } else {
    process.env["NOTION_API_TOKEN"] = originalNotionToken;
  }
});

describe("imports.processImport", () => {
  beforeEach(() => {
    mockNotionQuery.mockResolvedValue({ results: [] });
  });

  it("validates input schema (requires transactions array)", async () => {
    await expect(
      caller.imports.processImport({
        transactions: undefined as any,
        account: "Amex",
      })
    ).rejects.toThrow();
  });

  it("validates input schema (requires account)", async () => {
    await expect(
      caller.imports.processImport({
        transactions: [],
        account: undefined as any,
      })
    ).rejects.toThrow();
  });

  it("validates transaction schema (requires date)", async () => {
    await expect(
      caller.imports.processImport({
        transactions: [
          {
            description: "TEST",
            amount: -100,
            account: "Amex",
            rawRow: "{}",
            checksum: "abc123",
            // Missing date
          } as any,
        ],
        account: "Amex",
      })
    ).rejects.toThrow();
  });

  it("validates date format (YYYY-MM-DD)", async () => {
    await expect(
      caller.imports.processImport({
        transactions: [
          {
            date: "13/02/2026", // Wrong format
            description: "TEST",
            amount: -100,
            account: "Amex",
            rawRow: "{}",
            checksum: "abc123",
          },
        ],
        account: "Amex",
      })
    ).rejects.toThrow();
  });

  it("processes valid input successfully", async () => {
    seedEntity(db, { name: "Woolworths", notion_id: "woolworths-id" });

    const { sessionId } = await caller.imports.processImport({
      transactions: [
        {
          date: "2026-02-13",
          description: "WOOLWORTHS 1234",
          amount: -125.50,
          account: "Amex",
          location: "Sydney",
          online: false,
          rawRow: '{}',
          checksum: "abc123",
        },
      ],
      account: "Amex",
    });

    const result = await waitForCompletion<ProcessImportOutput>(sessionId);
    expect(result).toBeDefined();
    expect(result.matched.length).toBe(1);
    expect(result.matched[0].entity.entityName).toBe("Woolworths");
  });

  it("returns correct output structure", async () => {
    const { sessionId } = await caller.imports.processImport({
      transactions: [],
      account: "Amex",
    });

    const result = await waitForCompletion<ProcessImportOutput>(sessionId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("matched");
    expect(result).toHaveProperty("uncertain");
    expect(result).toHaveProperty("failed");
    expect(result).toHaveProperty("skipped");
    expect(Array.isArray(result.matched)).toBe(true);
  });

  it("handles large batch (100+ transactions)", async () => {
    const transactions = Array.from({ length: 100 }, (_, i) => ({
      date: "2026-02-13",
      description: `TRANSACTION ${i}`,
      amount: -100,
      account: "Amex",
      rawRow: `{"id": ${i}}`,
      checksum: `checksum-${i}`,
    }));

    const { sessionId } = await caller.imports.processImport({
      transactions,
      account: "Amex",
    });

    const result = await waitForCompletion<ProcessImportOutput>(sessionId);
    expect(result).toBeDefined();
    expect(result.matched.length + result.failed.length + result.skipped.length).toBe(100);
  });

  it("accepts optional fields (location, online)", async () => {
    const { sessionId } = await caller.imports.processImport({
      transactions: [
        {
          date: "2026-02-13",
          description: "TEST",
          amount: -100,
          account: "Amex",
          rawRow: "{}",
          checksum: "abc123",
          location: "Sydney",
          online: true,
        },
      ],
      account: "Amex",
    });

    const result = await waitForCompletion<ProcessImportOutput>(sessionId);
    expect(result).toBeDefined();
  });
});

describe("imports.executeImport", () => {
  it("validates input schema (requires transactions array)", async () => {
    await expect(
      caller.imports.executeImport({
        transactions: undefined as any,
      })
    ).rejects.toThrow();
  });

  it("validates confirmed transaction schema (requires entityId)", async () => {
    await expect(
      caller.imports.executeImport({
        transactions: [
          {
            date: "2026-02-13",
            description: "TEST",
            amount: -100,
            account: "Amex",
            rawRow: "{}",
            checksum: "abc123",
            entityName: "Test",
            entityUrl: "https://notion.so/test",
            // Missing entityId
          } as any,
        ],
      })
    ).rejects.toThrow();
  });

  it("executes valid input successfully", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id-123" });

    const { sessionId } = await caller.imports.executeImport({
      transactions: [
        {
          date: "2026-02-13",
          description: "WOOLWORTHS",
          amount: -125.50,
          account: "Amex",
          location: "Sydney",
          online: false,
          rawRow: '{}',
          checksum: "abc123",
          entityId: "woolworths-id",
          entityName: "Woolworths",
          entityUrl: "https://www.notion.so/woolworthsid",
        },
      ],
    });

    const result = await waitForCompletion<ExecuteImportOutput>(sessionId);
    expect(result).toBeDefined();

    expect(result!.imported).toBe(1);
    expect(result!.failed).toEqual([]);
  }, 10000);

  it("returns correct output structure", async () => {
    mockNotionCreate.mockResolvedValue({ id: "page-id" });

    const { sessionId } = await caller.imports.executeImport({
      transactions: [],
    });

    const result = await waitForCompletion(sessionId);
    expect(result).toBeDefined();

    expect(result).toHaveProperty("imported");
    expect(result).toHaveProperty("failed");
    expect(result).toHaveProperty("skipped");
    expect(typeof result!.imported).toBe("number");
    expect(Array.isArray(result!.failed)).toBe(true);
  });

  it("handles Notion API errors gracefully", async () => {
    mockNotionCreate.mockRejectedValue(new Error("Notion API error"));

    const { sessionId } = await caller.imports.executeImport({
      transactions: [
        {
          date: "2026-02-13",
          description: "TEST",
          amount: -100,
          account: "Amex",
          rawRow: "{}",
          checksum: "abc123",
          entityId: "entity-id",
          entityName: "Entity",
          entityUrl: "https://notion.so/entity",
        },
      ],
    });

    const result = await waitForCompletion<ExecuteImportOutput>(sessionId);
    expect(result).toBeDefined();

    expect(result!.imported).toBe(0);
    expect(result!.failed.length).toBe(1);
    expect(result!.failed[0].error).toBe("Notion API error");
  }, 10000);
});

describe("imports.createEntity", () => {
  it("validates input schema (requires name)", async () => {
    await expect(
      caller.imports.createEntity({
        name: undefined as any,
      })
    ).rejects.toThrow();
  });

  it("validates name is non-empty string", async () => {
    await expect(
      caller.imports.createEntity({
        name: "",
      })
    ).rejects.toThrow();
  });

  it("creates entity successfully", async () => {
    mockNotionCreate.mockResolvedValue({ id: "new-entity-id" });

    const result = await caller.imports.createEntity({
      name: "New Merchant",
    });

    expect(result.entityId).toBe("new-entity-id");
    expect(result.entityName).toBe("New Merchant");
    expect(result.entityUrl).toBe("https://www.notion.so/newentityid");
  });

  it("returns correct output structure", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    const result = await caller.imports.createEntity({
      name: "Test Entity",
    });

    expect(result).toHaveProperty("entityId");
    expect(result).toHaveProperty("entityName");
    expect(result).toHaveProperty("entityUrl");
  });

  it("handles entity names with special characters", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    const result = await caller.imports.createEntity({
      name: "McDonald's Café & Grill",
    });

    expect(result.entityName).toBe("McDonald's Café & Grill");
  });

  it("handles very long entity names", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    const longName = "A".repeat(200);
    const result = await caller.imports.createEntity({
      name: longName,
    });

    expect(result.entityName).toBe(longName);
  });

  it("throws error when Notion API fails", async () => {
    mockNotionCreate.mockRejectedValue(new Error("Notion API error"));

    await expect(
      caller.imports.createEntity({
        name: "Test Entity",
      })
    ).rejects.toThrow("Notion API error");
  });

  it("inserts entity into SQLite", async () => {
    mockNotionCreate.mockResolvedValue({ id: "sqlite-test-id" });

    await caller.imports.createEntity({
      name: "SQLite Test Entity",
    });

    const row = db.prepare("SELECT * FROM entities WHERE notion_id = ?").get("sqlite-test-id");
    expect(row).toBeDefined();
    expect((row as any).name).toBe("SQLite Test Entity");
  });
});

describe("imports router - Authorization", () => {
  it("allows authenticated requests (processImport)", async () => {
    mockNotionQuery.mockResolvedValue({ results: [] });

    await expect(
      caller.imports.processImport({
        transactions: [],
        account: "Amex",
      })
    ).resolves.toBeDefined();
  });

  it("allows authenticated requests (executeImport)", async () => {
    await expect(
      caller.imports.executeImport({
        transactions: [],
      })
    ).resolves.toBeDefined();
  });

  it("allows authenticated requests (createEntity)", async () => {
    mockNotionCreate.mockResolvedValue({ id: "entity-id" });

    await expect(
      caller.imports.createEntity({
        name: "Test",
      })
    ).resolves.toBeDefined();
  });

  it("rejects unauthenticated requests", async () => {
    const unauthCaller = createCaller(false);

    await expect(
      unauthCaller.imports.processImport({
        transactions: [],
        account: "Amex",
      })
    ).rejects.toThrow(TRPCError);

    await expect(
      unauthCaller.imports.processImport({
        transactions: [],
        account: "Amex",
      })
    ).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});
