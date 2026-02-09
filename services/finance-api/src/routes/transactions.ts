import { Router } from "express";
import { getDb } from "../db.js";
import type { TransactionQuery } from "../types.js";

const router = Router();

/** GET /transactions — list transactions with optional filters */
router.get("/transactions", (req, res) => {
  const query: TransactionQuery = {
    account: req.query["account"] as string | undefined,
    startDate: req.query["startDate"] as string | undefined,
    endDate: req.query["endDate"] as string | undefined,
    category: req.query["category"] as string | undefined,
    entityId: req.query["entityId"] as string | undefined,
    search: req.query["search"] as string | undefined,
    limit: req.query["limit"] ? Number(req.query["limit"]) : 50,
    offset: req.query["offset"] ? Number(req.query["offset"]) : 0,
  };

  const db = getDb();
  const conditions: string[] = [];
  const params: Record<string, string | number> = {};

  if (query.account) {
    conditions.push("account = @account");
    params["account"] = query.account;
  }
  if (query.startDate) {
    conditions.push("date >= @startDate");
    params["startDate"] = query.startDate;
  }
  if (query.endDate) {
    conditions.push("date <= @endDate");
    params["endDate"] = query.endDate;
  }
  if (query.category) {
    conditions.push("categories LIKE @category");
    params["category"] = `%${query.category}%`;
  }
  if (query.entityId) {
    conditions.push("entity_id = @entityId");
    params["entityId"] = query.entityId;
  }
  if (query.search) {
    conditions.push("description LIKE @search");
    params["search"] = `%${query.search}%`;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = Math.min(query.limit ?? 50, 500);
  const offset = query.offset ?? 0;

  const rows = db
    .prepare(
      `SELECT * FROM transactions ${where} ORDER BY date DESC LIMIT @limit OFFSET @offset`
    )
    .all({ ...params, limit, offset });

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM transactions ${where}`)
    .get(params) as { total: number };

  res.json({ data: rows, total: countRow.total, limit, offset });
});

/** GET /transactions/:id — get a single transaction */
router.get("/transactions/:id", (req, res) => {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM transactions WHERE notion_id = ?")
    .get(req.params["id"]);

  if (!row) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  res.json({ data: row });
});

export default router;
