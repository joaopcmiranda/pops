import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type { Database } from "better-sqlite3";
import { setupTestContext, seedInventoryItem, withAuth } from "../../shared/test-utils.js";

const ctx = setupTestContext();
let app: Express;
let db: Database;

beforeEach(() => {
  ({ app, db } = ctx.setup());
});

afterEach(() => {
  ctx.teardown();
});

describe("GET /inventory", () => {
  it("returns empty list when no items exist", async () => {
    const res = await withAuth(request(app).get("/inventory"));
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination.total).toBe(0);
    expect(res.body.pagination.hasMore).toBe(false);
  });

  it("returns all items with correct shape", async () => {
    seedInventoryItem(db, { item_name: "Laptop" });
    seedInventoryItem(db, { item_name: "Desk" });

    const res = await withAuth(request(app).get("/inventory"));
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(2);

    // Sorted by item_name
    expect(res.body.data[0].itemName).toBe("Desk");
    expect(res.body.data[1].itemName).toBe("Laptop");
  });

  it("returns camelCase fields", async () => {
    seedInventoryItem(db, {
      item_name: "MacBook Pro",
      purchase_date: "2025-01-15",
      warranty_expires: "2027-01-15",
      replacement_value: 2500.0,
      resale_value: 1800.0,
      last_edited_time: "2025-06-15T10:00:00.000Z",
    });

    const res = await withAuth(request(app).get("/inventory"));
    const item = res.body.data[0];
    expect(item).toHaveProperty("notionId");
    expect(item).toHaveProperty("itemName", "MacBook Pro");
    expect(item).toHaveProperty("purchaseDate", "2025-01-15");
    expect(item).toHaveProperty("warrantyExpires", "2027-01-15");
    expect(item).toHaveProperty("replacementValue", 2500.0);
    expect(item).toHaveProperty("resaleValue", 1800.0);
    expect(item).toHaveProperty("lastEditedTime", "2025-06-15T10:00:00.000Z");
    // No snake_case leaking
    expect(item).not.toHaveProperty("notion_id");
    expect(item).not.toHaveProperty("item_name");
    expect(item).not.toHaveProperty("last_edited_time");
  });

  it("converts in_use and deductible from INTEGER to boolean", async () => {
    seedInventoryItem(db, { item_name: "Laptop", in_use: 1, deductible: 0 });
    seedInventoryItem(db, { item_name: "Desk", in_use: 0, deductible: 1 });

    const res = await withAuth(request(app).get("/inventory"));
    expect(res.body.data[0].inUse).toBe(false);
    expect(res.body.data[0].deductible).toBe(true);
    expect(res.body.data[1].inUse).toBe(true);
    expect(res.body.data[1].deductible).toBe(false);
  });

  it("filters by search (case-insensitive LIKE on item_name)", async () => {
    seedInventoryItem(db, { item_name: "MacBook Pro" });
    seedInventoryItem(db, { item_name: "iPhone" });
    seedInventoryItem(db, { item_name: "iPad" });

    const res = await withAuth(request(app).get("/inventory?search=mac"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("MacBook Pro");
    expect(res.body.pagination.total).toBe(1);
  });

  it("filters by room", async () => {
    seedInventoryItem(db, { item_name: "Desk", room: "Office" });
    seedInventoryItem(db, { item_name: "Bed", room: "Bedroom" });

    const res = await withAuth(request(app).get("/inventory?room=Office"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("Desk");
  });

  it("filters by type", async () => {
    seedInventoryItem(db, { item_name: "MacBook", type: "Electronics" });
    seedInventoryItem(db, { item_name: "Desk", type: "Furniture" });

    const res = await withAuth(request(app).get("/inventory?type=Electronics"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("MacBook");
  });

  it("filters by condition", async () => {
    seedInventoryItem(db, { item_name: "Old Laptop", condition: "Fair" });
    seedInventoryItem(db, { item_name: "New Phone", condition: "Excellent" });

    const res = await withAuth(request(app).get("/inventory?condition=Excellent"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("New Phone");
  });

  it("filters by inUse=true", async () => {
    seedInventoryItem(db, { item_name: "Active Laptop", in_use: 1 });
    seedInventoryItem(db, { item_name: "Stored Tablet", in_use: 0 });

    const res = await withAuth(request(app).get("/inventory?inUse=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("Active Laptop");
  });

  it("filters by inUse=false", async () => {
    seedInventoryItem(db, { item_name: "Active Laptop", in_use: 1 });
    seedInventoryItem(db, { item_name: "Stored Tablet", in_use: 0 });

    const res = await withAuth(request(app).get("/inventory?inUse=false"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("Stored Tablet");
  });

  it("filters by deductible=true", async () => {
    seedInventoryItem(db, { item_name: "Business Laptop", deductible: 1 });
    seedInventoryItem(db, { item_name: "Personal Phone", deductible: 0 });

    const res = await withAuth(request(app).get("/inventory?deductible=true"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("Business Laptop");
  });

  it("filters by deductible=false", async () => {
    seedInventoryItem(db, { item_name: "Business Laptop", deductible: 1 });
    seedInventoryItem(db, { item_name: "Personal Phone", deductible: 0 });

    const res = await withAuth(request(app).get("/inventory?deductible=false"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("Personal Phone");
  });

  it("combines multiple filters", async () => {
    seedInventoryItem(db, {
      item_name: "Office Desk",
      room: "Office",
      type: "Furniture",
      in_use: 1,
    });
    seedInventoryItem(db, {
      item_name: "Office Chair",
      room: "Office",
      type: "Furniture",
      in_use: 0,
    });
    seedInventoryItem(db, { item_name: "Laptop", room: "Office", type: "Electronics", in_use: 1 });

    const res = await withAuth(
      request(app).get("/inventory?room=Office&type=Furniture&inUse=true")
    );
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].itemName).toBe("Office Desk");
  });

  it("paginates with limit and offset", async () => {
    for (let i = 0; i < 10; i++) {
      seedInventoryItem(db, { item_name: `Item ${String(i).padStart(2, "0")}` });
    }

    const page1 = await withAuth(request(app).get("/inventory?limit=3&offset=0"));
    expect(page1.body.data).toHaveLength(3);
    expect(page1.body.pagination).toEqual({
      total: 10,
      limit: 3,
      offset: 0,
      hasMore: true,
    });

    const page2 = await withAuth(request(app).get("/inventory?limit=3&offset=3"));
    expect(page2.body.data).toHaveLength(3);
    expect(page2.body.pagination.offset).toBe(3);

    // Names should not overlap
    const page1Names = page1.body.data.map((i: { itemName: string }) => i.itemName);
    const page2Names = page2.body.data.map((i: { itemName: string }) => i.itemName);
    expect(page1Names).not.toEqual(page2Names);
  });

  it("caps limit at 500", async () => {
    const res = await withAuth(request(app).get("/inventory?limit=9999"));
    expect(res.body.pagination.limit).toBe(500);
  });

  it("defaults limit to 50 and offset to 0", async () => {
    const res = await withAuth(request(app).get("/inventory"));
    expect(res.body.pagination.limit).toBe(50);
    expect(res.body.pagination.offset).toBe(0);
  });

  it("returns 401 without auth header", async () => {
    const res = await request(app).get("/inventory");
    expect(res.status).toBe(401);
  });
});

describe("GET /inventory/:id", () => {
  it("returns a single item by ID", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook Pro" });

    const res = await withAuth(request(app).get(`/inventory/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.data.notionId).toBe(id);
    expect(res.body.data.itemName).toBe("MacBook Pro");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).get("/inventory/does-not-exist"));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /inventory", () => {
  it("creates an item with required fields only (itemName)", async () => {
    const res = await withAuth(request(app).post("/inventory").send({ itemName: "MacBook Pro" }));

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Inventory item created");
    expect(res.body.data.itemName).toBe("MacBook Pro");
    expect(res.body.data.notionId).toBeDefined();
    expect(res.body.data.inUse).toBe(false);
    expect(res.body.data.deductible).toBe(false);
    expect(res.body.data.brand).toBeNull();
  });

  it("creates an item with all fields", async () => {
    const res = await withAuth(
      request(app).post("/inventory").send({
        itemName: "MacBook Pro",
        brand: "Apple",
        model: "M2 Max",
        itemId: "SN123456",
        room: "Office",
        location: "Desk",
        type: "Electronics",
        condition: "Excellent",
        inUse: true,
        deductible: true,
        purchaseDate: "2025-01-15",
        warrantyExpires: "2027-01-15",
        replacementValue: 2500.0,
        resaleValue: 1800.0,
        purchaseTransactionId: "txn-123",
        purchasedFromId: "entity-456",
        purchasedFromName: "Apple Store",
      })
    );

    expect(res.status).toBe(201);
    expect(res.body.data.itemName).toBe("MacBook Pro");
    expect(res.body.data.brand).toBe("Apple");
    expect(res.body.data.model).toBe("M2 Max");
    expect(res.body.data.itemId).toBe("SN123456");
    expect(res.body.data.room).toBe("Office");
    expect(res.body.data.location).toBe("Desk");
    expect(res.body.data.type).toBe("Electronics");
    expect(res.body.data.condition).toBe("Excellent");
    expect(res.body.data.inUse).toBe(true);
    expect(res.body.data.deductible).toBe(true);
    expect(res.body.data.purchaseDate).toBe("2025-01-15");
    expect(res.body.data.warrantyExpires).toBe("2027-01-15");
    expect(res.body.data.replacementValue).toBe(2500.0);
    expect(res.body.data.resaleValue).toBe(1800.0);
    expect(res.body.data.purchaseTransactionId).toBe("txn-123");
    expect(res.body.data.purchasedFromId).toBe("entity-456");
    expect(res.body.data.purchasedFromName).toBe("Apple Store");
  });

  it("rejects empty itemName", async () => {
    const res = await withAuth(request(app).post("/inventory").send({ itemName: "" }));

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("rejects missing itemName", async () => {
    const res = await withAuth(request(app).post("/inventory").send({}));

    expect(res.status).toBe(400);
  });

  it("persists to the database", async () => {
    await withAuth(request(app).post("/inventory").send({ itemName: "New Item" }));

    const row = db.prepare("SELECT * FROM home_inventory WHERE item_name = ?").get("New Item");
    expect(row).toBeDefined();
  });

  it("stores boolean fields as INTEGER in DB", async () => {
    await withAuth(
      request(app).post("/inventory").send({
        itemName: "Test Item",
        inUse: true,
        deductible: false,
      })
    );

    const row = db
      .prepare("SELECT in_use, deductible FROM home_inventory WHERE item_name = ?")
      .get("Test Item") as { in_use: number; deductible: number };
    expect(row.in_use).toBe(1);
    expect(row.deductible).toBe(0);
  });
});

describe("PUT /inventory/:id", () => {
  it("updates a single field", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook Pro" });

    const res = await withAuth(request(app).put(`/inventory/${id}`).send({ brand: "Apple" }));

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Inventory item updated");
    expect(res.body.data.itemName).toBe("MacBook Pro");
    expect(res.body.data.brand).toBe("Apple");
  });

  it("updates multiple fields at once", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook" });

    const res = await withAuth(
      request(app).put(`/inventory/${id}`).send({
        itemName: "MacBook Pro",
        brand: "Apple",
        model: "M2 Max",
        room: "Office",
      })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.itemName).toBe("MacBook Pro");
    expect(res.body.data.brand).toBe("Apple");
    expect(res.body.data.model).toBe("M2 Max");
    expect(res.body.data.room).toBe("Office");
  });

  it("clears a field by setting to null", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook", brand: "Apple" });

    const res = await withAuth(request(app).put(`/inventory/${id}`).send({ brand: null }));

    expect(res.status).toBe(200);
    expect(res.body.data.brand).toBeNull();
  });

  it("updates boolean fields", async () => {
    const id = seedInventoryItem(db, { item_name: "Laptop", in_use: 0, deductible: 0 });

    const res = await withAuth(
      request(app).put(`/inventory/${id}`).send({ inUse: true, deductible: true })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.inUse).toBe(true);
    expect(res.body.data.deductible).toBe(true);
  });

  it("updates last_edited_time", async () => {
    const id = seedInventoryItem(db, {
      item_name: "MacBook",
      last_edited_time: "2020-01-01T00:00:00.000Z",
    });

    await withAuth(request(app).put(`/inventory/${id}`).send({ brand: "Apple" }));

    const row = db
      .prepare("SELECT last_edited_time FROM home_inventory WHERE notion_id = ?")
      .get(id) as { last_edited_time: string };
    expect(row.last_edited_time).not.toBe("2020-01-01T00:00:00.000Z");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(
      request(app).put("/inventory/does-not-exist").send({ itemName: "New Name" })
    );

    expect(res.status).toBe(404);
  });

  it("rejects empty itemName", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook" });

    const res = await withAuth(request(app).put(`/inventory/${id}`).send({ itemName: "" }));

    expect(res.status).toBe(400);
  });
});

describe("DELETE /inventory/:id", () => {
  it("deletes an existing item", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook Pro" });

    const res = await withAuth(request(app).delete(`/inventory/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Inventory item deleted");

    // Verify gone from DB
    const row = db.prepare("SELECT * FROM home_inventory WHERE notion_id = ?").get(id);
    expect(row).toBeUndefined();
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).delete("/inventory/does-not-exist"));
    expect(res.status).toBe(404);
  });

  it("is idempotent — second delete returns 404", async () => {
    const id = seedInventoryItem(db, { item_name: "MacBook Pro" });

    await withAuth(request(app).delete(`/inventory/${id}`));
    const res = await withAuth(request(app).delete(`/inventory/${id}`));
    expect(res.status).toBe(404);
  });
});
