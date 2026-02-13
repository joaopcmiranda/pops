/**
 * Use Claude Haiku to categorize unknown transaction descriptions.
 * Results are cached so each unique description only requires one API call.
 *
 * Only the merchant description is sent to the API — no account numbers,
 * card numbers, or personal identifiers.
 */
import Anthropic from "@anthropic-ai/sdk";
import { getEnv } from "../../../env.js";
import { getDb } from "../../../db.js";
import { logger } from "../../../lib/logger.js";

export interface AiCacheEntry {
  description: string;
  entityName: string;
  category: string;
  cachedAt: string;
}

export interface AiUsageStats {
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
}

// In-memory cache (could be moved to Redis/database later)
const cache = new Map<string, AiCacheEntry>();

/** Clear the in-memory cache (for testing) */
export function clearCache(): void {
  cache.clear();
}

/**
 * AI categorization error - thrown when API fails
 */
export class AiCategorizationError extends Error {
  constructor(
    message: string,
    public readonly code: "NO_API_KEY" | "API_ERROR" | "INSUFFICIENT_CREDITS"
  ) {
    super(message);
    this.name = "AiCategorizationError";
  }
}

export async function categorizeWithAi(
  rawRow: string,
  importBatchId?: string
): Promise<{ result: AiCacheEntry | null; usage?: AiUsageStats }> {
  const key = rawRow.toUpperCase().trim();
  const sanitizedDescription = rawRow.trim().substring(0, 100); // Limit for logging

  const cached = cache.get(key);
  if (cached) {
    logger.debug(
      { description: sanitizedDescription, entityName: cached.entityName, category: cached.category },
      "[AI] Cache hit"
    );

    // Track cache hit
    const db = getDb();
    db.prepare(
      `INSERT INTO ai_usage (description, entity_name, category, input_tokens, output_tokens, cost_usd, cached, import_batch_id, created_at)
       VALUES (?, ?, ?, 0, 0, 0, 1, ?, ?)`
    ).run(rawRow.trim(), cached.entityName, cached.category, importBatchId ?? null, new Date().toISOString());

    return { result: cached };
  }

  const apiKey = getEnv("CLAUDE_API_KEY");
  if (!apiKey) {
    throw new AiCategorizationError("CLAUDE_API_KEY not configured", "NO_API_KEY");
  }

  const db = getDb();

  const client = new Anthropic({ apiKey });

  logger.debug({ description: sanitizedDescription }, "[AI] Calling API (cache miss)");

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Given this bank transaction data, identify the merchant/entity name and a spending category.

Transaction data: ${rawRow}

Reply in JSON only: {"entityName": "...", "category": "..."}
Common categories: Groceries, Dining, Transport, Utilities, Entertainment, Shopping, Health, Insurance, Subscriptions, Income, Transfer, Government, Education, Travel, Rent, Other.`,
        },
      ],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : null;
    if (!text) return { result: null };

    // Strip markdown code fences if present (Claude sometimes wraps JSON in ```json...```)
    const cleanedText = text.trim().replace(/^```(?:json)?\s*\n?/gm, "").replace(/\n?```\s*$/gm, "");
    const parsed = JSON.parse(cleanedText) as { entityName: string; category: string };
    const entry: AiCacheEntry = {
      description: rawRow.trim(),
      entityName: parsed.entityName,
      category: parsed.category,
      cachedAt: new Date().toISOString(),
    };
    cache.set(key, entry);

    // Track API usage and cost
    // Haiku 4.5 pricing: $1.00/MTok input, $5.00/MTok output
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    const costUsd = (inputTokens / 1_000_000) * 1.0 + (outputTokens / 1_000_000) * 5.0;

    db.prepare(
      `INSERT INTO ai_usage (description, entity_name, category, input_tokens, output_tokens, cost_usd, cached, import_batch_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`
    ).run(
      rawRow.trim(),
      parsed.entityName,
      parsed.category,
      inputTokens,
      outputTokens,
      costUsd,
      importBatchId ?? null,
      new Date().toISOString()
    );

    logger.info(
      {
        description: sanitizedDescription,
        entityName: parsed.entityName,
        category: parsed.category,
        inputTokens,
        outputTokens,
        costUsd: costUsd.toFixed(6),
      },
      "[AI] API call successful"
    );

    return {
      result: entry,
      usage: { inputTokens, outputTokens, costUsd },
    };
  } catch (error) {
    logger.error(
      { description: sanitizedDescription, error: error instanceof Error ? error.message : String(error) },
      "[AI] API call failed"
    );

    // Check if it's an Anthropic API error
    if (error && typeof error === "object" && "status" in error) {
      const apiError = error as { status: number; message?: string; error?: { error?: { message?: string } } };

      // Insufficient credits - special handling
      if (apiError.status === 400) {
        const errorMessage =
          apiError.error?.error?.message || (apiError as { message?: string }).message || "Unknown API error";

        if (errorMessage.toLowerCase().includes("credit balance")) {
          throw new AiCategorizationError(
            "Anthropic API credit balance too low. Please add credits at https://console.anthropic.com/settings/plans",
            "INSUFFICIENT_CREDITS"
          );
        }
      }

      // Other API errors
      throw new AiCategorizationError(
        `Anthropic API error: ${apiError.message || "Unknown error"}`,
        "API_ERROR"
      );
    }

    // Generic error
    throw new AiCategorizationError(
      `Failed to categorize: ${error instanceof Error ? error.message : "Unknown error"}`,
      "API_ERROR"
    );
  }
}
