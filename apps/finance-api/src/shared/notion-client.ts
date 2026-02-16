/**
 * Shared Notion client factory and database ID helpers.
 * Used across all modules that need to sync with Notion.
 */
import { Client } from "@notionhq/client";
import { requireEnv } from "../env.js";

/**
 * Create Notion client from environment.
 * Reads NOTION_API_TOKEN from environment or Docker secrets.
 * In test mode, returns the mock client if available.
 */
export function getNotionClient(): Client {
  // Check if we're in test mode with a mock client
  // This is a bit of a hack, but avoids circular dependencies
  try {
    // Dynamic import to avoid circular dependency
    const testUtils = require("./test-utils.js");
    const mockClient = testUtils.getMockNotionClient?.();
    if (mockClient) {
      return mockClient;
    }
  } catch {
    // Not in test mode or test-utils not available
  }

  const token = requireEnv("NOTION_API_TOKEN");
  return new Client({ auth: token });
}

/**
 * Get Notion database IDs from environment.
 * These are workspace-specific and loaded from .env (local) or Ansible Vault (production).
 */
export const getBalanceSheetId = () => requireEnv("NOTION_BALANCE_SHEET_ID");
export const getEntitiesDbId = () => requireEnv("NOTION_ENTITIES_DB_ID");
export const getHomeInventoryId = () => requireEnv("NOTION_HOME_INVENTORY_ID");
export const getBudgetId = () => requireEnv("NOTION_BUDGET_ID");
export const getWishListId = () => requireEnv("NOTION_WISH_LIST_ID");
