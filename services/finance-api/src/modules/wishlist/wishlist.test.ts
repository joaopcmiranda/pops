import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type { Database } from "better-sqlite3";
import { setupTestContext, seedWishListItem, withAuth } from "../../shared/test-utils.js";

const ctx = setupTestContext();
let app: Express;
let db: Database;

beforeEach(() => {
  ({ app, db } = ctx.setup());
});

afterEach(() => {
  ctx.teardown();
});

describe("GET /wishlist", () => {
  it("returns empty list when no items exist", async () => {
    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination.total).toBe(0);
    expect(res.body.pagination.hasMore).toBe(false);
  });

  it("returns all items with correct shape", async () => {
    seedWishListItem(db, { item: "MacBook Pro" });
    seedWishListItem(db, { item: "AirPods Max" });

    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(2);

    // Sorted by item name
    expect(res.body.data[0].item).toBe("AirPods Max");
    expect(res.body.data[1].item).toBe("MacBook Pro");
  });

  it("returns camelCase fields", async () => {
    seedWishListItem(db, {
      item: "MacBook Pro",
      target_amount: 3999,
      saved: 1500,
      last_edited_time: "2025-06-15T10:00:00.000Z",
    });

    const res = await withAuth(request(app).get("/wishlist"));
    const wishItem = res.body.data[0];
    expect(wishItem).toHaveProperty("notionId");
    expect(wishItem).toHaveProperty("targetAmount", 3999);
    expect(wishItem).toHaveProperty("saved", 1500);
    expect(wishItem).toHaveProperty("remainingAmount");
    expect(wishItem).toHaveProperty("lastEditedTime", "2025-06-15T10:00:00.000Z");
    // No snake_case leaking
    expect(wishItem).not.toHaveProperty("notion_id");
    expect(wishItem).not.toHaveProperty("target_amount");
    expect(wishItem).not.toHaveProperty("last_edited_time");
  });

  it("computes remainingAmount when both targetAmount and saved are set", async () => {
    seedWishListItem(db, { item: "MacBook Pro", target_amount: 3999, saved: 1500 });

    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.body.data[0].remainingAmount).toBe(2499);
  });

  it("returns null remainingAmount when targetAmount is null", async () => {
    seedWishListItem(db, { item: "MacBook Pro", target_amount: null, saved: 1500 });

    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.body.data[0].remainingAmount).toBeNull();
  });

  it("returns null remainingAmount when saved is null", async () => {
    seedWishListItem(db, { item: "MacBook Pro", target_amount: 3999, saved: null });

    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.body.data[0].remainingAmount).toBeNull();
  });

  it("returns null remainingAmount when both are null", async () => {
    seedWishListItem(db, { item: "MacBook Pro", target_amount: null, saved: null });

    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.body.data[0].remainingAmount).toBeNull();
  });

  it("filters by search (case-insensitive LIKE on item)", async () => {
    seedWishListItem(db, { item: "MacBook Pro" });
    seedWishListItem(db, { item: "AirPods Max" });
    seedWishListItem(db, { item: "iPad Mini" });

    const res = await withAuth(request(app).get("/wishlist?search=mac"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].item).toBe("MacBook Pro");
    expect(res.body.pagination.total).toBe(1);
  });

  it("filters by priority", async () => {
    seedWishListItem(db, { item: "MacBook Pro", priority: "Needing" });
    seedWishListItem(db, { item: "AirPods Max", priority: "Dreaming" });

    const res = await withAuth(request(app).get("/wishlist?priority=Dreaming"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].item).toBe("AirPods Max");
  });

  it("combines search and priority filters", async () => {
    seedWishListItem(db, { item: "MacBook Pro", priority: "Needing" });
    seedWishListItem(db, { item: "MacBook Air", priority: "Dreaming" });
    seedWishListItem(db, { item: "AirPods Max", priority: "Needing" });

    const res = await withAuth(request(app).get("/wishlist?search=macbook&priority=Needing"));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].item).toBe("MacBook Pro");
  });

  it("paginates with limit and offset", async () => {
    for (let i = 0; i < 10; i++) {
      seedWishListItem(db, { item: `Item ${String(i).padStart(2, "0")}` });
    }

    const page1 = await withAuth(request(app).get("/wishlist?limit=3&offset=0"));
    expect(page1.body.data).toHaveLength(3);
    expect(page1.body.pagination).toEqual({
      total: 10,
      limit: 3,
      offset: 0,
      hasMore: true,
    });

    const page2 = await withAuth(request(app).get("/wishlist?limit=3&offset=3"));
    expect(page2.body.data).toHaveLength(3);
    expect(page2.body.pagination.offset).toBe(3);

    // Names should not overlap
    const page1Items = page1.body.data.map((e: { item: string }) => e.item);
    const page2Items = page2.body.data.map((e: { item: string }) => e.item);
    expect(page1Items).not.toEqual(page2Items);
  });

  it("caps limit at 500", async () => {
    const res = await withAuth(request(app).get("/wishlist?limit=9999"));
    expect(res.body.pagination.limit).toBe(500);
  });

  it("defaults limit to 50 and offset to 0", async () => {
    const res = await withAuth(request(app).get("/wishlist"));
    expect(res.body.pagination.limit).toBe(50);
    expect(res.body.pagination.offset).toBe(0);
  });

  it("returns 401 without auth header", async () => {
    const res = await request(app).get("/wishlist");
    expect(res.status).toBe(401);
  });
});

describe("GET /wishlist/:id", () => {
  it("returns a single item by ID", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro", target_amount: 3999, saved: 1500 });

    const res = await withAuth(request(app).get(`/wishlist/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.data.notionId).toBe(id);
    expect(res.body.data.item).toBe("MacBook Pro");
    expect(res.body.data.targetAmount).toBe(3999);
    expect(res.body.data.saved).toBe(1500);
    expect(res.body.data.remainingAmount).toBe(2499);
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).get("/wishlist/does-not-exist"));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe("POST /wishlist", () => {
  it("creates an item with required fields only", async () => {
    const res = await withAuth(
      request(app).post("/wishlist").send({ item: "MacBook Pro" })
    );

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Wish list item created");
    expect(res.body.data.item).toBe("MacBook Pro");
    expect(res.body.data.notionId).toBeDefined();
    expect(res.body.data.targetAmount).toBeNull();
    expect(res.body.data.saved).toBeNull();
    expect(res.body.data.remainingAmount).toBeNull();
    expect(res.body.data.priority).toBeNull();
    expect(res.body.data.url).toBeNull();
    expect(res.body.data.notes).toBeNull();
  });

  it("creates an item with all fields", async () => {
    const res = await withAuth(
      request(app).post("/wishlist").send({
        item: "MacBook Pro",
        targetAmount: 3999,
        saved: 1500,
        priority: "Needing",
        url: "https://apple.com/macbook-pro",
        notes: "M4 Max, 36GB RAM",
      })
    );

    expect(res.status).toBe(201);
    expect(res.body.data.item).toBe("MacBook Pro");
    expect(res.body.data.targetAmount).toBe(3999);
    expect(res.body.data.saved).toBe(1500);
    expect(res.body.data.remainingAmount).toBe(2499);
    expect(res.body.data.priority).toBe("Needing");
    expect(res.body.data.url).toBe("https://apple.com/macbook-pro");
    expect(res.body.data.notes).toBe("M4 Max, 36GB RAM");
  });

  it("rejects missing item field", async () => {
    const res = await withAuth(
      request(app).post("/wishlist").send({})
    );

    expect(res.status).toBe(400);
  });

  it("rejects empty item field", async () => {
    const res = await withAuth(
      request(app).post("/wishlist").send({ item: "" })
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("rejects invalid priority value", async () => {
    const res = await withAuth(
      request(app).post("/wishlist").send({ item: "Test", priority: "Invalid" })
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("rejects invalid URL", async () => {
    const res = await withAuth(
      request(app).post("/wishlist").send({ item: "Test", url: "not-a-url" })
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
  });

  it("persists to the database", async () => {
    await withAuth(
      request(app).post("/wishlist").send({ item: "New Item" })
    );

    const row = db.prepare("SELECT * FROM wish_list WHERE item = ?").get("New Item");
    expect(row).toBeDefined();
  });

  it("accepts all valid priority values", async () => {
    const priorities = ["Needing", "Soon", "One Day", "Dreaming"];
    for (const priority of priorities) {
      const res = await withAuth(
        request(app).post("/wishlist").send({ item: `Item ${priority}`, priority })
      );
      expect(res.status).toBe(201);
      expect(res.body.data.priority).toBe(priority);
    }
  });
});

describe("PUT /wishlist/:id", () => {
  it("updates a single field", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro" });

    const res = await withAuth(
      request(app).put(`/wishlist/${id}`).send({ priority: "Needing" })
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Wish list item updated");
    expect(res.body.data.item).toBe("MacBook Pro");
    expect(res.body.data.priority).toBe("Needing");
  });

  it("updates multiple fields at once", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro" });

    const res = await withAuth(
      request(app).put(`/wishlist/${id}`).send({
        item: "MacBook Pro M4",
        targetAmount: 4999,
        saved: 2000,
        priority: "Soon",
      })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.item).toBe("MacBook Pro M4");
    expect(res.body.data.targetAmount).toBe(4999);
    expect(res.body.data.saved).toBe(2000);
    expect(res.body.data.priority).toBe("Soon");
    expect(res.body.data.remainingAmount).toBe(2999);
  });

  it("clears a field by setting to null", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro", priority: "Needing" });

    const res = await withAuth(
      request(app).put(`/wishlist/${id}`).send({ priority: null })
    );

    expect(res.status).toBe(200);
    expect(res.body.data.priority).toBeNull();
  });

  it("updates last_edited_time", async () => {
    const id = seedWishListItem(db, {
      item: "MacBook Pro",
      last_edited_time: "2020-01-01T00:00:00.000Z",
    });

    await withAuth(
      request(app).put(`/wishlist/${id}`).send({ priority: "Needing" })
    );

    const row = db.prepare("SELECT last_edited_time FROM wish_list WHERE notion_id = ?").get(id) as { last_edited_time: string };
    expect(row.last_edited_time).not.toBe("2020-01-01T00:00:00.000Z");
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(
      request(app).put("/wishlist/does-not-exist").send({ item: "New Name" })
    );

    expect(res.status).toBe(404);
  });

  it("rejects empty item", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro" });

    const res = await withAuth(
      request(app).put(`/wishlist/${id}`).send({ item: "" })
    );

    expect(res.status).toBe(400);
  });

  it("rejects invalid priority on update", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro" });

    const res = await withAuth(
      request(app).put(`/wishlist/${id}`).send({ priority: "Invalid" })
    );

    expect(res.status).toBe(400);
  });
});

describe("DELETE /wishlist/:id", () => {
  it("deletes an existing item", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro" });

    const res = await withAuth(request(app).delete(`/wishlist/${id}`));
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Wish list item deleted");

    // Verify gone from DB
    const row = db.prepare("SELECT * FROM wish_list WHERE notion_id = ?").get(id);
    expect(row).toBeUndefined();
  });

  it("returns 404 for non-existent ID", async () => {
    const res = await withAuth(request(app).delete("/wishlist/does-not-exist"));
    expect(res.status).toBe(404);
  });

  it("is idempotent — second delete returns 404", async () => {
    const id = seedWishListItem(db, { item: "MacBook Pro" });

    await withAuth(request(app).delete(`/wishlist/${id}`));
    const res = await withAuth(request(app).delete(`/wishlist/${id}`));
    expect(res.status).toBe(404);
  });
});

describe("computed remainingAmount", () => {
  it("computes correctly with positive values", async () => {
    const id = seedWishListItem(db, { item: "Test", target_amount: 1000, saved: 250 });

    const res = await withAuth(request(app).get(`/wishlist/${id}`));
    expect(res.body.data.remainingAmount).toBe(750);
  });

  it("returns negative when saved exceeds target", async () => {
    const id = seedWishListItem(db, { item: "Test", target_amount: 100, saved: 200 });

    const res = await withAuth(request(app).get(`/wishlist/${id}`));
    expect(res.body.data.remainingAmount).toBe(-100);
  });

  it("returns zero when fully saved", async () => {
    const id = seedWishListItem(db, { item: "Test", target_amount: 500, saved: 500 });

    const res = await withAuth(request(app).get(`/wishlist/${id}`));
    expect(res.body.data.remainingAmount).toBe(0);
  });
});
