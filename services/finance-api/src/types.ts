/** Query parameters for transaction listing */
export interface TransactionQuery {
  account?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  entityId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

/** Transaction row returned by the API */
export interface Transaction {
  notionId: string;
  description: string;
  account: string;
  amount: number;
  date: string;
  type: string;
  categories: string[];
  entityId: string | null;
  entityName: string | null;
  location: string | null;
  country: string | null;
  online: boolean;
  novatedLease: boolean;
  taxReturn: boolean;
}

/** Entity row returned by the API */
export interface Entity {
  notionId: string;
  name: string;
}

/** Budget summary row */
export interface BudgetSummary {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
}

/** Wish list item */
export interface WishlistItem {
  notionId: string;
  item: string;
  targetAmount: number;
  saved: number;
  priority: string;
}
