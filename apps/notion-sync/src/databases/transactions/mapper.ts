import type { NotionPage } from '../../types.js';
import type { TransactionRow } from './types.js';
import {
  getTitle,
  getRichText,
  getNumber,
  getSelect,
  getMultiSelect,
  getDate,
  getRelationIds,
} from '../../property-mapper.js';

/** Map a Notion Balance Sheet page to a TransactionRow. */
export function mapTransaction(
  page: NotionPage,
  entityLookup: Map<string, string>
): TransactionRow {
  const props = page.properties;

  const entityIds = getRelationIds(props, 'Entity');
  const firstEntityId = entityIds[0] ?? null;

  const relatedIds = getRelationIds(props, 'Related Transaction');
  const firstRelatedId = relatedIds[0] ?? null;

  return {
    notionId: page.id,
    description: getTitle(props, 'Description'),
    account: getSelect(props, 'Account') ?? '',
    amount: getNumber(props, 'Amount') ?? 0,
    date: getDate(props, 'Date') ?? '',
    type: getSelect(props, 'Type') ?? '',
    tags: JSON.stringify(getMultiSelect(props, 'Tags')),
    entityId: firstEntityId,
    entityName: firstEntityId ? (entityLookup.get(firstEntityId) ?? null) : null,
    location: getSelect(props, 'Location'),
    country: getSelect(props, 'Country'),
    relatedTransactionId: firstRelatedId,
    notes: getRichText(props, 'Notes'),
    lastEditedTime: page.last_edited_time,
  };
}
