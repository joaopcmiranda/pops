import type { NotionPage } from '../../types.js';
import type { BudgetRow } from './types.js';
import { getTitle, getRichText, getNumber, getSelect, getCheckbox } from '../../property-mapper.js';

/** Map a Notion Budget page to a BudgetRow. */
export function mapBudget(page: NotionPage): BudgetRow {
  const props = page.properties;

  return {
    notionId: page.id,
    category: getTitle(props, 'Category'),
    period: getSelect(props, 'Period'),
    amount: getNumber(props, 'Amount'),
    active: getCheckbox(props, 'Active'),
    notes: getRichText(props, 'Notes'),
    lastEditedTime: page.last_edited_time,
  };
}
