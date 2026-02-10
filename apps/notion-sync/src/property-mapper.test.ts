import { describe, it, expect } from 'vitest';
import type { NotionPage } from './types.js';
import {
  getTitle,
  getRichText,
  getNumber,
  getSelect,
  getMultiSelect,
  getDate,
  getCheckbox,
  getRelationIds,
  getUrl,
} from './property-mapper.js';
import { richText } from './test-helpers.js';

type PageProps = NotionPage['properties'];

describe('getTitle', () => {
  it('extracts plain text from a title property', () => {
    const props: PageProps = {
      Name: { type: 'title', title: richText('Woolworths'), id: 't1' },
    };
    expect(getTitle(props, 'Name')).toBe('Woolworths');
  });

  it('concatenates multiple rich text items', () => {
    const items = richText('Hello');
    items.push(...richText(' World'));
    const props: PageProps = {
      Name: { type: 'title', title: items, id: 't1' },
    };
    expect(getTitle(props, 'Name')).toBe('Hello World');
  });

  it('returns empty string for missing property', () => {
    const props: PageProps = {};
    expect(getTitle(props, 'Name')).toBe('');
  });

  it('returns empty string for wrong property type', () => {
    const props: PageProps = {
      Name: { type: 'number', number: 42, id: 'n1' },
    };
    expect(getTitle(props, 'Name')).toBe('');
  });

  it('returns empty string for empty title array', () => {
    const props: PageProps = {
      Name: { type: 'title', title: [], id: 't1' },
    };
    expect(getTitle(props, 'Name')).toBe('');
  });
});

describe('getRichText', () => {
  it('extracts plain text from a rich_text property', () => {
    const props: PageProps = {
      Notes: { type: 'rich_text', rich_text: richText('Some notes'), id: 'rt1' },
    };
    expect(getRichText(props, 'Notes')).toBe('Some notes');
  });

  it('returns null for missing property', () => {
    const props: PageProps = {};
    expect(getRichText(props, 'Notes')).toBeNull();
  });

  it('returns null for empty rich_text array', () => {
    const props: PageProps = {
      Notes: { type: 'rich_text', rich_text: [], id: 'rt1' },
    };
    expect(getRichText(props, 'Notes')).toBeNull();
  });

  it('returns null for wrong property type', () => {
    const props: PageProps = {
      Notes: { type: 'checkbox', checkbox: true, id: 'c1' },
    };
    expect(getRichText(props, 'Notes')).toBeNull();
  });
});

describe('getNumber', () => {
  it('extracts a number value', () => {
    const props: PageProps = {
      Amount: { type: 'number', number: -42.5, id: 'n1' },
    };
    expect(getNumber(props, 'Amount')).toBe(-42.5);
  });

  it('returns null for null number', () => {
    const props: PageProps = {
      Amount: { type: 'number', number: null, id: 'n1' },
    };
    expect(getNumber(props, 'Amount')).toBeNull();
  });

  it('returns null for missing property', () => {
    const props: PageProps = {};
    expect(getNumber(props, 'Amount')).toBeNull();
  });

  it('handles zero correctly', () => {
    const props: PageProps = {
      Amount: { type: 'number', number: 0, id: 'n1' },
    };
    expect(getNumber(props, 'Amount')).toBe(0);
  });
});

describe('getSelect', () => {
  it('extracts the selected option name', () => {
    const props: PageProps = {
      Account: {
        type: 'select',
        select: { id: 's1', name: 'ANZ Everyday', color: 'blue' },
        id: 'sel1',
      },
    };
    expect(getSelect(props, 'Account')).toBe('ANZ Everyday');
  });

  it('returns null when nothing is selected', () => {
    const props: PageProps = {
      Account: { type: 'select', select: null, id: 'sel1' },
    };
    expect(getSelect(props, 'Account')).toBeNull();
  });

  it('returns null for missing property', () => {
    const props: PageProps = {};
    expect(getSelect(props, 'Account')).toBeNull();
  });
});

describe('getMultiSelect', () => {
  it('extracts option names as string array', () => {
    const props: PageProps = {
      Category: {
        type: 'multi_select',
        multi_select: [
          { id: 'ms1', name: 'Groceries', color: 'green' },
          { id: 'ms2', name: 'Food', color: 'orange' },
        ],
        id: 'msel1',
      },
    };
    expect(getMultiSelect(props, 'Category')).toEqual(['Groceries', 'Food']);
  });

  it('returns empty array for empty multi_select', () => {
    const props: PageProps = {
      Category: { type: 'multi_select', multi_select: [], id: 'msel1' },
    };
    expect(getMultiSelect(props, 'Category')).toEqual([]);
  });

  it('returns empty array for missing property', () => {
    const props: PageProps = {};
    expect(getMultiSelect(props, 'Category')).toEqual([]);
  });
});

describe('getDate', () => {
  it('extracts the start date string', () => {
    const props: PageProps = {
      Date: {
        type: 'date',
        date: { start: '2024-06-15', end: null, time_zone: null },
        id: 'd1',
      },
    };
    expect(getDate(props, 'Date')).toBe('2024-06-15');
  });

  it('extracts datetime with time component', () => {
    const props: PageProps = {
      Date: {
        type: 'date',
        date: { start: '2024-06-15T10:30:00.000+10:00', end: null, time_zone: null },
        id: 'd1',
      },
    };
    expect(getDate(props, 'Date')).toBe('2024-06-15T10:30:00.000+10:00');
  });

  it('returns null for null date', () => {
    const props: PageProps = {
      Date: { type: 'date', date: null, id: 'd1' },
    };
    expect(getDate(props, 'Date')).toBeNull();
  });

  it('returns null for missing property', () => {
    const props: PageProps = {};
    expect(getDate(props, 'Date')).toBeNull();
  });
});

describe('getCheckbox', () => {
  it('extracts true checkbox', () => {
    const props: PageProps = {
      Online: { type: 'checkbox', checkbox: true, id: 'cb1' },
    };
    expect(getCheckbox(props, 'Online')).toBe(true);
  });

  it('extracts false checkbox', () => {
    const props: PageProps = {
      Online: { type: 'checkbox', checkbox: false, id: 'cb1' },
    };
    expect(getCheckbox(props, 'Online')).toBe(false);
  });

  it('returns false for missing property', () => {
    const props: PageProps = {};
    expect(getCheckbox(props, 'Online')).toBe(false);
  });
});

describe('getRelationIds', () => {
  it('extracts page IDs from relation', () => {
    const props: PageProps = {
      Entity: {
        type: 'relation',
        relation: [{ id: 'abc-123' }, { id: 'def-456' }],
        id: 'rel1',
      },
    };
    expect(getRelationIds(props, 'Entity')).toEqual(['abc-123', 'def-456']);
  });

  it('returns empty array for empty relation', () => {
    const props: PageProps = {
      Entity: { type: 'relation', relation: [], id: 'rel1' },
    };
    expect(getRelationIds(props, 'Entity')).toEqual([]);
  });

  it('returns empty array for missing property', () => {
    const props: PageProps = {};
    expect(getRelationIds(props, 'Entity')).toEqual([]);
  });
});

describe('getUrl', () => {
  it('extracts url value', () => {
    const props: PageProps = {
      URL: { type: 'url', url: 'https://example.com/product', id: 'u1' },
    };
    expect(getUrl(props, 'URL')).toBe('https://example.com/product');
  });

  it('returns null for null url', () => {
    const props: PageProps = {
      URL: { type: 'url', url: null, id: 'u1' },
    };
    expect(getUrl(props, 'URL')).toBeNull();
  });

  it('returns null for missing property', () => {
    const props: PageProps = {};
    expect(getUrl(props, 'URL')).toBeNull();
  });

  it('returns null for wrong property type', () => {
    const props: PageProps = {
      URL: { type: 'number', number: 42, id: 'n1' },
    };
    expect(getUrl(props, 'URL')).toBeNull();
  });
});
