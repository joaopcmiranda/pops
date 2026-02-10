import type { NotionPage } from './types.js';

/**
 * The properties record from a Notion page query result.
 * Each value is a discriminated union keyed on `type`.
 */
type PageProperties = NotionPage['properties'];
type PageProperty = PageProperties[string];

/**
 * Safely retrieve a property by name, returning undefined if missing.
 */
function getProp(props: PageProperties, key: string): PageProperty | undefined {
  return props[key];
}

/**
 * Extract plain text from a title property.
 * Returns empty string if the property is missing or not a title type.
 */
export function getTitle(props: PageProperties, key: string): string {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'title') return '';
  return prop.title.map((t) => t.plain_text).join('');
}

/**
 * Extract plain text from a rich_text property.
 * Returns null if the property is missing or not rich_text type.
 */
export function getRichText(props: PageProperties, key: string): string | null {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'rich_text') return null;
  const text = prop.rich_text.map((t) => t.plain_text).join('');
  return text || null;
}

/**
 * Extract a number value. Returns null if missing or not a number property.
 */
export function getNumber(props: PageProperties, key: string): number | null {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'number') return null;
  return prop.number;
}

/**
 * Extract the selected option name from a select property.
 * Returns null if nothing is selected or the property is missing.
 */
export function getSelect(props: PageProperties, key: string): string | null {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'select') return null;
  return prop.select?.name ?? null;
}

/**
 * Extract option names from a multi_select property as a string array.
 * Returns an empty array if missing or not multi_select type.
 */
export function getMultiSelect(props: PageProperties, key: string): string[] {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'multi_select') return [];
  return prop.multi_select.map((s) => s.name);
}

/**
 * Extract the start date string from a date property.
 * Returns null if the property is missing, not a date, or has no value.
 */
export function getDate(props: PageProperties, key: string): string | null {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'date') return null;
  return prop.date?.start ?? null;
}

/**
 * Extract a boolean from a checkbox property. Defaults to false if missing.
 */
export function getCheckbox(props: PageProperties, key: string): boolean {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'checkbox') return false;
  return prop.checkbox;
}

/**
 * Extract page IDs from a relation property.
 * Returns an empty array if missing or not a relation type.
 */
export function getRelationIds(props: PageProperties, key: string): string[] {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'relation') return [];
  return prop.relation.map((r) => r.id);
}

/**
 * Extract a URL string from a url property.
 * Returns null if the property is missing, not a url type, or empty.
 */
export function getUrl(props: PageProperties, key: string): string | null {
  const prop = getProp(props, key);
  if (!prop || prop.type !== 'url') return null;
  return prop.url;
}
