import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type { Database } from "better-sqlite3";
import { setupTestContext, seedTransaction, withAuth } from "../../shared/test-utils.js";

const ctx = setupTestContext();
let app: Express;
let db: Database;

beforeEach(() => {
  ({ app, db } = ctx.setup());
});

afterEach(() => {
  ctx.teardown();
});

describe("GET /transactions", () => {
  it("returns empty list when no transactions exist", async () => {
    const res = await withAuth(request(app).get("/transactions"));
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination.total).toBe(0);
    expect(res.body.pagination.hasMore).toBe(false);
  });

  it("returns all transactions with correct shape", async () => {
    seedTransaction(db, { description: "Groceries", account: "Up Savings", date: "2025-06-15" });
    seedTransaction(db, { description: "Fuel", account: "ANZ Visa", date: "2025-06-14" });

    const res = await withAuth(request(app).get("/transactions"));
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(2);

    // Sorted by date DESC (newest first)
    expect(res.body.data[0].description).toBe("Groceries");
    expect(res.body.data[1].description).toBe("Fuel");
  });

  it("returns camelCase fields", async () => {
    seedTransaction(db, {
      description: "Test",
      account: "Up",
      amount: 50.0,
      date: "2025-06-15",
      entity_id: "ent-123",
      entity_name: "Woolworths",
      related_transaction_id: "txn-456",
      last_edited_time: "2025-06-15T10:00:00.000Z",
    });

    const res = await withAuth(request(app).get("/transactions"));
    const txn = res.body.data[0];
    expect(txn).toHaveProperty("notionId");
    expect(txn).toHaveProperty("entityId", "ent-123");
    expect(txn).toHaveProperty("entityName", "Woolworths");
    expect(txn).toHaveProperty("relatedTransactionId", "txn-456");
    expect(txn).toHaveProperty("lastEditedTime", "2025-06-15T10:00:00.000Z");
    // No snake_case leaking
    expect(txn).not.toHaveProperty("notion_id");
    expect(txn).not.toHaveProperty("entity_id");
    expect(txn).not.toHaveProperty("last_edited_time");
  });

  it("converts boolean fields from INTEGER", async () => {
    seedTransaction(db, {
      description: "Test",
      account: "Up",
      online: 1,
      novated_lease: 0,
      tax_return: 1,
    });

    const res = await withAuth(request(app).get("/transactions"));
    const txn = res.body.data[0];
    expect(txn.online).toBe(true);
    expect(txn.novatedLease).toBe(false);
    expect(txn.taxReturn).toBe(true);
  });

  it("splits comma-separated categories into array", async () => {
    seedTransaction(db, { description: "Test", account: "Up", categories: "Groceries, Food, Shopping" });

    const res = await withAuth(request(app).get("/transactions"));
    expect(res.body.data[0].categories).toEqual(["Groceries", "Food", "Shopping"]);
  });

  it("returns empty categories array when empty string", async () => {
    seedTransaction(db, { description: "Test", account: "Up", categories: "" });

    const res = await withAuth(request(app).get("/transactions"));
    expect(res.body.data[0].categories).toEqual([]);
  });

  it("filters by search (case-insensitive LIKE)", async () => {
    seedTransaction(db, { description: "Woolworths Groceries", account: "Up" });
    seedTransaction(db, { description: "Coles Groceries", account: "Up" });
    seedTransaction(db, { description: "Fuel Station", account: "Up" });

    const res = await withAuth(request(app).get("/transactions?search=wool"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Woolworths Groceries");
    expect(res.body.pagination.total).toBe(1);
  });

  it("filters by account", async () => {
    seedTransaction(db, { description: "Test 1", account: "Up Savings" });
    seedTransaction(db, { description: "Test 2", account: "ANZ Visa" });

    const res = await withAuth(request(app).get("/transactions?account=ANZ%20Visa"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Test 2");
  });

  it("filters by startDate", async () => {
    seedTransaction(db, { description: "Old", account: "Up", date: "2025-01-01" });
    seedTransaction(db, { description: "Recent", account: "Up", date: "2025-06-01" });

    const res = await withAuth(request(app).get("/transactions?startDate=2025-05-01"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Recent");
  });

  it("filters by endDate", async () => {
    seedTransaction(db, { description: "Old", account: "Up", date: "2025-01-01" });
    seedTransaction(db, { description: "Recent", account: "Up", date: "2025-06-01" });

    const res = await withAuth(request(app).get("/transactions?endDate=2025-02-01"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Old");
  });

  it("filters by date range", async () => {
    seedTransaction(db, { description: "Before", account: "Up", date: "2025-01-01" });
    seedTransaction(db, { description: "Within", account: "Up", date: "2025-03-15" });
    seedTransaction(db, { description: "After", account: "Up", date: "2025-06-01" });

    const res = await withAuth(request(app).get("/transactions?startDate=2025-03-01&endDate=2025-04-01"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Within");
  });

  it("filters by category (partial LIKE match)", async () => {
    seedTransaction(db, { description: "Test 1", account: "Up", categories: "Groceries, Food" });
    seedTransaction(db, { description: "Test 2", account: "Up", categories: "Transport" });

    const res = await withAuth(request(app).get("/transactions?category=Groc"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Test 1");
  });

  it("filters by entityId", async () => {
    seedTransaction(db, { description: "Test 1", account: "Up", entity_id: "ent-123" });
    seedTransaction(db, { description: "Test 2", account: "Up", entity_id: "ent-456" });

    const res = await withAuth(request(app).get("/transactions?entityId=ent-123"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Test 1");
  });

  it("filters by type", async () => {
    seedTransaction(db, { description: "Test 1", account: "Up", type: "Purchase" });
    seedTransaction(db, { description: "Test 2", account: "Up", type: "Transfer" });

    const res = await withAuth(request(app).get("/transactions?type=Purchase"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Test 1");
  });

  it("filters by online=true", async () => {
    seedTransaction(db, { description: "Online", account: "Up", online: 1 });
    seedTransaction(db, { description: "In-store", account: "Up", online: 0 });

    const res = await withAuth(request(app).get("/transactions?online=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Online");
  });

  it("filters by novatedLease=true", async () => {
    seedTransaction(db, { description: "Novated", account: "Up", novated_lease: 1 });
    seedTransaction(db, { description: "Regular", account: "Up", novated_lease: 0 });

    const res = await withAuth(request(app).get("/transactions?novatedLease=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Novated");
  });

  it("filters by taxReturn=true", async () => {
    seedTransaction(db, { description: "Deductible", account: "Up", tax_return: 1 });
    seedTransaction(db, { description: "Non-deductible", account: "Up", tax_return: 0 });

    const res = await withAuth(request(app).get("/transactions?taxReturn=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Deductible");
  });

  it("combines multiple filters", async () => {
    seedTransaction(db, { description: "Match", account: "Up", date: "2025-06-01", type: "Purchase", online: 1 });
    seedTransaction(db, { description: "Wrong account", account: "ANZ", date: "2025-06-01", type: "Purchase", online: 1 });
    seedTransaction(db, { description: "Wrong date", account: "Up", date: "2025-01-01", type: "Purchase", online: 1 });
    seedTransaction(db, { description: "Wrong type", account: "Up", date: "2025-06-01", type: "Transfer", online: 1 });

    const res = await withAuth(request(app).get("/transactions?account=Up&startDate=2025-05-01&type=Purchase&online=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].description).toBe("Match");
  });

  it("paginates with limit and offset", async () => {
    for (let i = 0; i < 10; i++) {
      seedTransaction(db, { description: `Transaction ${String(i).padStart(2, "0")}`, account: "Up", date: `2025-06-${String(i + 1).padStart(2, "0")}` });
    }

    const page1 = await withAuth(request(app).get("/transactions?limit=3&offset=0"));
    expect(page1.body.data).toHaveLength(3);
    expect(page1.body.pagination).toEqual({
      total: 10,
      limit: 3,
      offset: 0,
      hasMore: true,
    });

    const page2 = await withAuth(request(app).get("/transactions?limit=3&offset=3"));
    expect(page2.body.data).toHaveLength(3);
    expect(page2.body.pagination.offset).toBe(3);

    // Descriptions should not overlap
    const page1Descs = page1.body.data.map((t: { description: string }) => t.description);
    const page2Descs = page2.body.data.map((t: { description: string }) => t.description);
    expect(page1Descs).not.toEqual(page2Descs);
  });

  it("caps limit at 500", async () => {
    const res = await withAuth(request(app).get("/transactions?limit=9999"));
    expect(res.body.pagination.limit).toBe(500);
  });

  it("defaults limit to 50 and offset to 0", async () => {
    const res = await withAuth(request(app).get("/transactions"));
    expect(res.body.pagination.limit).toBe(50);
    expect(res.body.pagination.offset).toBe(0);
  });

  it("returns 401 without auth header", async () => {
    const res = await request(app).get("/transactions");
    expect(res.status).toBe(401);
  });
});

describe("GET /transactions/:id", () => {
  it("returns a single transaction by ID", async () => {
    const id = seedTransaction(db, { description: "Groceries", account: "Up" });

    const res = await withAuth(request(app).get(`/transactions/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.data.notionId).toBe(id);
    expect(res.body.data.description).toBe("Groceries");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).get("/transactions/does-not-exist"));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /transactions", () => {
  it("creates a transaction with required fields only", async () => {
    const res = await withAuth(
      request(app).post("/transactions").send({
        description: "Test Transaction",
        account: "Up Savings",
        amount: 50.0,
        date: "2025-06-15",
        type: "Purchase",
      })
    );

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Transaction created");
    expect(res.body.data.description).toBe("Test Transaction");
    expect(res.body.data.account).toBe("Up Savings");
    expect(res.body.data.amount).toBe(50.0);
    expect(res.body.data.date).toBe("2025-06-15");
    expect(res.body.data.type).toBe("Purchase");
    expect(res.body.data.notionId).toBeDefined();
    expect(res.body.data.categories).toEqual([]);
    expect(res.body.data.online).toBe(false);
    expect(res.body.data.novatedLease).toBe(false);
    expect(res.body.data.taxReturn).toBe(false);
  });

  it("creates a transaction with all fields", async () => {
    const res = await withAuth(
      request(app).post("/transactions").send({
        description: "Woolworths Groceries",
        account: "Up Savings",
        amount: 150.75,
        date: "2025-06-15",
        type: "Purchase",
        categories: ["Groceries", "Food"],
        entityId: "ent-123",
        entityName: "Woolworths",
        location: "Sydney CBD",
        country: "Australia",
        online: false,
        novatedLease: false,
        taxReturn: false,
        relatedTransactionId: "txn-456",
        notes: "Weekly groceries",
      })
    );

    expect(res.status).toBe(201);
    expect(res.body.data.description).toBe("Woolworths Groceries");
    expect(res.body.data.categories).toEqual(["Groceries", "Food"]);
    expect(res.body.data.entityId).toBe("ent-123");
    expect(res.body.data.entityName).toBe("Woolworths");
    expect(res.body.data.location).toBe("Sydney CBD");
    expect(res.body.data.country).toBe("Australia");
    expect(res.body.data.online).toBe(false);
    expect(res.body.data.novatedLease).toBe(false);
    expect(res.body.data.taxReturn).toBe(false);
    expect(res.body.data.relatedTransactionId).toBe("txn-456");
    expect(res.body.data.notes).toBe("Weekly groceries");
  });

  it("rejects missing required fields", async () => {
    const res = await withAuth(
      request(app).post("/transactions").send({
        description: "Test",
        // Missing account, amount, date, type
      })
    );

    expect(res.status).toBe(400);
  });

  it("rejects empty description", async () => {
    const res = await withAuth(
      request(app).post("/transactions").send({
        description: "",
        account: "Up",
        amount: 50.0,
        date: "2025-06-15",
        type: "Purchase",
      })
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("persists to the database", async () => {
    await withAuth(
      request(app).post("/transactions").send({
        description: "Test Transaction",
        account: "Up",
        amount: 50.0,
        date: "2025-06-15",
        type: "Purchase",
      })
    );

    const row = db.prepare("SELECT * FROM transactions WHERE description = ?").get("Test Transaction");
    expect(row).toBeDefined();
  });
});

describe("PUT /transactions/:id", () => {
  it("updates a single field", async () => {
    const id = seedTransaction(db, { description: "Original", account: "Up", amount: 50.0, date: "2025-06-15" });

    const res = await withAuth(
      request(app).put(`/transactions/${id}`).send({ description: "Updated" })
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Transaction updated");
    expect(res.body.data.description).toBe("Updated");
    expect(res.body.data.account).toBe("Up");
  });

  it("updates multiple fields at once", async () => {
    const id = seedTransaction(db, { description: "Test", account: "Up", amount: 50.0, date: "2025-06-15" });

    const res = await withAuth(
      request(app).put(`/transactions/${id}`).send({
        description: "New Description",
        amount: 100.0,
        categories: ["Shopping", "Retail"],
      })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.description).toBe("New Description");
    expect(res.body.data.amount).toBe(100.0);
    expect(res.body.data.categories).toEqual(["Shopping", "Retail"]);
  });

  it("clears a field by setting to null", async () => {
    const id = seedTransaction(db, { description: "Test", account: "Up", notes: "Some notes" });

    const res = await withAuth(
      request(app).put(`/transactions/${id}`).send({ notes: null })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.notes).toBeNull();
  });

  it("updates last_edited_time", async () => {
    const id = seedTransaction(db, {
      description: "Test",
      account: "Up",
      last_edited_time: "2020-01-01T00:00:00.000Z",
    });

    await withAuth(
      request(app).put(`/transactions/${id}`).send({ amount: 100.0 })
    );

    const row = db.prepare("SELECT last_edited_time FROM transactions WHERE notion_id = ?").get(id) as { last_edited_time: string };
    expect(row.last_edited_time).not.toBe("2020-01-01T00:00:00.000Z");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(
      request(app).put("/transactions/does-not-exist").send({ description: "Updated" })
    );

    expect(res.status).toBe(404);
  });

  it("rejects empty description", async () => {
    const id = seedTransaction(db, { description: "Test", account: "Up" });

    const res = await withAuth(
      request(app).put(`/transactions/${id}`).send({ description: "" })
    );

    expect(res.status).toBe(400);
  });
});

describe("DELETE /transactions/:id", () => {
  it("deletes an existing transaction", async () => {
    const id = seedTransaction(db, { description: "To Delete", account: "Up" });

    const res = await withAuth(request(app).delete(`/transactions/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Transaction deleted");

    // Verify gone from DB
    const row = db.prepare("SELECT * FROM transactions WHERE notion_id = ?").get(id);
    expect(row).toBeUndefined();
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).delete("/transactions/does-not-exist"));
    expect(res.status).toBe(404);
  });

  it("is idempotent — second delete returns 404", async () => {
    const id = seedTransaction(db, { description: "To Delete", account: "Up" });

    await withAuth(request(app).delete(`/transactions/${id}`));
    const res = await withAuth(request(app).delete(`/transactions/${id}`));
    expect(res.status).toBe(404);
  });
});
