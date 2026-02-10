/**
 * Transaction routes — CRUD endpoints for /transactions.
 */
import { Router } from "express";
import { validate } from "../../shared/validate.js";
import { requireParam } from "../../shared/params.js";
import { parsePagination, paginationMeta } from "../../shared/pagination.js";
import {
  CreateTransactionSchema,
  UpdateTransactionSchema,
  TransactionQuerySchema,
  toTransaction,
  type CreateTransactionInput,
  type UpdateTransactionInput,
} from "./types.js";
import * as service from "./service.js";
import type {
  PaginatedResponse,
  ItemResponse,
  MutationResponse,
  DeleteResponse,
} from "../../shared/types.js";
import type { Transaction, TransactionFilters } from "./types.js";

const router = Router();

/** GET /transactions — list transactions with optional filters and pagination. */
router.get("/transactions", validate(TransactionQuerySchema, "query"), (req, res) => {
  const query = req.query as Record<string, string | undefined>;
  const { limit, offset } = parsePagination(req.query as Record<string, unknown>);

  const filters: TransactionFilters = {
    search: query["search"],
    account: query["account"],
    startDate: query["startDate"],
    endDate: query["endDate"],
    category: query["category"],
    entityId: query["entityId"],
    type: query["type"],
    online: query["online"] === "true" ? true : query["online"] === "false" ? false : undefined,
    novatedLease:
      query["novatedLease"] === "true"
        ? true
        : query["novatedLease"] === "false"
          ? false
          : undefined,
    taxReturn:
      query["taxReturn"] === "true" ? true : query["taxReturn"] === "false" ? false : undefined,
  };

  const { rows, total } = service.listTransactions(filters, limit, offset);

  const body: PaginatedResponse<Transaction> = {
    data: rows.map(toTransaction),
    pagination: paginationMeta(total, limit, offset),
  };
  res.json(body);
});

/** GET /transactions/:id — get a single transaction by ID. */
router.get("/transactions/:id", (req, res) => {
  const id = requireParam(req, "id");
  const row = service.getTransaction(id);
  const body: ItemResponse<Transaction> = { data: toTransaction(row) };
  res.json(body);
});

/** POST /transactions — create a new transaction. */
router.post("/transactions", validate(CreateTransactionSchema), (req, res) => {
  const input = req.body as CreateTransactionInput;
  const row = service.createTransaction(input);
  const body: MutationResponse<Transaction> = {
    data: toTransaction(row),
    message: "Transaction created",
  };
  res.status(201).json(body);
});

/** PUT /transactions/:id — update an existing transaction. */
router.put("/transactions/:id", validate(UpdateTransactionSchema), (req, res) => {
  const id = requireParam(req, "id");
  const input = req.body as UpdateTransactionInput;
  const row = service.updateTransaction(id, input);
  const body: MutationResponse<Transaction> = {
    data: toTransaction(row),
    message: "Transaction updated",
  };
  res.json(body);
});

/** DELETE /transactions/:id — delete a transaction. */
router.delete("/transactions/:id", (req, res) => {
  const id = requireParam(req, "id");
  service.deleteTransaction(id);
  const body: DeleteResponse = { message: "Transaction deleted" };
  res.json(body);
});

export default router;
