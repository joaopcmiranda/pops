/**
 * Import service — entity matching, deduplication, and Notion writes.
 *
 * Key features:
 * - Universal entity matching (same algorithm for all banks)
 * - Checksum-based deduplication (more reliable than date+amount)
 * - AI fallback with full row context
 * - Batch writes with rate limiting
 */
import { getDb } from "../../db.js";
import { logger } from "../../lib/logger.js";
import { formatImportError } from "../../lib/errors.js";
import { matchEntity } from "./lib/entity-matcher.js";
import { categorizeWithAi, AiCategorizationError } from "./lib/ai-categorizer.js";
import { setProgress, updateProgress } from "./progress-store.js";
import { findMatchingCorrection } from "../corrections/service.js";
import {
  getNotionClient,
  getBalanceSheetId,
  getEntitiesDbId,
} from "../../shared/notion-client.js";
import { createTransaction } from "../transactions/service.js";
import type { Client } from "@notionhq/client";
import type {
  ParsedTransaction,
  ProcessedTransaction,
  ConfirmedTransaction,
  EntityMatch,
  ProcessImportOutput,
  ExecuteImportOutput,
  CreateEntityOutput,
  ImportResult,
  ImportWarning,
  AiUsageStats,
} from "./types.js";

const CONCURRENCY = 3;
const DELAY_MS = 400;

/**
 * Load entity lookup from SQLite: name → notion_id
 */
function loadEntityLookup(): Record<string, string> {
  const db = getDb();
  const rows = db.prepare("SELECT name, notion_id FROM entities").all() as Array<{
    name: string;
    notion_id: string;
  }>;

  const lookup: Record<string, string> = {};
  for (const row of rows) {
    lookup[row.name] = row.notion_id;
  }
  return lookup;
}

/**
 * Load aliases from SQLite: alias → entity name
 * Aliases are stored as comma-separated strings in the aliases column
 */
function loadAliases(): Record<string, string> {
  const db = getDb();
  const rows = db.prepare("SELECT name, aliases FROM entities WHERE aliases IS NOT NULL").all() as Array<{
    name: string;
    aliases: string;
  }>;

  const aliasMap: Record<string, string> = {};
  for (const row of rows) {
    const aliases = row.aliases.split(",").map((a) => a.trim());
    for (const alias of aliases) {
      aliasMap[alias] = row.name;
    }
  }
  return aliasMap;
}

/**
 * Query Notion for existing checksums
 * Returns set of checksums that already exist, and any error that occurred
 *
 * NOTE: Requires "Checksum" property to exist in Notion Balance Sheet.
 * If property doesn't exist, this will fail and we'll fall back to returning empty set.
 */
async function findExistingChecksums(
  client: Client,
  checksums: string[]
): Promise<{ checksums: Set<string>; error?: { type: string; message: string; details?: string } }> {
  try {
    // Query in batches of 100 (Notion filter limit)
    const existingChecksums = new Set<string>();

    for (let i = 0; i < checksums.length; i += 100) {
      const batch = checksums.slice(i, i + 100);

      const response = await client.databases.query({
        database_id: getBalanceSheetId(),
        filter: {
          or: batch.map((checksum) => ({
            property: "Checksum",
            rich_text: { equals: checksum },
          })),
        },
      });

      for (const page of response.results) {
        if ("properties" in page) {
          const checksumProp = page.properties["Checksum"];
          if (checksumProp?.type === "rich_text") {
            const richText = checksumProp.rich_text;
            if (Array.isArray(richText) && richText[0]?.plain_text) {
              existingChecksums.add(richText[0].plain_text);
            }
          }
        }
      }
    }

    return { checksums: existingChecksums };
  } catch (error) {
    console.warn("[imports] Failed to query checksums from Notion:", error);
    console.warn("[imports] Checksum property may not exist. Skipping deduplication.");

    // Determine error type
    let errorType = "NOTION_API_ERROR";
    let errorMessage = "Failed to query Notion for duplicates";
    let errorDetails: string | undefined;

    if (error && typeof error === "object" && "code" in error) {
      const notionError = error as { code: string; message?: string; status?: number };

      if (notionError.code === "object_not_found") {
        errorType = "NOTION_DATABASE_NOT_FOUND";
        errorMessage = `Database not found. Check that NOTION_BALANCE_SHEET_ID is correct and the database is shared with your integration.`;
        errorDetails = notionError.message;
      } else if (notionError.code === "validation_error" && notionError.message?.includes("Checksum")) {
        errorType = "DEDUPLICATION_DISABLED";
        errorMessage = `Deduplication disabled: Notion database is missing the "Checksum" property. All transactions will be processed (duplicates may occur).`;
        errorDetails = `To enable deduplication, add a "Rich text" property named "Checksum" to your Balance Sheet database.`;
      } else {
        errorMessage = notionError.message || errorMessage;
        errorDetails = `Code: ${notionError.code}, Status: ${notionError.status}`;
      }
    } else if (error instanceof Error) {
      errorDetails = error.message;
    }

    return {
      checksums: new Set(),
      error: { type: errorType, message: errorMessage, details: errorDetails },
    };
  }
}

/**
 * Process import batch: deduplicate and match entities
 */
export async function processImport(
  transactions: ParsedTransaction[],
  account: string
): Promise<ProcessImportOutput> {
  const client = getNotionClient();

  // Generate unique batch ID for tracking AI usage
  const importBatchId = `import-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  logger.info({ importBatchId, account, totalCount: transactions.length }, "[Import] Starting processImport");

  // Step 1: Checksum-based deduplication
  logger.info({ checksumCount: transactions.length }, "[Import] Querying Notion for existing checksums");
  const checksums = transactions.map((t) => t.checksum);
  const deduplicationResult = await findExistingChecksums(client, checksums);
  const existingChecksums = deduplicationResult.checksums;

  logger.info(
    { duplicateCount: existingChecksums.size, newCount: transactions.length - existingChecksums.size },
    "[Import] Deduplication complete"
  );

  const newTransactions = transactions.filter((t) => !existingChecksums.has(t.checksum));
  const duplicates = transactions.filter((t) => existingChecksums.has(t.checksum));

  // Step 2: Load entity lookup and aliases
  const entityLookup = loadEntityLookup();
  const aliases = loadAliases();

  // Step 3: Match entities for each transaction
  const matched: ProcessedTransaction[] = [];
  const uncertain: ProcessedTransaction[] = [];
  const failed: ProcessedTransaction[] = [];
  const skipped: ProcessedTransaction[] = duplicates.map((t) => ({
    ...t,
    entity: { matchType: "none" as const },
    status: "skipped" as const,
    skipReason: "Duplicate transaction (checksum match)",
  }));

  // Track AI categorization issues and usage
  let aiError: AiCategorizationError | null = null;
  let aiFailureCount = 0;
  let aiApiCalls = 0;
  let aiCacheHits = 0;
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCostUsd = 0;

  for (let i = 0; i < newTransactions.length; i++) {
    const transaction = newTransactions[i];
    if (!transaction) continue;

    try {
      // Step 1: Apply learned corrections (highest priority)
      const correction = findMatchingCorrection(transaction.description, 0.7);

      if (correction && correction.entity_id) {
        logger.debug(
          {
            index: i + 1,
            total: newTransactions.length,
            description: transaction.description.substring(0, 50),
            entityName: correction.entity_name,
            confidence: correction.confidence,
          },
          "[Import] Applied learned correction"
        );

        matched.push({
          ...transaction,
          location: correction.location ?? transaction.location,
          online: correction.online !== null ? correction.online === 1 : transaction.online,
          entity: {
            entityId: correction.entity_id,
            entityName: correction.entity_name ?? "Unknown",
            entityUrl: `https://www.notion.so/${correction.entity_id.replace(/-/g, "")}`,
            matchType: "learned" as never, // UI-only matchType
            confidence: correction.confidence,
          },
          status: correction.confidence >= 0.9 ? "matched" : "uncertain",
        });
        continue; // Skip to next transaction
      }

      // Step 2: Try universal entity matching
      const match = matchEntity(transaction.description, entityLookup, aliases);

      if (match) {
        logger.debug(
          {
            index: i + 1,
            total: newTransactions.length,
            description: transaction.description.substring(0, 50),
            entityName: match.entityName,
            matchType: match.matchType,
          },
          "[Import] Entity matched"
        );
        // Good match - add to matched list
        const entityId = entityLookup[match.entityName];
        if (!entityId) {
          throw new Error(`Entity lookup failed for matched entity: ${match.entityName}`);
        }

        matched.push({
          ...transaction,
          entity: {
            entityId,
            entityName: match.entityName,
            entityUrl: `https://www.notion.so/${entityId.replace(/-/g, "")}`,
            matchType: match.matchType,
          },
          status: "matched",
        });
      } else {
        // No match - try AI categorization
        let aiResult = null;

        try {
          const { result, usage } = await categorizeWithAi(transaction.rawRow, importBatchId);
          aiResult = result;

          // Track usage stats
          if (usage) {
            // API call made
            aiApiCalls++;
            totalInputTokens += usage.inputTokens;
            totalOutputTokens += usage.outputTokens;
            totalCostUsd += usage.costUsd;
          } else {
            // Cache hit
            aiCacheHits++;
          }
        } catch (error) {
          // AI categorization failed - store error for warning
          if (error instanceof AiCategorizationError) {
            aiError = error;
            aiFailureCount++;
          } else {
            throw error; // Re-throw unexpected errors
          }
        }

        if (aiResult && aiResult.entityName) {
          // AI suggested an entity name - check if it exists in lookup
          const existingEntity = Object.keys(entityLookup).find(
            (name) => name.toUpperCase() === aiResult.entityName.toUpperCase()
          );

          if (existingEntity) {
            // AI matched to existing entity
            const entityId = entityLookup[existingEntity];
            if (!entityId) {
              throw new Error(`Entity lookup failed for AI match: ${existingEntity}`);
            }

            matched.push({
              ...transaction,
              entity: {
                entityId,
                entityName: existingEntity,
                entityUrl: `https://www.notion.so/${entityId.replace(/-/g, "")}`,
                matchType: "ai",
              },
              status: "matched",
            });
          } else {
            // AI suggested new entity name - add to uncertain
            uncertain.push({
              ...transaction,
              entity: {
                entityName: aiResult.entityName,
                matchType: "ai",
                confidence: 0.7,
              },
              status: "uncertain",
            });
          }
        } else {
          // AI failed or returned null - add to failed
          failed.push({
            ...transaction,
            entity: { matchType: "none" },
            status: "failed",
            error: aiError ? "AI categorization unavailable" : "No entity match found",
          });
        }
      }
    } catch (error) {
      failed.push({
        ...transaction,
        entity: { matchType: "none" },
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Build warnings array
  const warnings: ImportWarning[] = [];

  // Add Notion API errors
  if (deduplicationResult.error) {
    warnings.push({
      type: deduplicationResult.error.type as ImportWarning["type"],
      message: deduplicationResult.error.message,
      details: deduplicationResult.error.details,
    });
  }

  // Add AI categorization errors
  if (aiError && aiFailureCount > 0) {
    warnings.push({
      type: aiError.code === "INSUFFICIENT_CREDITS" ? "AI_CATEGORIZATION_UNAVAILABLE" : "AI_API_ERROR",
      message: aiError.message,
      affectedCount: aiFailureCount,
    });
  }

  // Build AI usage stats if any AI calls were made
  const aiUsage: AiUsageStats | undefined =
    aiApiCalls > 0 || aiCacheHits > 0
      ? {
          apiCalls: aiApiCalls,
          cacheHits: aiCacheHits,
          totalInputTokens,
          totalOutputTokens,
          totalCostUsd,
          avgCostPerCall: aiApiCalls > 0 ? totalCostUsd / aiApiCalls : 0,
        }
      : undefined;

  logger.info(
    {
      importBatchId,
      matchedCount: matched.length,
      uncertainCount: uncertain.length,
      failedCount: failed.length,
      skippedCount: skipped.length,
      aiApiCalls,
      aiCacheHits,
      totalCostUsd: totalCostUsd.toFixed(6),
    },
    "[Import] processImport complete"
  );

  return {
    matched,
    uncertain,
    failed,
    skipped,
    warnings: warnings.length > 0 ? warnings : undefined,
    aiUsage,
  };
}

/**
 * Execute import: write confirmed transactions to Notion
 */
export async function executeImport(
  transactions: ConfirmedTransaction[]
): Promise<ExecuteImportOutput> {
  logger.info({ totalCount: transactions.length }, "[Import] Starting executeImport");

  const results: ImportResult[] = [];
  let imported = 0;
  let skipped = 0;

  // Batch writes with concurrency control
  let idx = 0;

  async function worker(): Promise<void> {
    while (idx < transactions.length) {
      const i = idx++;
      const transaction = transactions[i];
      if (!transaction) continue;

      try {
        const notionType =
          transaction.transactionType === "transfer"
            ? "Transfer"
            : transaction.transactionType === "income"
              ? "Income"
              : "Expense";
        const row = await createTransaction({
          description: transaction.description,
          account: transaction.account,
          amount: transaction.amount,
          date: transaction.date,
          type: notionType,
          categories: ["Other"],
          entityId: transaction.entityId ?? null,
          entityName: transaction.entityName ?? null,
          location: transaction.location ?? null,
          online: transaction.online ?? false,
          novatedLease: false,
          taxReturn: false,
          rawRow: transaction.rawRow,
          checksum: transaction.checksum,
        });
        const pageId = row.notion_id;
        logger.debug(
          { index: i + 1, total: transactions.length, description: transaction.description.substring(0, 50), pageId },
          "[Import] Transaction written"
        );
        results.push({
          transaction,
          success: true,
          notionPageId: pageId,
        });
        imported++;
      } catch (error) {
        logger.error(
          {
            index: i + 1,
            total: transactions.length,
            description: transaction.description.substring(0, 50),
            error: error instanceof Error ? error.message : String(error),
          },
          "[Import] Transaction write failed"
        );
        results.push({
          transaction,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }

      // Rate limiting delay
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }

  // Run workers in parallel
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const failed = results.filter((r) => !r.success);

  logger.info({ imported, failedCount: failed.length, skipped }, "[Import] executeImport complete");

  return { imported, failed, skipped };
}

/**
 * Create a new entity in Notion and refresh SQLite cache
 */
export async function createEntity(name: string): Promise<CreateEntityOutput> {
  const client = getNotionClient();

  // Create in Notion Entities database
  const response = await client.pages.create({
    parent: { database_id: getEntitiesDbId() },
    properties: {
      Name: {
        title: [{ text: { content: name } }],
      },
    },
  });

  const entityId = response.id;
  const entityUrl = `https://www.notion.so/${entityId.replace(/-/g, "")}`;

  // Insert into SQLite (notion-sync will update it on next sync)
  const db = getDb();
  db.prepare(
    `
    INSERT OR REPLACE INTO entities (notion_id, name, type, abn, aliases, default_transaction_type, default_category, notes, last_edited_time)
    VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, ?)
  `
  ).run(entityId, name, new Date().toISOString());

  return { entityId, entityName: name, entityUrl };
}

/**
 * Process import with real-time progress updates.
 * This is an async wrapper that updates progress store as transactions are processed.
 */
export async function processImportWithProgress(
  sessionId: string,
  transactions: ParsedTransaction[],
  account: string
): Promise<void> {
  try {
    const client = getNotionClient();
    const importBatchId = `import-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    logger.info({ importBatchId, sessionId, account, totalCount: transactions.length }, "[Import] Starting background processImport");

    // Step 1: Deduplication
    updateProgress(sessionId, { currentStep: "deduplicating", processedCount: 0 });

    logger.info({ checksumCount: transactions.length }, "[Import] Querying Notion for existing checksums");
    const checksums = transactions.map((t) => t.checksum);
    const deduplicationResult = await findExistingChecksums(client, checksums);
    const existingChecksums = deduplicationResult.checksums;

    logger.info(
      { duplicateCount: existingChecksums.size, newCount: transactions.length - existingChecksums.size },
      "[Import] Deduplication complete"
    );

    const newTransactions = transactions.filter((t) => !existingChecksums.has(t.checksum));
    const duplicates = transactions.filter((t) => existingChecksums.has(t.checksum));

    // Step 2: Entity matching
    updateProgress(sessionId, { currentStep: "matching", processedCount: 0 });

    const entityLookup = loadEntityLookup();
    const aliases = loadAliases();

    const matched: ProcessedTransaction[] = [];
    const uncertain: ProcessedTransaction[] = [];
    const failed: ProcessedTransaction[] = [];
    const skipped: ProcessedTransaction[] = duplicates.map((t) => ({
      ...t,
      entity: { matchType: "none" as const },
      status: "skipped" as const,
      skipReason: "Duplicate transaction (checksum match)",
    }));

    let aiError: AiCategorizationError | null = null;
    let aiFailureCount = 0;
    let aiApiCalls = 0;
    let aiCacheHits = 0;
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalCostUsd = 0;

    const currentBatch: Array<{ description: string; status: "processing" | "success" | "failed"; error?: string }> = [];
    const errors: Array<{ description: string; error: string }> = [];

    for (let i = 0; i < newTransactions.length; i++) {
      const transaction = newTransactions[i];
      if (!transaction) continue;

      const batchItem: { description: string; status: "processing" | "success" | "failed"; error?: string } = {
        description: transaction.description.substring(0, 50),
        status: "processing",
      };

      // Update current batch (show up to 5 items)
      currentBatch.push(batchItem);
      if (currentBatch.length > 5) currentBatch.shift();

      updateProgress(sessionId, {
        processedCount: i + 1,
        currentBatch: [...currentBatch],
      });

      try {
        const match = matchEntity(transaction.description, entityLookup, aliases);

        if (match) {
          logger.debug(
            {
              index: i + 1,
              total: newTransactions.length,
              description: transaction.description.substring(0, 50),
              entityName: match.entityName,
              matchType: match.matchType,
            },
            "[Import] Entity matched"
          );

          const entityId = entityLookup[match.entityName];
          if (!entityId) {
            throw new Error(`Entity lookup failed for matched entity: ${match.entityName}`);
          }

          matched.push({
            ...transaction,
            entity: {
              entityId,
              entityName: match.entityName,
              entityUrl: `https://www.notion.so/${entityId.replace(/-/g, "")}`,
              matchType: match.matchType,
            },
            status: "matched",
          });

          batchItem.status = "success";
        } else {
          // Try AI categorization
          let aiResult = null;

          try {
            const { result, usage } = await categorizeWithAi(transaction.rawRow, importBatchId);
            aiResult = result;

            if (usage) {
              aiApiCalls++;
              totalInputTokens += usage.inputTokens;
              totalOutputTokens += usage.outputTokens;
              totalCostUsd += usage.costUsd;
            } else {
              aiCacheHits++;
            }
          } catch (error) {
            if (error instanceof AiCategorizationError) {
              aiError = error;
              aiFailureCount++;
            } else {
              throw error;
            }
          }

          if (aiResult && aiResult.entityName) {
            const existingEntity = Object.keys(entityLookup).find(
              (name) => name.toUpperCase() === aiResult.entityName.toUpperCase()
            );

            if (existingEntity) {
              const entityId = entityLookup[existingEntity];
              if (!entityId) {
                throw new Error(`Entity lookup failed for AI match: ${existingEntity}`);
              }

              matched.push({
                ...transaction,
                entity: {
                  entityId,
                  entityName: existingEntity,
                  entityUrl: `https://www.notion.so/${entityId.replace(/-/g, "")}`,
                  matchType: "ai",
                },
                status: "matched",
              });

              batchItem.status = "success";
            } else {
              uncertain.push({
                ...transaction,
                entity: {
                  entityName: aiResult.entityName,
                  matchType: "ai",
                  confidence: 0.7,
                },
                status: "uncertain",
              });

              batchItem.status = "success";
            }
          } else {
            failed.push({
              ...transaction,
              entity: { matchType: "none" },
              status: "failed",
              error: aiError ? "AI categorization unavailable" : "No entity match found",
            });

            batchItem.status = "failed";
            batchItem.error = aiError ? "AI categorization unavailable" : "No entity match found";

            const formattedError = aiError ? formatImportError(aiError) : { message: "No entity match found" };
            errors.push({
              description: transaction.description.substring(0, 50),
              error: formattedError.message + (formattedError.suggestion ? ` - ${formattedError.suggestion}` : ""),
            });
          }
        }
      } catch (error) {
        failed.push({
          ...transaction,
          entity: { matchType: "none" },
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });

        batchItem.status = "failed";
        batchItem.error = error instanceof Error ? error.message : "Unknown error";

        const formattedError = formatImportError(error, { transaction: transaction.description });
        errors.push({
          description: transaction.description.substring(0, 50),
          error: formattedError.message + (formattedError.suggestion ? ` - ${formattedError.suggestion}` : ""),
        });
      }

      // Update batch item status
      updateProgress(sessionId, { currentBatch: [...currentBatch] });
    }

    // Build warnings
    const warnings: ImportWarning[] = [];
    if (deduplicationResult.error) {
      warnings.push({
        type: deduplicationResult.error.type as ImportWarning["type"],
        message: deduplicationResult.error.message,
        details: deduplicationResult.error.details,
      });
    }
    if (aiError && aiFailureCount > 0) {
      warnings.push({
        type: aiError.code === "INSUFFICIENT_CREDITS" ? "AI_CATEGORIZATION_UNAVAILABLE" : "AI_API_ERROR",
        message: aiError.message,
        affectedCount: aiFailureCount,
      });
    }

    const aiUsage: AiUsageStats | undefined =
      aiApiCalls > 0 || aiCacheHits > 0
        ? {
            apiCalls: aiApiCalls,
            cacheHits: aiCacheHits,
            totalInputTokens,
            totalOutputTokens,
            totalCostUsd,
            avgCostPerCall: aiApiCalls > 0 ? totalCostUsd / aiApiCalls : 0,
          }
        : undefined;

    const result: ProcessImportOutput = {
      matched,
      uncertain,
      failed,
      skipped,
      warnings: warnings.length > 0 ? warnings : undefined,
      aiUsage,
    };

    logger.info(
      {
        importBatchId,
        sessionId,
        matchedCount: matched.length,
        uncertainCount: uncertain.length,
        failedCount: failed.length,
        skippedCount: skipped.length,
        aiApiCalls,
        aiCacheHits,
        totalCostUsd: totalCostUsd.toFixed(6),
      },
      "[Import] Background processImport complete"
    );

    updateProgress(sessionId, {
      status: "completed",
      processedCount: newTransactions.length, // Set final count to total
      result,
      errors,
    });
  } catch (error) {
    logger.error({ sessionId, error: error instanceof Error ? error.message : String(error) }, "[Import] Background processing failed");

    const formattedError = formatImportError(error);
    updateProgress(sessionId, {
      status: "failed",
      errors: [{ description: "System", error: formattedError.message + (formattedError.suggestion ? ` - ${formattedError.suggestion}` : "") }],
    });
  }
}

/**
 * Execute import with real-time progress updates.
 * This is an async wrapper that updates progress store as transactions are written.
 */
export async function executeImportWithProgress(sessionId: string, transactions: ConfirmedTransaction[]): Promise<void> {
  try {
    logger.info({ sessionId, totalCount: transactions.length }, "[Import] Starting background executeImport");

    updateProgress(sessionId, {
      currentStep: "writing",
      totalTransactions: transactions.length,
      processedCount: 0,
      currentBatch: [],
      errors: [],
    });

    const results: ImportResult[] = [];
    let imported = 0;
    let skipped = 0;

    const currentBatch: Array<{ description: string; status: "processing" | "success" | "failed"; error?: string }> = [];
    const errors: Array<{ description: string; error: string }> = [];

    let idx = 0;

    async function worker(): Promise<void> {
      while (idx < transactions.length) {
        const i = idx++;
        const transaction = transactions[i];
        if (!transaction) continue;

        const batchItem: { description: string; status: "processing" | "success" | "failed"; error?: string } = {
          description: transaction.description.substring(0, 50),
          status: "processing",
        };

        // Update current batch (show up to 5 items)
        currentBatch.push(batchItem);
        if (currentBatch.length > 5) currentBatch.shift();

        updateProgress(sessionId, {
          processedCount: i + 1,
          currentBatch: [...currentBatch],
        });

        try {
          const notionType =
          transaction.transactionType === "transfer"
            ? "Transfer"
            : transaction.transactionType === "income"
              ? "Income"
              : "Expense";
        const row = await createTransaction({
          description: transaction.description,
          account: transaction.account,
          amount: transaction.amount,
          date: transaction.date,
          type: notionType,
          categories: ["Other"],
          entityId: transaction.entityId ?? null,
          entityName: transaction.entityName ?? null,
          location: transaction.location ?? null,
          online: transaction.online ?? false,
          novatedLease: false,
          taxReturn: false,
          rawRow: transaction.rawRow,
          checksum: transaction.checksum,
        });
        const pageId = row.notion_id;
          logger.debug(
            { index: i + 1, total: transactions.length, description: transaction.description.substring(0, 50), pageId },
            "[Import] Transaction written"
          );

          results.push({
            transaction,
            success: true,
            notionPageId: pageId,
          });
          imported++;

          batchItem.status = "success";
        } catch (error) {
          logger.error(
            {
              index: i + 1,
              total: transactions.length,
              description: transaction.description.substring(0, 50),
              error: error instanceof Error ? error.message : String(error),
            },
            "[Import] Transaction write failed"
          );

          results.push({
            transaction,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });

          batchItem.status = "failed";
          batchItem.error = error instanceof Error ? error.message : "Unknown error";

          const formattedError = formatImportError(error, { transaction: transaction.description });
          errors.push({
            description: transaction.description.substring(0, 50),
            error: formattedError.message + (formattedError.suggestion ? ` - ${formattedError.suggestion}` : ""),
          });
        }

        // Update batch item status
        updateProgress(sessionId, { currentBatch: [...currentBatch] });

        // Rate limiting delay
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      }
    }

    // Run workers in parallel
    const workers = Array.from({ length: CONCURRENCY }, () => worker());
    await Promise.all(workers);

    const failed = results.filter((r) => !r.success);

    const result: ExecuteImportOutput = { imported, failed, skipped };

    logger.info({ sessionId, imported, failedCount: failed.length, skipped }, "[Import] Background executeImport complete");

    updateProgress(sessionId, {
      status: "completed",
      processedCount: transactions.length, // Set final count to total
      result,
      errors,
    });
  } catch (error) {
    logger.error({ sessionId, error: error instanceof Error ? error.message : String(error) }, "[Import] Background execution failed");

    const formattedError = formatImportError(error);
    updateProgress(sessionId, {
      status: "failed",
      errors: [{ description: "System", error: formattedError.message + (formattedError.suggestion ? ` - ${formattedError.suggestion}` : "") }],
    });
  }
}
