import { Router } from "express";

const router = Router();

/**
 * GET /wishlist — list wish list items.
 * Stub: Wish List database doesn't exist in Notion yet (Phase 1 deliverable).
 */
router.get("/wishlist", (_req, res) => {
  // TODO: Implement once Wish List DB exists in Notion and is synced to SQLite
  res.json({ data: [], message: "Wish list not yet implemented" });
});

export default router;
