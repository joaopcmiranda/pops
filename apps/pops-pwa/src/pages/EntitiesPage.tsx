/**
 * Entities page - list and manage merchants/payees
 */
import type { ColumnDef } from "@tanstack/react-table";
import { trpc } from "@/lib/trpc";
import { DataTable, SortableHeader } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { ColumnFilter } from "@/components/DataTableFilters";

interface Entity {
  notionId: string;
  name: string;
  type: string | null;
  aliases: string[];
  notes: string | null;
}

export function EntitiesPage() {
  // Fetch entities using tRPC
  const { data, isLoading, error } = trpc.entities.list.useQuery({
    limit: 100,
  });

  // Define table columns
  const columns: ColumnDef<Entity>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) =>
        row.original.type ? (
          <Badge variant="outline" className="text-xs">
            {row.original.type}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      accessorKey: "aliases",
      header: "Aliases",
      cell: ({ row }) => {
        const aliases = row.original.aliases;
        if (!aliases || aliases.length === 0) {
          return <span className="text-muted-foreground text-sm">—</span>;
        }
        return (
          <div className="flex flex-wrap gap-1">
            {aliases.slice(0, 3).map((alias) => (
              <Badge key={alias} variant="secondary" className="text-xs">
                {alias}
              </Badge>
            ))}
            {aliases.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{aliases.length - 3}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) =>
        row.original.notes ? (
          <div className="max-w-xs truncate text-sm text-muted-foreground">
            {row.original.notes}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
  ];

  // Define filters for the table
  const tableFilters: ColumnFilter[] = [
    {
      id: "type",
      type: "select",
      label: "Type",
      options: [
        { label: "All Types", value: "" },
        { label: "Restaurant", value: "Restaurant" },
        { label: "Retail", value: "Retail" },
        { label: "Service", value: "Service" },
        { label: "Online", value: "Online" },
      ],
    },
  ];

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Entities</h1>
        <Alert variant="destructive">
          <AlertTitle>Unable to load entities</AlertTitle>
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
          <h1 className="text-3xl font-bold">Entities</h1>
          <p className="text-muted-foreground">
            {data && `${data.pagination.total} merchants and payees`}
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
          searchColumn="name"
          searchPlaceholder="Search entities..."
          paginated
          defaultPageSize={50}
          pageSizeOptions={[25, 50, 100]}
          filters={tableFilters}
        />
      ) : null}
    </div>
  );
}
