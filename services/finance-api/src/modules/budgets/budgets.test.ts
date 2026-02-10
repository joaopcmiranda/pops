import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type { Database } from "better-sqlite3";
import { setupTestContext, seedBudget, withAuth } from "../../shared/test-utils.js";

const ctx = setupTestContext();
let app: Express;
let db: Database;

beforeEach(() => {
  ({ app, db } = ctx.setup());
});

afterEach(() => {
  ctx.teardown();
});

describe("GET /budgets", () => {
  it("returns empty list when no budgets exist", async () => {
    const res = await withAuth(request(app).get("/budgets"));
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination.total).toBe(0);
    expect(res.body.pagination.hasMore).toBe(false);
  });

  it("returns all budgets with correct shape", async () => {
    seedBudget(db, { category: "Groceries" });
    seedBudget(db, { category: "Entertainment" });

    const res = await withAuth(request(app).get("/budgets"));
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(2);

    // Sorted by category
    expect(res.body.data[0].category).toBe("Entertainment");
    expect(res.body.data[1].category).toBe("Groceries");
  });

  it("returns camelCase fields", async () => {
    seedBudget(db, {
      category: "Groceries",
      period: "2025-06",
      amount: 500,
      active: 1,
      notes: "Monthly grocery budget",
      last_edited_time: "2025-06-15T10:00:00.000Z",
    });

    const res = await withAuth(request(app).get("/budgets"));
    const budget = res.body.data[0];
    expect(budget).toHaveProperty("notionId");
    expect(budget).toHaveProperty("category", "Groceries");
    expect(budget).toHaveProperty("period", "2025-06");
    expect(budget).toHaveProperty("amount", 500);
    expect(budget).toHaveProperty("active", true);
    expect(budget).toHaveProperty("notes", "Monthly grocery budget");
    expect(budget).toHaveProperty("lastEditedTime", "2025-06-15T10:00:00.000Z");
    // No snake_case leaking
    expect(budget).not.toHaveProperty("notion_id");
    expect(budget).not.toHaveProperty("last_edited_time");
  });

  it("converts active from INTEGER to boolean (active=1)", async () => {
    seedBudget(db, { category: "Groceries", active: 1 });

    const res = await withAuth(request(app).get("/budgets"));
    expect(res.body.data[0].active).toBe(true);
    expect(typeof res.body.data[0].active).toBe("boolean");
  });

  it("converts active from INTEGER to boolean (active=0)", async () => {
    seedBudget(db, { category: "Groceries", active: 0 });

    const res = await withAuth(request(app).get("/budgets"));
    expect(res.body.data[0].active).toBe(false);
    expect(typeof res.body.data[0].active).toBe("boolean");
  });

  it("filters by search (case-insensitive LIKE on category)", async () => {
    seedBudget(db, { category: "Groceries" });
    seedBudget(db, { category: "Entertainment" });
    seedBudget(db, { category: "Dining Out" });

    const res = await withAuth(request(app).get("/budgets?search=grocer"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].category).toBe("Groceries");
    expect(res.body.pagination.total).toBe(1);
  });

  it("filters by period (exact match)", async () => {
    seedBudget(db, { category: "Groceries", period: "2025-06" });
    seedBudget(db, { category: "Entertainment", period: "2025-07" });
    seedBudget(db, { category: "Dining", period: "2025-06" });

    const res = await withAuth(request(app).get("/budgets?period=2025-06"));
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(2);
  });

  it("filters by active=true", async () => {
    seedBudget(db, { category: "Groceries", active: 1 });
    seedBudget(db, { category: "Entertainment", active: 0 });
    seedBudget(db, { category: "Dining", active: 1 });

    const res = await withAuth(request(app).get("/budgets?active=true"));
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data.every((b: { active: boolean }) => b.active === true)).toBe(true);
  });

  it("filters by active=false", async () => {
    seedBudget(db, { category: "Groceries", active: 1 });
    seedBudget(db, { category: "Entertainment", active: 0 });
    seedBudget(db, { category: "Dining", active: 0 });

    const res = await withAuth(request(app).get("/budgets?active=false"));
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data.every((b: { active: boolean }) => b.active === false)).toBe(true);
  });

  it("combines all filters (search, period, active)", async () => {
    seedBudget(db, { category: "Groceries Weekly", period: "2025-06", active: 1 });
    seedBudget(db, { category: "Groceries Monthly", period: "2025-06", active: 0 });
    seedBudget(db, { category: "Entertainment", period: "2025-06", active: 1 });

    const res = await withAuth(request(app).get("/budgets?search=grocer&period=2025-06&active=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].category).toBe("Groceries Weekly");
  });

  it("paginates with limit and offset", async () => {
    for (let i = 0; i < 10; i++) {
      seedBudget(db, { category: `Category ${String(i).padStart(2, "0")}` });
    }

    const page1 = await withAuth(request(app).get("/budgets?limit=3&offset=0"));
    expect(page1.body.data).toHaveLength(3);
    expect(page1.body.pagination).toEqual({
      total: 10,
      limit: 3,
      offset: 0,
      hasMore: true,
    });

    const page2 = await withAuth(request(app).get("/budgets?limit=3&offset=3"));
    expect(page2.body.data).toHaveLength(3);
    expect(page2.body.pagination.offset).toBe(3);

    // Categories should not overlap
    const page1Categories = page1.body.data.map((b: { category: string }) => b.category);
    const page2Categories = page2.body.data.map((b: { category: string }) => b.category);
    expect(page1Categories).not.toEqual(page2Categories);
  });

  it("caps limit at 500", async () => {
    const res = await withAuth(request(app).get("/budgets?limit=9999"));
    expect(res.body.pagination.limit).toBe(500);
  });

  it("defaults limit to 50 and offset to 0", async () => {
    const res = await withAuth(request(app).get("/budgets"));
    expect(res.body.pagination.limit).toBe(50);
    expect(res.body.pagination.offset).toBe(0);
  });

  it("returns 401 without auth header", async () => {
    const res = await request(app).get("/budgets");
    expect(res.status).toBe(401);
  });
});

describe("GET /budgets/:id", () => {
  it("returns a single budget by ID", async () => {
    const id = seedBudget(db, { category: "Groceries", amount: 500 });

    const res = await withAuth(request(app).get(`/budgets/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.data.notionId).toBe(id);
    expect(res.body.data.category).toBe("Groceries");
    expect(res.body.data.amount).toBe(500);
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).get("/budgets/does-not-exist"));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /budgets", () => {
  it("creates a budget with required fields only (just category)", async () => {
    const res = await withAuth(
      request(app).post("/budgets").send({ category: "Groceries" })
    );

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Budget created");
    expect(res.body.data.category).toBe("Groceries");
    expect(res.body.data.notionId).toBeDefined();
    expect(res.body.data.period).toBeNull();
    expect(res.body.data.amount).toBeNull();
    expect(res.body.data.active).toBe(false);
    expect(res.body.data.notes).toBeNull();
  });

  it("creates a budget with all fields", async () => {
    const res = await withAuth(
      request(app).post("/budgets").send({
        category: "Groceries",
        period: "2025-06",
        amount: 500,
        active: true,
        notes: "Monthly grocery budget",
      })
    );

    expect(res.status).toBe(201);
    expect(res.body.data.category).toBe("Groceries");
    expect(res.body.data.period).toBe("2025-06");
    expect(res.body.data.amount).toBe(500);
    expect(res.body.data.active).toBe(true);
    expect(res.body.data.notes).toBe("Monthly grocery budget");
  });

  it("rejects duplicate category+period combination", async () => {
    seedBudget(db, { category: "Groceries", period: "2025-06" });

    const res = await withAuth(
      request(app).post("/budgets").send({
        category: "Groceries",
        period: "2025-06",
      })
    );

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already exists/i);
  });

  it("rejects duplicate category with null period", async () => {
    seedBudget(db, { category: "Groceries", period: null });

    const res = await withAuth(
      request(app).post("/budgets").send({
        category: "Groceries",
      })
    );

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already exists/i);
  });

  it("allows same category with different periods", async () => {
    seedBudget(db, { category: "Groceries", period: "2025-06" });

    const res = await withAuth(
      request(app).post("/budgets").send({
        category: "Groceries",
        period: "2025-07",
      })
    );

    expect(res.status).toBe(201);
    expect(res.body.data.category).toBe("Groceries");
    expect(res.body.data.period).toBe("2025-07");
  });

  it("rejects missing category", async () => {
    const res = await withAuth(
      request(app).post("/budgets").send({})
    );

    expect(res.status).toBe(400);
  });

  it("rejects empty category", async () => {
    const res = await withAuth(
      request(app).post("/budgets").send({ category: "" })
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("persists to the database", async () => {
    await withAuth(
      request(app).post("/budgets").send({ category: "New Budget" })
    );

    const row = db.prepare("SELECT * FROM budgets WHERE category = ?").get("New Budget");
    expect(row).toBeDefined();
  });
});

describe("PUT /budgets/:id", () => {
  it("updates a single field", async () => {
    const id = seedBudget(db, { category: "Groceries" });

    const res = await withAuth(
      request(app).put(`/budgets/${id}`).send({ amount: 600 })
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Budget updated");
    expect(res.body.data.category).toBe("Groceries");
    expect(res.body.data.amount).toBe(600);
  });

  it("updates multiple fields at once", async () => {
    const id = seedBudget(db, { category: "Groceries" });

    const res = await withAuth(
      request(app).put(`/budgets/${id}`).send({
        category: "Food & Groceries",
        period: "2025-06",
        amount: 500,
      })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.category).toBe("Food & Groceries");
    expect(res.body.data.period).toBe("2025-06");
    expect(res.body.data.amount).toBe(500);
  });

  it("clears a field by setting to null", async () => {
    const id = seedBudget(db, { category: "Groceries", amount: 500 });

    const res = await withAuth(
      request(app).put(`/budgets/${id}`).send({ amount: null })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.amount).toBeNull();
  });

  it("toggles active from false to true", async () => {
    const id = seedBudget(db, { category: "Groceries", active: 0 });

    const res = await withAuth(
      request(app).put(`/budgets/${id}`).send({ active: true })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.active).toBe(true);
  });

  it("toggles active from true to false", async () => {
    const id = seedBudget(db, { category: "Groceries", active: 1 });

    const res = await withAuth(
      request(app).put(`/budgets/${id}`).send({ active: false })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.active).toBe(false);
  });

  it("updates last_edited_time", async () => {
    const id = seedBudget(db, {
      category: "Groceries",
      last_edited_time: "2020-01-01T00:00:00.000Z",
    });

    await withAuth(
      request(app).put(`/budgets/${id}`).send({ amount: 500 })
    );

    const row = db.prepare("SELECT last_edited_time FROM budgets WHERE notion_id = ?").get(id) as { last_edited_time: string };
    expect(row.last_edited_time).not.toBe("2020-01-01T00:00:00.000Z");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(
      request(app).put("/budgets/does-not-exist").send({ category: "New Category" })
    );

    expect(res.status).toBe(404);
  });

  it("rejects empty category", async () => {
    const id = seedBudget(db, { category: "Groceries" });

    const res = await withAuth(
      request(app).put(`/budgets/${id}`).send({ category: "" })
    );

    expect(res.status).toBe(400);
  });
});

describe("DELETE /budgets/:id", () => {
  it("deletes an existing budget", async () => {
    const id = seedBudget(db, { category: "Groceries" });

    const res = await withAuth(request(app).delete(`/budgets/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Budget deleted");

    // Verify gone from DB
    const row = db.prepare("SELECT * FROM budgets WHERE notion_id = ?").get(id);
    expect(row).toBeUndefined();
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).delete("/budgets/does-not-exist"));
    expect(res.status).toBe(404);
  });

  it("is idempotent — second delete returns 404", async () => {
    const id = seedBudget(db, { category: "Groceries" });

    await withAuth(request(app).delete(`/budgets/${id}`));
    const res = await withAuth(request(app).delete(`/budgets/${id}`));
    expect(res.status).toBe(404);
  });
});
