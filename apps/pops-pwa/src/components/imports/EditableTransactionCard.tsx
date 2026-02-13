import { useState } from "react";
import { Save, X, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import type { ProcessedTransaction } from "@pops/finance-api/modules/imports";

interface EditableTransactionCardProps {
  transaction: ProcessedTransaction;
  onSave: (
    transaction: ProcessedTransaction,
    editedFields: Partial<ProcessedTransaction>
  ) => void;
  onCancel: () => void;
  entities?: Array<{ notionId: string; name: string }>;
}

/**
 * Inline editing form for transaction fields
 */
export function EditableTransactionCard({
  transaction,
  onSave,
  onCancel,
  entities,
}: EditableTransactionCardProps) {
  const [isRawDataExpanded, setIsRawDataExpanded] = useState(false);
  const [editedFields, setEditedFields] = useState<
    Partial<ProcessedTransaction>
  >({
    description: transaction.description,
    amount: transaction.amount,
    date: transaction.date,
    location: transaction.location || "",
    online: transaction.online ?? false,
    account: transaction.account,
  });

  // Parse raw row for reference
  let rawData: Record<string, string> = {};
  try {
    rawData = JSON.parse(transaction.rawRow);
  } catch {
    rawData = { error: "Failed to parse raw data" };
  }

  const handleSave = () => {
    onSave(transaction, editedFields);
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
          Edit Transaction
        </h3>
        <div className="flex gap-2">
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={editedFields.description || ""}
            onChange={(e) =>
              setEditedFields({ ...editedFields, description: e.target.value })
            }
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={editedFields.amount || 0}
            onChange={(e) =>
              setEditedFields({
                ...editedFields,
                amount: parseFloat(e.target.value),
              })
            }
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={editedFields.date || ""}
            onChange={(e) =>
              setEditedFields({ ...editedFields, date: e.target.value })
            }
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="account">Account</Label>
          <Input
            id="account"
            value={editedFields.account || ""}
            onChange={(e) =>
              setEditedFields({ ...editedFields, account: e.target.value })
            }
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={editedFields.location || ""}
            onChange={(e) =>
              setEditedFields({ ...editedFields, location: e.target.value })
            }
            placeholder="Optional"
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="online" className="flex items-center gap-2">
            <input
              id="online"
              type="checkbox"
              checked={editedFields.online || false}
              onChange={(e) =>
                setEditedFields({ ...editedFields, online: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>Online transaction</span>
          </Label>
        </div>
      </div>

      {/* Entity selector */}
      {entities && entities.length > 0 && (
        <div className="space-y-2 mb-4">
          <Label htmlFor="entity">Entity</Label>
          <select
            id="entity"
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            value={transaction.entity?.entityId || ""}
            onChange={(e) => {
              // Entity selection handled separately - this is just for display
              // The parent component should handle entity changes
            }}
          >
            <option value="">Select entity...</option>
            {entities.map((entity) => (
              <option key={entity.notionId} value={entity.notionId}>
                {entity.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Collapsible raw data for reference */}
      <Collapsible open={isRawDataExpanded} onOpenChange={setIsRawDataExpanded}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <ChevronRight
            className={`w-4 h-4 transition-transform ${isRawDataExpanded ? "rotate-90" : ""}`}
          />
          <span>View source CSV data</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
