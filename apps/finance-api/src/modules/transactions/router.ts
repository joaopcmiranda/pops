/**
 * Transaction tRPC router — CRUD procedures for transactions.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../../trpc.js";
import { paginationMeta } from "../../shared/pagination.js";
import {
  CreateTransactionSchema,
  UpdateTransactionSchema,
  TransactionQuerySchema,
  toTransaction,
  type TransactionFilters,
} from "./types.js";
import * as service from "./service.js";
import { NotFoundError } from "../../shared/errors.js";
import { suggestTags } from "../../shared/tag-suggester.js";

/** Default pagination values. */
const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;

export const transactionsRouter = router({
  /** List transactions with optional filters and pagination. */
  list: protectedProcedure.input(TransactionQuerySchema).query(({ input }) => {
    const limit = input.limit ?? DEFAULT_LIMIT;
    const offset = input.offset ?? DEFAULT_OFFSET;

    const filters: TransactionFilters = {
      search: input.search,
      account: input.account,
      startDate: input.startDate,
      endDate: input.endDate,
      tag: input.tag,
      entityId: input.entityId,
      type: input.type,
    };

    const { rows, total } = service.listTransactions(filters, limit, offset);

    return {
      data: rows.map(toTransaction),
      pagination: paginationMeta(total, limit, offset),
    };
  }),

  /** Get a single transaction by ID. */
  get: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    try {
      const row = service.getTransaction(input.id);
      return { data: toTransaction(row) };
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new TRPCError({ code: "NOT_FOUND", message: err.message });
      }
      throw err;
    }
  }),

  /** Create a new transaction. */
  create: protectedProcedure.input(CreateTransactionSchema).mutation(async ({ input }) => {
    const row = await service.createTransaction(input);
    return {
      data: toTransaction(row),
      message: "Transaction created",
    };
  }),

  /** Update an existing transaction. */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: UpdateTransactionSchema,
      })
    )
    .mutation(async ({ input }) => {
      try {
        const row = await service.updateTransaction(input.id, input.data);
        return {
          data: toTransaction(row),
          message: "Transaction updated",
        };
      } catch (err) {
        if (err instanceof NotFoundError) {
          throw new TRPCError({ code: "NOT_FOUND", message: err.message });
        }
        throw err;
      }
    }),

  /** Delete a transaction. */
  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    try {
      await service.deleteTransaction(input.id);
      return { message: "Transaction deleted" };
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new TRPCError({ code: "NOT_FOUND", message: err.message });
      }
      throw err;
    }
  }),

  /**
   * Suggest tags for a transaction using entity defaults + correction rules.
   * Pure rule-based, no LLM call.
   */
  suggestTags: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        entityId: z.string().nullable().optional(),
      })
    )
    .query(({ input }) => {
      const tags = suggestTags(input.description, input.entityId ?? null);
      return { tags };
    }),
});
