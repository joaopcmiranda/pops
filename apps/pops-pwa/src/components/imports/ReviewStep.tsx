import { useState, useCallback, useMemo, useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  AlertCircle,
  Loader2,
  List,
  Layers,
} from "lucide-react";
import { useImportStore } from "../../store/importStore";
import type { ProcessedTransaction } from "../../store/importStore";
import { trpc } from "../../lib/trpc";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { EntityCreateDialog } from "./EntityCreateDialog";
import { TransactionCard } from "./TransactionCard";
import { TransactionGroup } from "./TransactionGroup";
import { EditableTransactionCard } from "./EditableTransactionCard";
import { toast } from "sonner";
import type {
  ConfirmedTransaction,
  ExecuteImportOutput,
} from "@pops/finance-api/modules/imports";
import { groupTransactionsByEntity } from "../../lib/transaction-utils";

type ViewMode = "list" | "grouped";

/**
 * Step 4: Review transactions and resolve uncertain/failed matches
 */
export function ReviewStep() {
  const {
    processedTransactions,
    setConfirmedTransactions,
    setExecuteSessionId,
    executeSessionId,
    nextStep,
    prevStep,
    updateTransaction,
    findSimilar,
  } = useImportStore();

  const [localTransactions, setLocalTransactions] = useState(processedTransactions);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ProcessedTransaction | null>(null);
  const [pollingEnabled, setPollingEnabled] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<ProcessedTransaction | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");

  const { data: entities } = trpc.entities.list.useQuery({});

  const executeImportMutation = trpc.imports.executeImport.useMutation({
    onSuccess: (data) => {
      setExecuteSessionId(data.sessionId);
      setPollingEnabled(true);
    },
  });

  const utils = trpc.useUtils();
  const createEntityMutation = trpc.entities.create.useMutation({
    onSuccess: () => {
      // Refresh entities list
      utils.entities.list.invalidate();
    },
  });

  // Poll for progress every 1 second when enabled
  const progressQuery = trpc.imports.getImportProgress.useQuery(
    { sessionId: executeSessionId ?? "" },
    {
      enabled: pollingEnabled && !!executeSessionId,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  );

  // Handle completion
  useEffect(() => {
    if (progressQuery.data?.status === "completed" && progressQuery.data.result) {
      setPollingEnabled(false);
      // Type assertion with proper type checking
      const result = progressQuery.data.result as ExecuteImportOutput;
      useImportStore.getState().setImportResult({
        imported: result.imported,
        failed: result.failed,
        skipped: result.skipped,
      });
      nextStep();
    }

    if (progressQuery.data?.status === "failed") {
      setPollingEnabled(false);
    }
  }, [progressQuery.data, nextStep]);

  // Count unresolved transactions
  const unresolvedCount = useMemo(
    () => localTransactions.uncertain.length + localTransactions.failed.length,
    [localTransactions]
  );

  /**
   * Handle entity selection with auto-matching for similar transactions
   */
  const handleEntitySelect = useCallback(
    (transaction: ProcessedTransaction, entityId: string, entityName: string) => {
      // Find similar transactions before updating
      const similar = findSimilar(transaction);

      // Move transaction from uncertain/failed to matched
      const updated = {
        ...localTransactions,
        uncertain: localTransactions.uncertain.filter((t: ProcessedTransaction) => t !== transaction),
        failed: localTransactions.failed.filter((t: ProcessedTransaction) => t !== transaction),
        matched: [
          ...localTransactions.matched,
          {
            ...transaction,
            entity: {
              entityId,
              entityName,
              entityUrl: `https://www.notion.so/${entityId.replace(/-/g, "")}`,
              matchType: "manual" as never, // UI-only matchType
              confidence: 1,
            },
            status: "matched" as const,
          } as ProcessedTransaction,
        ],
      };

      setLocalTransactions(updated);

      // Show toast with option to apply to similar transactions
      if (similar.length > 0) {
        toast.info(`Found ${similar.length} similar transaction${similar.length !== 1 ? "s" : ""}`, {
          description: "Would you like to apply this entity to all similar transactions?",
          action: {
            label: "Apply to All",
            onClick: () => {
              handleAutoMatchSimilar(similar, entityId, entityName);
            },
          },
        });
      }
    },
    [localTransactions, findSimilar]
  );

  /**
   * Auto-match similar transactions
   */
  const handleAutoMatchSimilar = useCallback(
    (transactions: ProcessedTransaction[], entityId: string, entityName: string) => {
      const updated = { ...localTransactions };

      for (const transaction of transactions) {
        // Remove from uncertain/failed
        updated.uncertain = updated.uncertain.filter((t: ProcessedTransaction) => t !== transaction);
        updated.failed = updated.failed.filter((t: ProcessedTransaction) => t !== transaction);

        // Add to matched with auto-matched type
        updated.matched.push({
          ...transaction,
          entity: {
            entityId,
            entityName,
            entityUrl: `https://www.notion.so/${entityId.replace(/-/g, "")}`,
            matchType: "auto-matched" as never, // UI-only matchType
            confidence: 1,
          },
          status: "matched" as const,
        } as ProcessedTransaction);
      }

      setLocalTransactions(updated);
      toast.success(`Applied entity to ${transactions.length} transaction${transactions.length !== 1 ? "s" : ""}`);
    },
    [localTransactions]
  );

  /**
   * Accept AI suggestion for a single transaction
   */
  const handleAcceptAiSuggestion = useCallback(
    (transaction: ProcessedTransaction) => {
      if (!transaction.entity?.entityName) return;

      // Entity doesn't exist yet, need to create it first
      if (!transaction.entity.entityId) {
        handleCreateEntity(transaction);
        return;
      }

      handleEntitySelect(
        transaction,
        transaction.entity.entityId,
        transaction.entity.entityName
      );
    },
    [handleEntitySelect]
  );

  /**
   * Accept all transactions in a group
   */
  const handleAcceptAll = useCallback(
    (transactions: ProcessedTransaction[]) => {
      for (const transaction of transactions) {
        if (transaction.entity?.entityId && transaction.entity?.entityName) {
          // Remove from uncertain/failed, add to matched (no toast for bulk)
          const updated = {
            ...localTransactions,
            uncertain: localTransactions.uncertain.filter((t: ProcessedTransaction) => t !== transaction),
            failed: localTransactions.failed.filter((t: ProcessedTransaction) => t !== transaction),
            matched: [
              ...localTransactions.matched,
              {
                ...transaction,
                entity: {
                  ...transaction.entity,
                  matchType: "ai" as const,
                },
                status: "matched" as const,
              } as ProcessedTransaction,
            ],
          };
          setLocalTransactions(updated);
        }
      }

      toast.success(`Accepted ${transactions.length} transaction${transactions.length !== 1 ? "s" : ""}`);
    },
    [localTransactions]
  );

  /**
   * Create entity and assign to all transactions in group
   */
  const handleCreateAndAssignAll = useCallback(
    async (transactions: ProcessedTransaction[], entityName: string) => {
      try {
        const result = await createEntityMutation.mutateAsync({ name: entityName });

        // Assign to all transactions
        const updated = { ...localTransactions };

        for (const transaction of transactions) {
          updated.uncertain = updated.uncertain.filter((t: ProcessedTransaction) => t !== transaction);
          updated.failed = updated.failed.filter((t: ProcessedTransaction) => t !== transaction);
          updated.matched.push({
            ...transaction,
            entity: {
              entityId: result.data.notionId,
              entityName: result.data.name,
              entityUrl: `https://www.notion.so/${result.data.notionId.replace(/-/g, "")}`,
              matchType: "ai" as const,
              confidence: 1,
            },
            status: "matched" as const,
          } as ProcessedTransaction);
        }

        setLocalTransactions(updated);
        toast.success(`Created "${entityName}" and assigned to ${transactions.length} transaction${transactions.length !== 1 ? "s" : ""}`);
      } catch (error) {
        toast.error(`Failed to create entity: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    },
    [localTransactions, createEntityMutation]
  );

  const handleCreateEntity = useCallback((transaction: ProcessedTransaction) => {
    setSelectedTransaction(transaction);
    setShowCreateDialog(true);
  }, []);

  const handleEntityCreated = useCallback(
    (entity: { entityId: string; entityName: string; entityUrl: string }) => {
      if (selectedTransaction) {
        handleEntitySelect(selectedTransaction, entity.entityId, entity.entityName);
        setSelectedTransaction(null);
      }
    },
    [selectedTransaction, handleEntitySelect]
  );

  const handleEdit = useCallback((transaction: ProcessedTransaction) => {
    setEditingTransaction(transaction);
  }, []);

  const handleSaveEdit = useCallback(
    (transaction: ProcessedTransaction, editedFields: Partial<ProcessedTransaction>) => {
      const updated = {
        ...localTransactions,
        matched: localTransactions.matched.map((t: ProcessedTransaction) =>
          t === transaction ? { ...t, ...editedFields, manuallyEdited: true } : t
        ),
        uncertain: localTransactions.uncertain.map((t: ProcessedTransaction) =>
          t === transaction ? { ...t, ...editedFields, manuallyEdited: true } : t
        ),
        failed: localTransactions.failed.map((t: ProcessedTransaction) =>
          t === transaction ? { ...t, ...editedFields, manuallyEdited: true } : t
        ),
        skipped: localTransactions.skipped.map((t: ProcessedTransaction) =>
          t === transaction ? { ...t, ...editedFields, manuallyEdited: true } : t
        ),
      };

      setLocalTransactions(updated);
      setEditingTransaction(null);
      toast.success("Transaction updated");
    },
    [localTransactions]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingTransaction(null);
  }, []);

  const handleImport = useCallback(() => {
    // Convert matched transactions to confirmed format
    const confirmed: ConfirmedTransaction[] = localTransactions.matched
      .filter((t: ProcessedTransaction) => t.entity?.entityId && t.entity?.entityName)
      .map((t: ProcessedTransaction) => ({
        date: t.date,
        description: t.description,
        amount: t.amount,
        account: t.account,
        location: t.location,
        online: t.online,
        rawRow: t.rawRow,
        checksum: t.checksum,
        entityId: t.entity.entityId!,
        entityName: t.entity.entityName!,
        entityUrl: t.entity.entityUrl!,
      }));

    setConfirmedTransactions(confirmed);
    executeImportMutation.mutate({ transactions: confirmed });
  }, [localTransactions, setConfirmedTransactions, executeImportMutation]);

  const progress = progressQuery.data;
  const isWriting = pollingEnabled && progress?.status === "processing";

  // Group transactions for uncertain/failed tabs
  const uncertainGroups = useMemo(
    () => groupTransactionsByEntity(localTransactions.uncertain),
    [localTransactions.uncertain]
  );

  const failedGroups = useMemo(
    () => groupTransactionsByEntity(localTransactions.failed),
    [localTransactions.failed]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {unresolvedCount > 0
            ? `${unresolvedCount} transaction(s) need your attention`
            : "All transactions are ready to import"}
        </p>
      </div>

      {/* Show warnings if present */}
      {processedTransactions.warnings && processedTransactions.warnings.length > 0 && (
        <div className="space-y-2">
          {processedTransactions.warnings.map((warning, idx: number) => {
            const isNotionError =
              warning.type === "NOTION_DATABASE_NOT_FOUND" || warning.type === "NOTION_API_ERROR";
            const isAiError =
              warning.type === "AI_CATEGORIZATION_UNAVAILABLE" || warning.type === "AI_API_ERROR";

            return (
              <div
                key={idx}
                className={`p-4 text-sm rounded-lg border ${
                  isNotionError
                    ? "text-red-800 bg-red-50 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800"
                    : "text-amber-800 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-200 border-amber-200 dark:border-amber-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">
                      {warning.type === "NOTION_DATABASE_NOT_FOUND"
                        ? "Notion Database Not Found"
                        : warning.type === "NOTION_API_ERROR"
                          ? "Notion API Error"
                          : warning.type === "AI_CATEGORIZATION_UNAVAILABLE"
                            ? "AI Categorization Unavailable"
                            : "AI API Error"}
                    </p>
                    <p className="text-xs">{warning.message}</p>
                    {warning.details && (
                      <p className="text-xs opacity-70 font-mono">{warning.details}</p>
                    )}
                    {isAiError && warning.affectedCount && (
                      <p className="text-xs opacity-80">
                        {warning.affectedCount} transaction{warning.affectedCount !== 1 ? "s" : ""} could not be
                        automatically categorized and may appear in the Uncertain or Failed tabs.
                      </p>
                    )}
                    {isNotionError && (
                      <p className="text-xs opacity-80 mt-2">
                        Check your .env file and ensure NOTION_BALANCE_SHEET_ID is correct and the database is
                        shared with your Notion integration.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Tabs defaultValue="matched" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matched" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Matched ({localTransactions.matched.length})</span>
          </TabsTrigger>
          <TabsTrigger value="uncertain" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Uncertain ({localTransactions.uncertain.length})</span>
          </TabsTrigger>
          <TabsTrigger value="failed" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>Failed ({localTransactions.failed.length})</span>
          </TabsTrigger>
          <TabsTrigger value="skipped" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Skipped ({localTransactions.skipped.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matched" className="mt-4">
          <MatchedTab
            transactions={localTransactions.matched}
            onEdit={handleEdit}
            editingTransaction={editingTransaction}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            entities={entities?.data}
          />
        </TabsContent>

        <TabsContent value="uncertain" className="mt-4">
          <UncertainTab
            transactions={localTransactions.uncertain}
            groups={uncertainGroups}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onEntitySelect={handleEntitySelect}
            onCreateEntity={handleCreateEntity}
            onAcceptAiSuggestion={handleAcceptAiSuggestion}
            onAcceptAll={handleAcceptAll}
            onCreateAndAssignAll={handleCreateAndAssignAll}
            onEdit={handleEdit}
            editingTransaction={editingTransaction}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            entities={entities?.data}
          />
        </TabsContent>

        <TabsContent value="failed" className="mt-4">
          <FailedTab
            transactions={localTransactions.failed}
            groups={failedGroups}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onEntitySelect={handleEntitySelect}
            onCreateEntity={handleCreateEntity}
            onAcceptAiSuggestion={handleAcceptAiSuggestion}
            onAcceptAll={handleAcceptAll}
            onCreateAndAssignAll={handleCreateAndAssignAll}
            onEdit={handleEdit}
            editingTransaction={editingTransaction}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            entities={entities?.data}
          />
        </TabsContent>

        <TabsContent value="skipped" className="mt-4">
          <SkippedTab transactions={localTransactions.skipped} />
        </TabsContent>
      </Tabs>

      {/* Write progress overlay */}
      {isWriting && progress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <h3 className="text-lg font-semibold">Writing to Notion</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Writing {progress.processedCount}/{progress.totalTransactions} transactions...
            </p>

            {/* Progress bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round((progress.processedCount / progress.totalTransactions) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(progress.processedCount / progress.totalTransactions) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Current batch */}
            {progress.currentBatch.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Currently writing:</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {progress.currentBatch.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      {item.status === "processing" && <Loader2 className="w-3 h-3 animate-spin" />}
                      {item.status === "success" && <CheckCircle className="w-3 h-3 text-green-500" />}
                      {item.status === "failed" && <XCircle className="w-3 h-3 text-red-500" />}
                      <span className="truncate">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Errors */}
            {progress.errors && progress.errors.length > 0 && (
              <div className="p-3 text-sm text-amber-800 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-200 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="font-medium text-xs mb-1">{progress.errors.length} errors occurred</p>
                <div className="space-y-0.5 max-h-20 overflow-y-auto text-xs">
                  {progress.errors.slice(0, 3).map((error, idx) => (
                    <p key={idx}>
                      • {error.description}: {error.error}
                    </p>
                  ))}
                  {progress.errors.length > 3 && <p>...and {progress.errors.length - 3} more</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={prevStep} disabled={executeImportMutation.isPending || isWriting}>
          Back
        </Button>
        <Button onClick={handleImport} disabled={unresolvedCount > 0 || executeImportMutation.isPending || isWriting}>
          {isWriting
            ? `Writing ${progress?.processedCount}/${progress?.totalTransactions}...`
            : executeImportMutation.isPending
              ? "Starting..."
              : `Import ${localTransactions.matched.length} Transactions`}
        </Button>
      </div>

      <EntityCreateDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onEntityCreated={handleEntityCreated}
        suggestedName={selectedTransaction?.entity?.entityName}
      />
    </div>
  );
}

/**
 * Matched tab - read-only list
 */
function MatchedTab({
  transactions,
  onEdit,
  editingTransaction,
  onSaveEdit,
  onCancelEdit,
  entities,
}: {
  transactions: ProcessedTransaction[];
  onEdit: (t: ProcessedTransaction) => void;
  editingTransaction: ProcessedTransaction | null;
  onSaveEdit: (t: ProcessedTransaction, edited: Partial<ProcessedTransaction>) => void;
  onCancelEdit: () => void;
  entities?: Array<{ notionId: string; name: string }>;
}) {
  if (transactions.length === 0) {
    return <div className="text-center py-12 text-gray-500">No matched transactions</div>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((t, idx) =>
        editingTransaction === t ? (
          <EditableTransactionCard
            key={idx}
            transaction={t}
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
            entities={entities}
          />
        ) : (
          <TransactionCard
            key={idx}
            transaction={t}
            onEdit={onEdit}
            readonly={true}
            showMatchType={true}
            variant="matched"
          />
        )
      )}
    </div>
  );
}

/**
 * Uncertain tab - needs user review
 */
function UncertainTab({
  transactions,
  groups,
  viewMode,
  onViewModeChange,
  onEntitySelect,
  onCreateEntity,
  onAcceptAiSuggestion,
  onAcceptAll,
  onCreateAndAssignAll,
  onEdit,
  editingTransaction,
  onSaveEdit,
  onCancelEdit,
  entities,
}: {
  transactions: ProcessedTransaction[];
  groups: ReturnType<typeof groupTransactionsByEntity>;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onEntitySelect: (t: ProcessedTransaction, entityId: string, entityName: string) => void;
  onCreateEntity: (t: ProcessedTransaction) => void;
  onAcceptAiSuggestion: (t: ProcessedTransaction) => void;
  onAcceptAll: (transactions: ProcessedTransaction[]) => void;
  onCreateAndAssignAll: (transactions: ProcessedTransaction[], entityName: string) => void;
  onEdit: (t: ProcessedTransaction) => void;
  editingTransaction: ProcessedTransaction | null;
  onSaveEdit: (t: ProcessedTransaction, edited: Partial<ProcessedTransaction>) => void;
  onCancelEdit: () => void;
  entities?: Array<{ notionId: string; name: string }>;
}) {
  if (transactions.length === 0) {
    return <div className="text-center py-12 text-gray-500">No uncertain transactions</div>;
  }

  return (
    <div className="space-y-4">
      {/* View mode toggle */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
        >
          <List className="w-4 h-4 mr-1" />
          List
        </Button>
        <Button
          variant={viewMode === "grouped" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("grouped")}
        >
          <Layers className="w-4 h-4 mr-1" />
          Grouped
        </Button>
      </div>

      {/* Grouped view */}
      {viewMode === "grouped" ? (
        <div className="space-y-3">
          {groups.map((group, idx) => (
            <TransactionGroup
              key={idx}
              group={group}
              onAcceptAll={onAcceptAll}
              onCreateAndAssignAll={onCreateAndAssignAll}
              onEntitySelect={onEntitySelect}
              onCreateEntity={onCreateEntity}
              onAcceptAiSuggestion={onAcceptAiSuggestion}
              onEdit={onEdit}
              entities={entities}
              variant="uncertain"
            />
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-3">
          {transactions.map((t, idx) =>
            editingTransaction === t ? (
              <EditableTransactionCard
                key={idx}
                transaction={t}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
                entities={entities}
              />
            ) : (
              <TransactionCard
                key={idx}
                transaction={t}
                onEntitySelect={onEntitySelect}
                onCreateEntity={onCreateEntity}
                onAcceptAiSuggestion={onAcceptAiSuggestion}
                onEdit={onEdit}
                entities={entities}
                variant="uncertain"
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Failed tab - needs user action
 */
function FailedTab({
  transactions,
  groups,
  viewMode,
  onViewModeChange,
  onEntitySelect,
  onCreateEntity,
  onAcceptAiSuggestion,
  onAcceptAll,
  onCreateAndAssignAll,
  onEdit,
  editingTransaction,
  onSaveEdit,
  onCancelEdit,
  entities,
}: {
  transactions: ProcessedTransaction[];
  groups: ReturnType<typeof groupTransactionsByEntity>;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onEntitySelect: (t: ProcessedTransaction, entityId: string, entityName: string) => void;
  onCreateEntity: (t: ProcessedTransaction) => void;
  onAcceptAiSuggestion: (t: ProcessedTransaction) => void;
  onAcceptAll: (transactions: ProcessedTransaction[]) => void;
  onCreateAndAssignAll: (transactions: ProcessedTransaction[], entityName: string) => void;
  onEdit: (t: ProcessedTransaction) => void;
  editingTransaction: ProcessedTransaction | null;
  onSaveEdit: (t: ProcessedTransaction, edited: Partial<ProcessedTransaction>) => void;
  onCancelEdit: () => void;
  entities?: Array<{ notionId: string; name: string }>;
}) {
  if (transactions.length === 0) {
    return <div className="text-center py-12 text-gray-500">No failed transactions</div>;
  }

  return (
    <div className="space-y-4">
      {/* View mode toggle */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
        >
          <List className="w-4 h-4 mr-1" />
          List
        </Button>
        <Button
          variant={viewMode === "grouped" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("grouped")}
        >
          <Layers className="w-4 h-4 mr-1" />
          Grouped
        </Button>
      </div>

      {/* Grouped view */}
      {viewMode === "grouped" ? (
        <div className="space-y-3">
          {groups.map((group, idx) => (
            <TransactionGroup
              key={idx}
              group={group}
              onAcceptAll={onAcceptAll}
              onCreateAndAssignAll={onCreateAndAssignAll}
              onEntitySelect={onEntitySelect}
              onCreateEntity={onCreateEntity}
              onAcceptAiSuggestion={onAcceptAiSuggestion}
              onEdit={onEdit}
              entities={entities}
              variant="failed"
            />
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-3">
          {transactions.map((t, idx) =>
            editingTransaction === t ? (
              <EditableTransactionCard
                key={idx}
                transaction={t}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
                entities={entities}
              />
            ) : (
              <TransactionCard
                key={idx}
                transaction={t}
                onEntitySelect={onEntitySelect}
                onCreateEntity={onCreateEntity}
                onAcceptAiSuggestion={onAcceptAiSuggestion}
                onEdit={onEdit}
                entities={entities}
                variant="failed"
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Skipped tab - read-only list
 */
function SkippedTab({ transactions }: { transactions: ProcessedTransaction[] }) {
  if (transactions.length === 0) {
    return <div className="text-center py-12 text-gray-500">No skipped transactions</div>;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Date</th>
              <th className="px-4 py-2 text-left font-medium">Description</th>
              <th className="px-4 py-2 text-left font-medium">Amount</th>
              <th className="px-4 py-2 text-left font-medium">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {transactions.map((t, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-2">{t.date}</td>
                <td className="px-4 py-2">{t.description}</td>
                <td className="px-4 py-2">${Math.abs(t.amount).toFixed(2)}</td>
                <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{t.skipReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
