/**
 * Budget routes — CRUD endpoints for /budgets.
 */
import { Router } from "express";
import { validate } from "../../shared/validate.js";
import { requireParam } from "../../shared/params.js";
import { parsePagination, paginationMeta } from "../../shared/pagination.js";
import {
  CreateBudgetSchema,
  UpdateBudgetSchema,
  BudgetQuerySchema,
  toBudget,
  type CreateBudgetInput,
  type UpdateBudgetInput,
} from "./types.js";
import * as service from "./service.js";
import type {
  PaginatedResponse,
  ItemResponse,
  MutationResponse,
  DeleteResponse,
} from "../../shared/types.js";
import type { Budget } from "./types.js";

const router = Router();

/** GET /budgets — list budgets with optional search/period/active filters and pagination. */
router.get("/budgets", validate(BudgetQuerySchema, "query"), (req, res) => {
  const query = req.query as Record<string, string | undefined>;
  const { limit, offset } = parsePagination(req.query as Record<string, unknown>);

  const activeFilter =
    query["active"] === "true" ? true : query["active"] === "false" ? false : undefined;

  const { rows, total } = service.listBudgets(
    query["search"],
    query["period"],
    activeFilter,
    limit,
    offset
  );

  const body: PaginatedResponse<Budget> = {
    data: rows.map(toBudget),
    pagination: paginationMeta(total, limit, offset),
  };
  res.json(body);
});

/** GET /budgets/:id — get a single budget by ID. */
router.get("/budgets/:id", (req, res) => {
  const id = requireParam(req, "id");
  const row = service.getBudget(id);
  const body: ItemResponse<Budget> = { data: toBudget(row) };
  res.json(body);
});

/** POST /budgets — create a new budget. */
router.post("/budgets", validate(CreateBudgetSchema), (req, res) => {
  const input = req.body as CreateBudgetInput;
  const row = service.createBudget(input);
  const body: MutationResponse<Budget> = {
    data: toBudget(row),
    message: "Budget created",
  };
  res.status(201).json(body);
});

/** PUT /budgets/:id — update an existing budget. */
router.put("/budgets/:id", validate(UpdateBudgetSchema), (req, res) => {
  const id = requireParam(req, "id");
  const input = req.body as UpdateBudgetInput;
  const row = service.updateBudget(id, input);
  const body: MutationResponse<Budget> = {
    data: toBudget(row),
    message: "Budget updated",
  };
  res.json(body);
});

/** DELETE /budgets/:id — delete a budget. */
router.delete("/budgets/:id", (req, res) => {
  const id = requireParam(req, "id");
  service.deleteBudget(id);
  const body: DeleteResponse = { message: "Budget deleted" };
  res.json(body);
});

export default router;
