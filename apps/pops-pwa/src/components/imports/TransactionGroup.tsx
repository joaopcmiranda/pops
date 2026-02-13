import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TransactionCard } from "./TransactionCard";
import type { ProcessedTransaction } from "@pops/finance-api/modules/imports";
import type { TransactionGroup as TransactionGroupType } from "../../lib/transaction-utils";

interface TransactionGroupProps {
  group: TransactionGroupType;
  onAcceptAll: (transactions: ProcessedTransaction[]) => void;
  onCreateAndAssignAll: (
    transactions: ProcessedTransaction[],
    entityName: string
  ) => void;
  onEntitySelect: (
    transaction: ProcessedTransaction,
    entityId: string,
    entityName: string
  ) => void;
  onCreateEntity: (transaction: ProcessedTransaction) => void;
  onAcceptAiSuggestion: (transaction: ProcessedTransaction) => void;
  onEdit: (transaction: ProcessedTransaction) => void;
  entities?: Array<{ notionId: string; name: string }>;
  variant?: "uncertain" | "failed";
}

/**
 * Grouped view of transactions with bulk actions
 */
export function TransactionGroup({
  group,
  onAcceptAll,
  onCreateAndAssignAll,
  onEntitySelect,
  onCreateEntity,
  onAcceptAiSuggestion,
  onEdit,
  entities,
  variant = "uncertain",
}: TransactionGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAmount = group.transactions.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );

  return (
    <div
      className={`border rounded-lg ${
        group.aiSuggestion
          ? "border-purple-300 dark:border-purple-700"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div
          className={`p-4 ${
            group.aiSuggestion
              ? "bg-purple-50 dark:bg-purple-950"
              : "bg-gray-50 dark:bg-gray-900"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CollapsibleTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                />
                <div className="flex items-center gap-2">
                  {group.aiSuggestion && (
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                  <h3 className="font-semibold text-lg">{group.entityName}</h3>
                </div>
              </CollapsibleTrigger>

              <div className="flex items-center gap-3 mt-2 ml-7">
                <Badge variant="secondary">
                  {group.transactions.length} transaction
                  {group.transactions.length !== 1 ? "s" : ""}
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total: ${totalAmount.toFixed(2)}
                </span>
                {group.category && (
                  <Badge variant="outline" className="text-xs">
                    {group.category}
                  </Badge>
                )}
              </div>
            </div>

            {/* Bulk actions */}
            <div className="flex gap-2">
              {group.aiSuggestion && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAcceptAll(group.transactions)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Accept All
                </Button>
              )}
              {group.entityName !== "Unknown" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onCreateAndAssignAll(group.transactions, group.entityName)
                  }
                >
                  Create "{group.entityName}"
                </Button>
              )}
            </div>
          </div>
        </div>

        <CollapsibleContent>
          <div className="p-4 space-y-3 border-t dark:border-gray-700">
            {group.transactions.map((transaction, idx) => (
              <TransactionCard
                key={idx}
                transaction={transaction}
                onEntitySelect={onEntitySelect}
                onCreateEntity={onCreateEntity}
                onAcceptAiSuggestion={onAcceptAiSuggestion}
                onEdit={onEdit}
                entities={entities}
                variant={variant}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
