/**
 * Transactions page - list and manage transactions
 */
import type { ColumnDef } from "@tanstack/react-table";
import { trpc } from "@/lib/trpc";
import { DataTable, SortableHeader } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { ColumnFilter } from "@/components/DataTableFilters";

interface Transaction {
  notionId: string;
  description: string;
  account: string;
  amount: number;
  date: string;
  type: string;
  categories: string[];
  entityName: string | null;
  location: string | null;
  online: boolean;
  novatedLease: boolean;
  taxReturn: boolean;
}

export function TransactionsPage() {
  // Fetch transactions using tRPC
  const { data, isLoading, error, refetch } = trpc.transactions.list.useQuery({
    limit: 100, // Fetch more for client-side pagination
  });

  // Define table columns
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.original.date);
        return date.toLocaleDateString("en-AU", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-medium truncate">{row.original.description}</div>
          {row.original.entityName && (
            <div className="text-sm text-muted-foreground truncate">
              {row.original.entityName}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "account",
      header: "Account",
      cell: ({ row }) => (
        <span className="text-sm font-mono">{row.original.account}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Amount</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const amount = row.original.amount;
        const isNegative = amount < 0;
        return (
          <div className="text-right font-mono font-medium tabular-nums">
            <span className={isNegative ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
              {isNegative ? "-" : "+"}$
              {Math.abs(amount).toFixed(2)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }) => {
        const categories = row.original.categories;
        if (!categories || categories.length === 0) {
          return <span className="text-muted-foreground">—</span>;
        }
        return (
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
            {categories.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{categories.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "online",
      header: "Online",
      cell: ({ row }) =>
        row.original.online ? (
          <Badge variant="default" className="text-xs">
            Yes
          </Badge>
        ) : null,
    },
  ];

  // Define filters for the table
  const tableFilters: ColumnFilter[] = [
    {
      id: "search",
      type: "text",
      label: "Search",
      placeholder: "Description or entity...",
    },
    {
      id: "account",
      type: "select",
      label: "Account",
      options: [
        { label: "All Accounts", value: "" },
        { label: "ANZ Everyday", value: "ANZ Everyday" },
        { label: "ANZ Savings", value: "ANZ Savings" },
        { label: "Amex", value: "Amex" },
        { label: "ING Savings", value: "ING Savings" },
        { label: "Up Everyday", value: "Up Everyday" },
      ],
    },
    {
      id: "type",
      type: "select",
      label: "Type",
      options: [
        { label: "All Types", value: "" },
        { label: "Income", value: "Income" },
        { label: "Expense", value: "Expense" },
        { label: "Transfer", value: "Transfer" },
      ],
    },
  ];

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load transactions</p>
          <p className="text-sm">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-sm underline"
          >
            Try again
          </button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            {data && `${data.pagination.total} total transactions`}
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
          searchPlaceholder="Search transactions..."
          paginated
          defaultPageSize={50}
          pageSizeOptions={[25, 50, 100]}
          filters={tableFilters}
        />
      ) : null}
    </div>
  );
}
