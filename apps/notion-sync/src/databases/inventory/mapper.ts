import type { NotionPage } from '../../types.js';
import type { InventoryRow } from './types.js';
import {
  getTitle,
  getRichText,
  getNumber,
  getSelect,
  getDate,
  getCheckbox,
  getRelationIds,
} from '../../property-mapper.js';

/** Map a Notion Home Inventory page to an InventoryRow. */
export function mapInventoryItem(
  page: NotionPage,
  entityLookup: Map<string, string>
): InventoryRow {
  const props = page.properties;

  const purchaseTxIds = getRelationIds(props, 'Purchase Transaction');
  const purchasedFromIds = getRelationIds(props, 'Purchased From');
  const firstPurchasedFromId = purchasedFromIds[0] ?? null;

  return {
    notionId: page.id,
    itemName: getTitle(props, 'Item Name'),
    brand: getRichText(props, 'Brand/Manufacturer'),
    model: getRichText(props, 'Model'),
    itemId: getRichText(props, 'ID'),
    room: getSelect(props, 'Room'),
    location: getSelect(props, 'Location'),
    type: getSelect(props, 'Type'),
    condition: getSelect(props, 'Condition'),
    inUse: getCheckbox(props, 'In-use'),
    deductible: getCheckbox(props, 'Deductible'),
    purchaseDate: getDate(props, 'Purchase Date'),
    warrantyExpires: getDate(props, 'Warranty Expires'),
    replacementValue: getNumber(props, 'Est. Replacement Value'),
    resaleValue: getNumber(props, 'Est. Resale Value'),
    purchaseTransactionId: purchaseTxIds[0] ?? null,
    purchasedFromId: firstPurchasedFromId,
    purchasedFromName: firstPurchasedFromId
      ? (entityLookup.get(firstPurchasedFromId) ?? null)
      : null,
    lastEditedTime: page.last_edited_time,
  };
}
