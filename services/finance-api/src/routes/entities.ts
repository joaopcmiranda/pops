import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

/** GET /entities — list all entities, optionally filter by name */
router.get("/entities", (req, res) => {
  const db = getDb();
  const search = req.query["search"] as string | undefined;

  if (search) {
    const rows = db
      .prepare("SELECT * FROM entities WHERE name LIKE @search ORDER BY name")
      .all({ search: `%${search}%` });
    res.json({ data: rows });
  } else {
    const rows = db
      .prepare("SELECT * FROM entities ORDER BY name")
      .all();
    res.json({ data: rows });
  }
});

export default router;
