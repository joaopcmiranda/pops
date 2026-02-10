/**
 * Shared test utilities for notion-sync tests.
 * Provides Notion page mock builders that match the NotionPage type shape.
 */
import type { NotionPage } from './types.js';

type PageProps = NotionPage['properties'];

/** Stub user object required by NotionPage. */
export const STUB_USER = { id: 'user-1', object: 'user' as const };

/** Build a rich text array from a plain string, matching Notion's API shape. */
export function richText(text: string): Array<{
  type: 'text';
  text: { content: string; link: null };
  annotations: {
    bold: false;
    italic: false;
    strikethrough: false;
    underline: false;
    code: false;
    color: 'default';
  };
  plain_text: string;
  href: null;
}> {
  if (!text) return [];
  return [
    {
      type: 'text',
      text: { content: text, link: null },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default',
      },
      plain_text: text,
      href: null,
    },
  ];
}

/** Construct a minimal NotionPage-compatible object for testing. */
export function makePage(id: string, props: PageProps, lastEdited: string): NotionPage {
  return {
    object: 'page',
    id,
    created_time: '2024-01-01T00:00:00.000Z',
    last_edited_time: lastEdited,
    created_by: STUB_USER,
    last_edited_by: STUB_USER,
    archived: false,
    in_trash: false,
    url: `https://notion.so/${id}`,
    public_url: null,
    icon: null,
    cover: null,
    parent: { type: 'database_id', database_id: 'db-1' },
    properties: props,
  };
}
