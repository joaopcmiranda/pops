/**
 * Inventory page - home inventory management
 */
import type { ColumnDef } from "@tanstack/react-table";
import { trpc } from "@/lib/trpc";
import { DataTable, SortableHeader } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { ColumnFilter } from "@/components/DataTableFilters";

interface InventoryItem {
  notionId: string;
  itemName: string;
  brand: string | null;
  model: string | null;
  room: string | null;
  type: string | null;
  condition: string | null;
  inUse: boolean;
  deductible: boolean;
  purchaseDate: string | null;
  replacementValue: number | null;
  resaleValue: number | null;
  purchasedFromName: string | null;
}

export function InventoryPage() {
  // Fetch inventory items using tRPC
  const { data, isLoading, error } = trpc.inventory.list.useQuery({
    limit: 100,
  });

  // Define table columns
  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "itemName",
      header: ({ column }) => <SortableHeader column={column}>Item</SortableHeader>,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.itemName}</div>
          {(row.original.brand || row.original.model) && (
            <div className="text-sm text-muted-foreground">
              {[row.original.brand, row.original.model].filter(Boolean).join(" ")}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "room",
      header: "Room",
      cell: ({ row }) =>
        row.original.room ? (
          <span className="text-sm">{row.original.room}</span>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
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
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) =>
        row.original.condition ? (
          <Badge variant="secondary" className="text-xs">
            {row.original.condition}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      accessorKey: "inUse",
      header: "In Use",
      cell: ({ row }) =>
        row.original.inUse ? (
          <Badge variant="default" className="text-xs">
            Yes
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-xs">
            No
          </Badge>
        ),
    },
    {
      accessorKey: "replacementValue",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column}>Replacement Value</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.original.replacementValue;
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
      accessorKey: "purchaseDate",
      header: ({ column }) => <SortableHeader column={column}>Purchase Date</SortableHeader>,
      cell: ({ row }) => {
        const date = row.original.purchaseDate;
        if (!date) {
          return <span className="text-muted-foreground text-sm">—</span>;
        }
        return (
          <span className="text-sm">
            {new Date(date).toLocaleDateString("en-AU", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
    },
  ];

  // Define filters for the table
  const tableFilters: ColumnFilter[] = [
    {
      id: "room",
      type: "select",
      label: "Room",
      options: [
        { label: "All Rooms", value: "" },
        { label: "Living Room", value: "Living Room" },
        { label: "Bedroom", value: "Bedroom" },
        { label: "Kitchen", value: "Kitchen" },
        { label: "Office", value: "Office" },
        { label: "Garage", value: "Garage" },
        { label: "Storage", value: "Storage" },
      ],
    },
    {
      id: "type",
      type: "select",
      label: "Type",
      options: [
        { label: "All Types", value: "" },
        { label: "Electronics", value: "Electronics" },
        { label: "Furniture", value: "Furniture" },
        { label: "Appliance", value: "Appliance" },
        { label: "Tool", value: "Tool" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      id: "condition",
      type: "select",
      label: "Condition",
      options: [
        { label: "All Conditions", value: "" },
        { label: "New", value: "New" },
        { label: "Excellent", value: "Excellent" },
        { label: "Good", value: "Good" },
        { label: "Fair", value: "Fair" },
        { label: "Poor", value: "Poor" },
      ],
    },
    {
      id: "inUse",
      type: "select",
      label: "In Use",
      options: [
        { label: "All", value: "" },
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
    {
      id: "deductible",
      type: "select",
      label: "Deductible",
      options: [
        { label: "All", value: "" },
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
  ];

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Home Inventory</h1>
        <Alert variant="destructive">
          <AlertTitle>Unable to load inventory</AlertTitle>
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
          <h1 className="text-3xl font-bold">Home Inventory</h1>
          <p className="text-muted-foreground">
            {data && `${data.pagination.total} items tracked`}
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
          searchColumn="itemName"
          searchPlaceholder="Search items..."
          paginated
          defaultPageSize={50}
          pageSizeOptions={[25, 50, 100]}
          filters={tableFilters}
        />
      ) : null}
    </div>
  );
}
