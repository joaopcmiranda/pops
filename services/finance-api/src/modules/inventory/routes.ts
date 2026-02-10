/**
 * Inventory routes — CRUD endpoints for /inventory.
 */
import { Router } from "express";
import { validate } from "../../shared/validate.js";
import { requireParam } from "../../shared/params.js";
import { parsePagination, paginationMeta } from "../../shared/pagination.js";
import {
  CreateInventoryItemSchema,
  UpdateInventoryItemSchema,
  InventoryQuerySchema,
  toInventoryItem,
} from "./types.js";
import * as service from "./service.js";
import type {
  PaginatedResponse,
  ItemResponse,
  MutationResponse,
  DeleteResponse,
} from "../../shared/types.js";
import type { InventoryItem } from "./types.js";

const router = Router();

/** GET /inventory — list inventory items with optional filters and pagination. */
router.get("/inventory", validate(InventoryQuerySchema, "query"), (req, res) => {
  const query = req.query as Record<string, string | undefined>;
  const { limit, offset } = parsePagination(req.query as Record<string, unknown>);

  // Parse boolean filters from query strings
  const inUse = query["inUse"] === "true" ? true : query["inUse"] === "false" ? false : undefined;
  const deductible = query["deductible"] === "true" ? true : query["deductible"] === "false" ? false : undefined;

  const { rows, total } = service.listInventoryItems(
    query["search"],
    query["room"],
    query["type"],
    query["condition"],
    inUse,
    deductible,
    limit,
    offset
  );

  const body: PaginatedResponse<InventoryItem> = {
    data: rows.map(toInventoryItem),
    pagination: paginationMeta(total, limit, offset),
  };
  res.json(body);
});

/** GET /inventory/:id — get a single inventory item by ID. */
router.get("/inventory/:id", (req, res) => {
  const id = requireParam(req, "id");
  const row = service.getInventoryItem(id);
  const body: ItemResponse<InventoryItem> = { data: toInventoryItem(row) };
  res.json(body);
});

/** POST /inventory — create a new inventory item. */
router.post("/inventory", validate(CreateInventoryItemSchema), (req, res) => {
  const row = service.createInventoryItem(req.body);
  const body: MutationResponse<InventoryItem> = {
    data: toInventoryItem(row),
    message: "Inventory item created",
  };
  res.status(201).json(body);
});

/** PUT /inventory/:id — update an existing inventory item. */
router.put("/inventory/:id", validate(UpdateInventoryItemSchema), (req, res) => {
  const id = requireParam(req, "id");
  const row = service.updateInventoryItem(id, req.body);
  const body: MutationResponse<InventoryItem> = {
    data: toInventoryItem(row),
    message: "Inventory item updated",
  };
  res.json(body);
});

/** DELETE /inventory/:id — delete an inventory item. */
router.delete("/inventory/:id", (req, res) => {
  const id = requireParam(req, "id");
  service.deleteInventoryItem(id);
  const body: DeleteResponse = { message: "Inventory item deleted" };
  res.json(body);
});

export default router;
