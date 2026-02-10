/**
 * Entity routes — CRUD endpoints for /entities.
 */
import { Router } from "express";
import { validate } from "../../shared/validate.js";
import { requireParam } from "../../shared/params.js";
import { parsePagination, paginationMeta } from "../../shared/pagination.js";
import {
  CreateEntitySchema,
  UpdateEntitySchema,
  EntityQuerySchema,
  toEntity,
  type CreateEntityInput,
  type UpdateEntityInput,
} from "./types.js";
import * as service from "./service.js";
import type {
  PaginatedResponse,
  ItemResponse,
  MutationResponse,
  DeleteResponse,
} from "../../shared/types.js";
import type { Entity } from "./types.js";

const router = Router();

/** GET /entities — list entities with optional search/type filters and pagination. */
router.get("/entities", validate(EntityQuerySchema, "query"), (req, res) => {
  const query = req.query as Record<string, string | undefined>;
  const { limit, offset } = parsePagination(req.query as Record<string, unknown>);

  const { rows, total } = service.listEntities(query["search"], query["type"], limit, offset);

  const body: PaginatedResponse<Entity> = {
    data: rows.map(toEntity),
    pagination: paginationMeta(total, limit, offset),
  };
  res.json(body);
});

/** GET /entities/:id — get a single entity by ID. */
router.get("/entities/:id", (req, res) => {
  const id = requireParam(req, "id");
  const row = service.getEntity(id);
  const body: ItemResponse<Entity> = { data: toEntity(row) };
  res.json(body);
});

/** POST /entities — create a new entity. */
router.post("/entities", validate(CreateEntitySchema), (req, res) => {
  const input = req.body as CreateEntityInput;
  const row = service.createEntity(input);
  const body: MutationResponse<Entity> = {
    data: toEntity(row),
    message: "Entity created",
  };
  res.status(201).json(body);
});

/** PUT /entities/:id — update an existing entity. */
router.put("/entities/:id", validate(UpdateEntitySchema), (req, res) => {
  const id = requireParam(req, "id");
  const input = req.body as UpdateEntityInput;
  const row = service.updateEntity(id, input);
  const body: MutationResponse<Entity> = {
    data: toEntity(row),
    message: "Entity updated",
  };
  res.json(body);
});

/** DELETE /entities/:id — delete an entity. */
router.delete("/entities/:id", (req, res) => {
  const id = requireParam(req, "id");
  service.deleteEntity(id);
  const body: DeleteResponse = { message: "Entity deleted" };
  res.json(body);
});

export default router;
