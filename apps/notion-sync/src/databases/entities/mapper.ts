import type { NotionPage } from '../../types.js';
import type { EntityRow } from './types.js';
import { getTitle, getRichText, getSelect, getMultiSelect } from '../../property-mapper.js';

/** Map a Notion Entities page to an EntityRow. */
export function mapEntity(page: NotionPage): EntityRow {
  const props = page.properties;
  const defaultTags = getMultiSelect(props, 'Default Tags');

  return {
    notionId: page.id,
    name: getTitle(props, 'Name'),
    type: getSelect(props, 'Type'),
    abn: getRichText(props, 'ABN'),
    aliases: getRichText(props, 'Aliases'),
    defaultTransactionType: getSelect(props, 'Default Transaction Type'),
    defaultTags: defaultTags.length > 0 ? JSON.stringify(defaultTags) : null,
    notes: getRichText(props, 'Notes'),
    lastEditedTime: page.last_edited_time,
  };
}
