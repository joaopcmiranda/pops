/**
 * TagEditor — inline popover for editing transaction tags.
 * Shows current tags as removable chips, with autocomplete from known tags
 * and a "Suggest" button backed by an async callback.
 *
 * This component is tRPC-agnostic — callers wire up the API.
 */
import { useState, useRef, useEffect } from "react";
import { Chip } from "./Chip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

/** Common tags for autocomplete suggestions. */
export const KNOWN_TAGS = [
  "Groceries",
  "Dining",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Insurance",
  "Subscriptions",
  "Income",
  "Transfer",
  "Government",
  "Education",
  "Travel",
  "Rent",
  "Online",
  "Novated Lease",
  "Tax Deductible",
  "Other",
];

export interface TagEditorProps {
  /** Current tags on the transaction. */
  currentTags: string[];
  /** Called with the final tag list when the user saves. May be async. */
  onSave: (tags: string[]) => void | Promise<void>;
  /** Optional async callback for AI-powered tag suggestions. */
  onSuggest?: () => Promise<string[]>;
  /** Additional known tags beyond KNOWN_TAGS to show in autocomplete. */
  extraTags?: string[];
  /** Whether to disable editing (shows tags read-only). */
  disabled?: boolean;
}

/**
 * Inline tag editor that opens as a popover.
 *
 * @example
 * ```tsx
 * <TagEditor
 *   currentTags={["Groceries"]}
 *   onSave={async (tags) => { await updateTransaction({ tags }) }}
 *   onSuggest={async () => suggestTags(description, entityId)}
 * />
 * ```
 */
export function TagEditor({
  currentTags,
  onSave,
  onSuggest,
  extraTags = [],
  disabled = false,
}: TagEditorProps) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(currentTags);
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allKnownTags = [...new Set([...KNOWN_TAGS, ...extraTags])];

  // Reset local tags when prop changes (e.g. after successful external update)
  useEffect(() => {
    setTags(currentTags);
  }, [currentTags]);

  const filteredSuggestions = allKnownTags.filter(
    (tag) =>
      !tags.includes(tag) &&
      (inputValue === "" || tag.toLowerCase().includes(inputValue.toLowerCase()))
  );

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setInputValue("");
    inputRef.current?.focus();
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
      return;
    }
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
      return;
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      await onSave(tags);
      setOpen(false);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSuggest() {
    if (!onSuggest) return;
    setIsSuggesting(true);
    try {
      const suggested = await onSuggest();
      const newTags = suggested.filter((t) => !tags.includes(t));
      setTags((prev) => [...prev, ...newTags]);
    } finally {
      setIsSuggesting(false);
    }
  }

  function handleCancel() {
    setTags(currentTags);
    setInputValue("");
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex flex-wrap gap-1 min-h-6 text-left w-full rounded px-1 py-0.5 transition-colors",
            disabled
              ? "cursor-default"
              : "hover:bg-accent/50 cursor-pointer"
          )}
          aria-label="Edit tags"
          disabled={disabled}
        >
          {tags.length === 0 ? (
            <span className="text-muted-foreground text-xs">—</span>
          ) : (
            tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))
          )}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="space-y-3">
          <p className="text-sm font-medium">Edit tags</p>

          {/* Current tags as removable chips */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Chip key={tag} size="sm" removable onRemove={() => removeTag(tag)}>
                  {tag}
                </Chip>
              ))}
            </div>
          )}

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type to add a tag…"
            className="w-full text-sm border border-border rounded px-2 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            autoFocus
          />

          {/* Autocomplete suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {filteredSuggestions.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className={cn(
                    "text-xs px-2 py-0.5 border border-border rounded-full",
                    "hover:bg-accent hover:border-accent-foreground/20 transition-colors"
                  )}
                >
                  + {tag}
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            {onSuggest ? (
              <button
                onClick={handleSuggest}
                disabled={isSuggesting}
                className="text-xs text-muted-foreground hover:text-foreground underline disabled:opacity-50"
              >
                {isSuggesting ? "Suggesting…" : "Suggest"}
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="text-xs px-2 py-1 border border-border rounded hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isSaving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
