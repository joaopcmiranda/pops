import type { NotionPage } from "../../types.js";
import type { EntityRow } from "./types.js";
import {
  getTitle,
  getRichText,
  getSelect,
  getMultiSelect,
} from "../../property-mapper.js";

/** Map a Notion Entities page to an EntityRow. */
export function mapEntity(page: NotionPage): EntityRow {
  const props = page.properties;
  const defaultCategories = getMultiSelect(props, "Default Category");

  return {
    notionId: page.id,
    name: getTitle(props, "Name"),
    type: getSelect(props, "Type"),
    abn: getRichText(props, "ABN"),
    aliases: getRichText(props, "Aliases"),
    defaultTransactionType: getSelect(props, "Default Transaction Type"),
    defaultCategory: defaultCategories.length > 0
      ? JSON.stringify(defaultCategories)
      : null,
    notes: getRichText(props, "Notes"),
    lastEditedTime: page.last_edited_time,
  };
}
