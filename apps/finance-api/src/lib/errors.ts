/**
 * Error formatting helpers for user-friendly error messages.
 *
 * Converts technical errors into actionable messages with suggestions.
 */
import { AiCategorizationError } from "../modules/imports/lib/ai-categorizer.js";

export interface FormattedError {
  message: string;
  suggestion?: string;
  details?: string;
}

export interface ErrorContext {
  transaction?: string;
}

/**
 * Format import-related errors with user-friendly messages and actionable suggestions.
 */
export function formatImportError(error: unknown, context: ErrorContext = {}): FormattedError {
  // AI categorization errors
  if (error instanceof AiCategorizationError) {
    if (error.code === "NO_API_KEY") {
      return {
        message: "AI categorization unavailable",
        suggestion: "Add CLAUDE_API_KEY to .env file",
        details:
          "AI categorization requires an Anthropic API key. See docs/SETUP.md for instructions.",
      };
    }
    if (error.code === "INSUFFICIENT_CREDITS") {
      return {
        message: "AI API credits exhausted",
        suggestion: "Add credits at console.anthropic.com/settings/plans",
        details: error.message,
      };
    }
    if (error.code === "API_ERROR") {
      return {
        message: "AI categorization failed",
        suggestion:
          "This may be a temporary API issue. Try again or manually categorize the transaction.",
        details: error.message,
      };
    }
  }

  // JSON parse errors (shouldn't happen with markdown stripping, but keep as fallback)
  if (error instanceof SyntaxError && error.message.includes("JSON")) {
    return {
      message: "Invalid AI response format",
      suggestion: "This is a temporary API issue. Try again or manually categorize.",
      details: error.message,
    };
  }

  // Notion API errors
  if (error && typeof error === "object" && "code" in error) {
    const notionError = error as { code: string; message?: string; status?: number };

    if (notionError.code === "object_not_found") {
      return {
        message: "Notion database not found",
        suggestion:
          "Check NOTION_BALANCE_SHEET_ID in .env and verify database is shared with your integration",
        details: "See docs/NOTION_SETUP.md for setup instructions",
      };
    }

    if (notionError.code === "unauthorized") {
      return {
        message: "Notion API authentication failed",
        suggestion: "Check NOTION_API_TOKEN in .env and verify it hasn't expired",
        details: notionError.message,
      };
    }

    if (notionError.code === "validation_error") {
      return {
        message: "Notion API validation error",
        suggestion: "Check that all required properties exist in your Notion database",
        details: notionError.message,
      };
    }

    if (notionError.code === "rate_limited") {
      return {
        message: "Notion API rate limit exceeded",
        suggestion:
          "Wait a moment and try again. Large imports may need to be split into smaller batches.",
        details: notionError.message,
      };
    }
  }

  // Network errors
  if (error instanceof Error && error.message.includes("ECONNREFUSED")) {
    return {
      message: "Connection refused",
      suggestion: "Check that the Notion API is reachable and your internet connection is working",
      details: error.message,
    };
  }

  if (error instanceof Error && error.message.includes("ETIMEDOUT")) {
    return {
      message: "Request timed out",
      suggestion: "Check your internet connection and try again",
      details: error.message,
    };
  }

  // Generic error
  return {
    message: error instanceof Error ? error.message : "Unknown error occurred",
    details: context.transaction,
  };
}
