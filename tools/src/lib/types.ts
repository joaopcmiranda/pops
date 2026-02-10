/** Notion database IDs for POPS */
export const NOTION_DB = {
  BALANCE_SHEET: '9ad27001-d723-4a3f-8b3a-cf19cf715eec',
  ENTITIES: '3062f475-7765-406e-bde5-117f3e0a473f',
  HOME_INVENTORY: '542bb48c-740c-4848-93ad-eb91c86a612e',
} as const;

/** A parsed transaction from any bank source */
export interface ParsedTransaction {
  date: string;
  description: string;
  amount: number;
  account: string;
  type?: string;
  category?: string;
  location?: string;
  country?: string;
  online?: boolean;
}

/** Entity lookup entry: name -> Notion page URL */
export interface EntityLookup {
  [name: string]: string;
}

/** Result from the entity matching pipeline */
export interface EntityMatch {
  entityName: string;
  entityUrl: string;
  matchType: 'alias' | 'exact' | 'prefix' | 'contains' | 'ai';
}

/** AI categorization cache entry */
export interface AiCacheEntry {
  description: string;
  entityName: string;
  category: string;
  cachedAt: string;
}

/** Import run mode */
export type RunMode = 'dry-run' | 'execute';
