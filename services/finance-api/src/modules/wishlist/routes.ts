/**
 * Wish list routes — CRUD endpoints for /wishlist.
 */
import { Router } from "express";
import { validate } from "../../shared/validate.js";
import { requireParam } from "../../shared/params.js";
import { parsePagination, paginationMeta } from "../../shared/pagination.js";
import {
  CreateWishListItemSchema,
  UpdateWishListItemSchema,
  WishListQuerySchema,
  toWishListItem,
  type CreateWishListItemInput,
  type UpdateWishListItemInput,
} from "./types.js";
import * as service from "./service.js";
import type {
  PaginatedResponse,
  ItemResponse,
  MutationResponse,
  DeleteResponse,
} from "../../shared/types.js";
import type { WishListItem } from "./types.js";

const router = Router();

/** GET /wishlist — list wish list items with optional search/priority filters and pagination. */
router.get("/wishlist", validate(WishListQuerySchema, "query"), (req, res) => {
  const query = req.query as Record<string, string | undefined>;
  const { limit, offset } = parsePagination(req.query as Record<string, unknown>);

  const { rows, total } = service.listWishListItems(
    query["search"],
    query["priority"],
    limit,
    offset
  );

  const body: PaginatedResponse<WishListItem> = {
    data: rows.map(toWishListItem),
    pagination: paginationMeta(total, limit, offset),
  };
  res.json(body);
});

/** GET /wishlist/:id — get a single wish list item by ID. */
router.get("/wishlist/:id", (req, res) => {
  const id = requireParam(req, "id");
  const row = service.getWishListItem(id);
  const body: ItemResponse<WishListItem> = { data: toWishListItem(row) };
  res.json(body);
});

/** POST /wishlist — create a new wish list item. */
router.post("/wishlist", validate(CreateWishListItemSchema), (req, res) => {
  const input = req.body as CreateWishListItemInput;
  const row = service.createWishListItem(input);
  const body: MutationResponse<WishListItem> = {
    data: toWishListItem(row),
    message: "Wish list item created",
  };
  res.status(201).json(body);
});

/** PUT /wishlist/:id — update an existing wish list item. */
router.put("/wishlist/:id", validate(UpdateWishListItemSchema), (req, res) => {
  const id = requireParam(req, "id");
  const input = req.body as UpdateWishListItemInput;
  const row = service.updateWishListItem(id, input);
  const body: MutationResponse<WishListItem> = {
    data: toWishListItem(row),
    message: "Wish list item updated",
  };
  res.json(body);
});

/** DELETE /wishlist/:id — delete a wish list item. */
router.delete("/wishlist/:id", (req, res) => {
  const id = requireParam(req, "id");
  service.deleteWishListItem(id);
  const body: DeleteResponse = { message: "Wish list item deleted" };
  res.json(body);
});

export default router;
