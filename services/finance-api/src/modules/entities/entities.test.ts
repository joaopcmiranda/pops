import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type { Database } from "better-sqlite3";
import { setupTestContext, seedEntity, withAuth } from "../../shared/test-utils.js";

const ctx = setupTestContext();
let app: Express;
let db: Database;

beforeEach(() => {
  ({ app, db } = ctx.setup());
});

afterEach(() => {
  ctx.teardown();
});

describe("GET /entities", () => {
  it("returns empty list when no entities exist", async () => {
    const res = await withAuth(request(app).get("/entities"));
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination.total).toBe(0);
    expect(res.body.pagination.hasMore).toBe(false);
  });

  it("returns all entities with correct shape", async () => {
    seedEntity(db, { name: "Woolworths", type: "Retailer" });
    seedEntity(db, { name: "Coles", type: "Retailer" });

    const res = await withAuth(request(app).get("/entities"));
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(2);

    // Sorted by name
    expect(res.body.data[0].name).toBe("Coles");
    expect(res.body.data[1].name).toBe("Woolworths");
  });

  it("returns camelCase fields", async () => {
    seedEntity(db, {
      name: "Woolworths",
      type: "Retailer",
      default_transaction_type: "Purchase",
      default_category: "Groceries",
      last_edited_time: "2025-06-15T10:00:00.000Z",
    });

    const res = await withAuth(request(app).get("/entities"));
    const entity = res.body.data[0];
    expect(entity).toHaveProperty("notionId");
    expect(entity).toHaveProperty("defaultTransactionType", "Purchase");
    expect(entity).toHaveProperty("defaultCategory", "Groceries");
    expect(entity).toHaveProperty("lastEditedTime", "2025-06-15T10:00:00.000Z");
    // No snake_case leaking
    expect(entity).not.toHaveProperty("notion_id");
    expect(entity).not.toHaveProperty("last_edited_time");
  });

  it("splits comma-separated aliases into array", async () => {
    seedEntity(db, { name: "Woolworths", aliases: "Woolies, WW, Woolworths Group" });

    const res = await withAuth(request(app).get("/entities"));
    expect(res.body.data[0].aliases).toEqual(["Woolies", "WW", "Woolworths Group"]);
  });

  it("returns empty aliases array when null", async () => {
    seedEntity(db, { name: "Woolworths", aliases: null });

    const res = await withAuth(request(app).get("/entities"));
    expect(res.body.data[0].aliases).toEqual([]);
  });

  it("filters by search (case-insensitive LIKE)", async () => {
    seedEntity(db, { name: "Woolworths" });
    seedEntity(db, { name: "Coles" });
    seedEntity(db, { name: "Aldi" });

    const res = await withAuth(request(app).get("/entities?search=wool"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Woolworths");
    expect(res.body.pagination.total).toBe(1);
  });

  it("filters by type", async () => {
    seedEntity(db, { name: "Woolworths", type: "Retailer" });
    seedEntity(db, { name: "ATO", type: "Government" });

    const res = await withAuth(request(app).get("/entities?type=Government"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("ATO");
  });

  it("paginates with limit and offset", async () => {
    for (let i = 0; i < 10; i++) {
      seedEntity(db, { name: `Entity ${String(i).padStart(2, "0")}` });
    }

    const page1 = await withAuth(request(app).get("/entities?limit=3&offset=0"));
    expect(page1.body.data).toHaveLength(3);
    expect(page1.body.pagination).toEqual({
      total: 10,
      limit: 3,
      offset: 0,
      hasMore: true,
    });

    const page2 = await withAuth(request(app).get("/entities?limit=3&offset=3"));
    expect(page2.body.data).toHaveLength(3);
    expect(page2.body.pagination.offset).toBe(3);

    // Names should not overlap
    const page1Names = page1.body.data.map((e: { name: string }) => e.name);
    const page2Names = page2.body.data.map((e: { name: string }) => e.name);
    expect(page1Names).not.toEqual(page2Names);
  });

  it("caps limit at 500", async () => {
    const res = await withAuth(request(app).get("/entities?limit=9999"));
    expect(res.body.pagination.limit).toBe(500);
  });

  it("defaults limit to 50 and offset to 0", async () => {
    const res = await withAuth(request(app).get("/entities"));
    expect(res.body.pagination.limit).toBe(50);
    expect(res.body.pagination.offset).toBe(0);
  });

  it("returns 401 without auth header", async () => {
    const res = await request(app).get("/entities");
    expect(res.status).toBe(401);
  });
});

describe("GET /entities/:id", () => {
  it("returns a single entity by ID", async () => {
    const id = seedEntity(db, { name: "Woolworths" });

    const res = await withAuth(request(app).get(`/entities/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.data.notionId).toBe(id);
    expect(res.body.data.name).toBe("Woolworths");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).get("/entities/does-not-exist"));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /entities", () => {
  it("creates an entity with required fields only", async () => {
    const res = await withAuth(request(app).post("/entities").send({ name: "Woolworths" }));

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Entity created");
    expect(res.body.data.name).toBe("Woolworths");
    expect(res.body.data.notionId).toBeDefined();
    expect(res.body.data.aliases).toEqual([]);
    expect(res.body.data.type).toBeNull();
  });

  it("creates an entity with all fields", async () => {
    const res = await withAuth(
      request(app)
        .post("/entities")
        .send({
          name: "Woolworths",
          type: "Retailer",
          abn: "88000014675",
          aliases: ["Woolies", "WW"],
          defaultTransactionType: "Purchase",
          defaultCategory: "Groceries",
          notes: "Supermarket chain",
        })
    );

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Woolworths");
    expect(res.body.data.type).toBe("Retailer");
    expect(res.body.data.abn).toBe("88000014675");
    expect(res.body.data.aliases).toEqual(["Woolies", "WW"]);
    expect(res.body.data.defaultTransactionType).toBe("Purchase");
    expect(res.body.data.defaultCategory).toBe("Groceries");
    expect(res.body.data.notes).toBe("Supermarket chain");
  });

  it("rejects duplicate entity name", async () => {
    seedEntity(db, { name: "Woolworths" });

    const res = await withAuth(request(app).post("/entities").send({ name: "Woolworths" }));

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already exists/i);
  });

  it("rejects empty name", async () => {
    const res = await withAuth(request(app).post("/entities").send({ name: "" }));

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("rejects missing name", async () => {
    const res = await withAuth(request(app).post("/entities").send({}));

    expect(res.status).toBe(400);
  });

  it("persists to the database", async () => {
    await withAuth(request(app).post("/entities").send({ name: "New Entity" }));

    const row = db.prepare("SELECT * FROM entities WHERE name = ?").get("New Entity");
    expect(row).toBeDefined();
  });
});

describe("PUT /entities/:id", () => {
  it("updates a single field", async () => {
    const id = seedEntity(db, { name: "Woolworths" });

    const res = await withAuth(request(app).put(`/entities/${id}`).send({ type: "Retailer" }));

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Entity updated");
    expect(res.body.data.name).toBe("Woolworths");
    expect(res.body.data.type).toBe("Retailer");
  });

  it("updates multiple fields at once", async () => {
    const id = seedEntity(db, { name: "Woolworths" });

    const res = await withAuth(
      request(app)
        .put(`/entities/${id}`)
        .send({
          name: "Woolworths Group",
          type: "Retailer",
          aliases: ["Woolies", "WW"],
        })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Woolworths Group");
    expect(res.body.data.type).toBe("Retailer");
    expect(res.body.data.aliases).toEqual(["Woolies", "WW"]);
  });

  it("clears a field by setting to null", async () => {
    const id = seedEntity(db, { name: "Woolworths", type: "Retailer" });

    const res = await withAuth(request(app).put(`/entities/${id}`).send({ type: null }));

    expect(res.status).toBe(200);
    expect(res.body.data.type).toBeNull();
  });

  it("updates last_edited_time", async () => {
    const id = seedEntity(db, {
      name: "Woolworths",
      last_edited_time: "2020-01-01T00:00:00.000Z",
    });

    await withAuth(request(app).put(`/entities/${id}`).send({ type: "Retailer" }));

    const row = db.prepare("SELECT last_edited_time FROM entities WHERE notion_id = ?").get(id) as {
      last_edited_time: string;
    };
    expect(row.last_edited_time).not.toBe("2020-01-01T00:00:00.000Z");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(
      request(app).put("/entities/does-not-exist").send({ name: "New Name" })
    );

    expect(res.status).toBe(404);
  });

  it("rejects empty name", async () => {
    const id = seedEntity(db, { name: "Woolworths" });

    const res = await withAuth(request(app).put(`/entities/${id}`).send({ name: "" }));

    expect(res.status).toBe(400);
  });
});

describe("DELETE /entities/:id", () => {
  it("deletes an existing entity", async () => {
    const id = seedEntity(db, { name: "Woolworths" });

    const res = await withAuth(request(app).delete(`/entities/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Entity deleted");

    // Verify gone from DB
    const row = db.prepare("SELECT * FROM entities WHERE notion_id = ?").get(id);
    expect(row).toBeUndefined();
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).delete("/entities/does-not-exist"));
    expect(res.status).toBe(404);
  });

  it("is idempotent — second delete returns 404", async () => {
    const id = seedEntity(db, { name: "Woolworths" });

    await withAuth(request(app).delete(`/entities/${id}`));
    const res = await withAuth(request(app).delete(`/entities/${id}`));
    expect(res.status).toBe(404);
  });
});
