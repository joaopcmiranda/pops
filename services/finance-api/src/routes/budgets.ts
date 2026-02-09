import { Router } from "express";

const router = Router();

/**
 * GET /budgets — list budget allocations.
 * Stub: Budget database doesn't exist in Notion yet (Phase 1 deliverable).
 */
router.get("/budgets", (_req, res) => {
  // TODO: Implement once Budget DB exists in Notion and is synced to SQLite
  res.json({ data: [], message: "Budget tracking not yet implemented" });
});

/** GET /budgets/summary — spending vs allocation per category */
router.get("/budgets/summary", (_req, res) => {
  // TODO: Implement once Budget DB exists
  res.json({ data: [], message: "Budget summary not yet implemented" });
});

export default router;
