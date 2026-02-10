import type { Client } from '@notionhq/client';
import type { ParsedTransaction } from './types.js';
import { NOTION_DB } from './types.js';

/**
 * Date + amount count-based deduplication against existing Notion records.
 *
 * For a given date and amount, counts how many records already exist in
 * Notion's Balance Sheet. If the import batch has more of that (date, amount)
 * pair than Notion, the extras are new and should be imported.
 */
export async function findNewTransactions(
  client: Client,
  transactions: ParsedTransaction[],
  account: string
): Promise<ParsedTransaction[]> {
  // Group transactions by (date, amount) tuple
  const groups = new Map<string, ParsedTransaction[]>();
  for (const txn of transactions) {
    const key = `${txn.date}|${txn.amount}`;
    const group = groups.get(key) ?? [];
    group.push(txn);
    groups.set(key, group);
  }

  const newTransactions: ParsedTransaction[] = [];

  for (const [key, batch] of groups) {
    const [date, amountStr] = key.split('|');
    if (!date || !amountStr) continue;
    const amount = Number(amountStr);

    // Count existing records in Notion with same date + amount + account
    const existingCount = await countExisting(client, date, amount, account);
    const newCount = batch.length - existingCount;

    if (newCount > 0) {
      // Take the last N as the new ones
      newTransactions.push(...batch.slice(-newCount));
    }
  }

  return newTransactions;
}

async function countExisting(
  client: Client,
  date: string,
  amount: number,
  account: string
): Promise<number> {
  const response = await client.databases.query({
    database_id: NOTION_DB.BALANCE_SHEET,
    filter: {
      and: [
        { property: 'Date', date: { equals: date } },
        { property: 'Amount', number: { equals: amount } },
        { property: 'Account', select: { equals: account } },
      ],
    },
  });

  return response.results.length;
}
