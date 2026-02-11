/**
 * Wishlist page - savings goals
 */
import type { ColumnDef } from "@tanstack/react-table";
import { trpc } from "@/lib/trpc";
import { DataTable, SortableHeader } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { ColumnFilter } from "@/components/DataTableFilters";

interface WishListItem {
  notionId: string;
  item: string;
  targetAmount: number | null;
  saved: number | null;
  remainingAmount: number | null;
  priority: string | null;
  url: string | null;
  notes: string | null;
}

/**
 * Get badge variant for priority
 */
function getPriorityVariant(priority: string | null): "default" | "secondary" | "outline" {
  if (!priority) return "secondary";
  switch (priority) {
    case "Needing":
      return "default";
    case "Soon":
      return "default";
    case "One Day":
      return "secondary";
    case "Dreaming":
      return "outline";
    default:
      return "secondary";
  }
}

export function WishlistPage() {
  // Fetch wishlist items using tRPC
  const { data, isLoading, error } = trpc.wishlist.list.useQuery({
    limit: 100,
  });

  // Define table columns
  const columns: ColumnDef<WishListItem>[] = [
    {
      accessorKey: "item",
      header: ({ column }) => <SortableHeader column={column}>Item</SortableHeader>,
      cell: ({ row }) => (
        <div className="max-w-md">
          {row.original.url ? (
            <a
              href={row.original.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline text-blue-600 dark:text-blue-400"
            >
              {row.original.item}
            </a>
          ) : (
            <div className="font-medium">{row.original.item}</div>
          )}
          {row.original.notes && (
            <div className="text-sm text-muted-foreground truncate mt-1">
              {row.original.notes}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) =>
        row.original.priority ? (
          <Badge variant={getPriorityVariant(row.original.priority)} className="text-xs">
            {row.original.priority}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      accessorKey: "targetAmount",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Target</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.original.targetAmount;
        return (
          <div className="text-right font-mono tabular-nums">
            {value !== null ? (
              <span>${value.toFixed(2)}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "saved",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Saved</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.original.saved;
        return (
          <div className="text-right font-mono tabular-nums">
            {value !== null ? (
              <span className="text-green-600 dark:text-green-400">${value.toFixed(2)}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "remainingAmount",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Remaining</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.original.remainingAmount;
        return (
          <div className="text-right font-mono tabular-nums">
            {value !== null ? (
              <span className="text-orange-600 dark:text-orange-400">${value.toFixed(2)}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        );
      },
    },
    {
      id: "progress",
      header: "Progress",
      cell: ({ row }) => {
        const saved = row.original.saved;
        const target = row.original.targetAmount;
        if (saved === null || target === null || target === 0) {
          return <span className="text-muted-foreground text-sm">—</span>;
        }
        const percentage = Math.min((saved / target) * 100, 100);
        return (
          <div className="flex items-center gap-2 min-w-[120px]">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 dark:bg-green-400 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
              {percentage.toFixed(0)}%
            </span>
          </div>
        );
      },
    },
  ];

  // Define filters for the table
  const tableFilters: ColumnFilter[] = [
    {
      id: "priority",
      type: "select",
      label: "Priority",
      options: [
        { label: "All Priorities", value: "" },
        { label: "Needing", value: "Needing" },
        { label: "Soon", value: "Soon" },
        { label: "One Day", value: "One Day" },
        { label: "Dreaming", value: "Dreaming" },
      ],
    },
  ];

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Wish List</h1>
        <Alert variant="destructive">
          <AlertTitle>Unable to load wishlist</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              The backend API is not responding. Make sure the finance-api server is running.
            </p>
            <details className="mt-3">
              <summary className="cursor-pointer hover:underline font-medium text-sm">
                Show technical details
              </summary>
              <code className="block mt-2 p-3 bg-black/10 dark:bg-black/20 rounded text-xs font-mono whitespace-pre-wrap break-all">
                {error.message}
              </code>
            </details>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wish List</h1>
          <p className="text-muted-foreground">
            {data && `${data.pagination.total} items on your wishlist`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : data ? (
        <DataTable
          columns={columns}
          data={data.data}
          searchable
          searchColumn="item"
          searchPlaceholder="Search wishlist..."
          paginated
          defaultPageSize={50}
          pageSizeOptions={[25, 50, 100]}
          filters={tableFilters}
        />
      ) : null}
    </div>
  );
}
