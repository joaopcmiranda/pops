import type { NotionPage } from "../../types.js";
import type { WishListRow } from "./types.js";
import {
  getTitle,
  getRichText,
  getNumber,
  getSelect,
  getUrl,
} from "../../property-mapper.js";

/** Map a Notion Wish List page to a WishListRow. */
export function mapWishListItem(page: NotionPage): WishListRow {
  const props = page.properties;

  return {
    notionId: page.id,
    item: getTitle(props, "Item"),
    targetAmount: getNumber(props, "Target Amount"),
    saved: getNumber(props, "Saved"),
    priority: getSelect(props, "Priority"),
    url: getUrl(props, "URL"),
    notes: getRichText(props, "Notes"),
    lastEditedTime: page.last_edited_time,
  };
}
