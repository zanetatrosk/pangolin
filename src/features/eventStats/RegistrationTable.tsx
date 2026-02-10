import { FC, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Download, Mail } from "lucide-react";
import {
  Header,
  FormQuestionType, RegistrationFormData
} from "./types";
import { PATHS } from "@/paths";
import { RsvpStatus } from "@/services/types";

interface TableRowData {
  id: string;
  userId?: string;
  [key: string]: any; // Dynamic answer fields
}

const columnHelper = createColumnHelper<TableRowData>();

const createHeaders = (data: RegistrationFormData) => {
  return [ ...data.headers, {
      id: "status",
      question: "Status",
      type: FormQuestionType.SET,
      answerSet: Object.values(RsvpStatus),
    } ];
}
export const RegistrationTable: FC<{ data: RegistrationFormData }> = ({
  data,
}) => {
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // Transform registrations into table-friendly format
  const tableData: TableRowData[] = useMemo(() => {
    return data.registrations.map((reg) => {
      const row: TableRowData = {
        id: reg.id,
        userId: reg.user.userId,
        q_status: reg.status, // Use q_ prefix for consistency
      };

      // Add answers as dynamic fields
      reg.data.forEach((answer) => {
        row[`q_${answer.id}`] = Array.isArray(answer.value)
          ? answer.value.join(", ")
          : answer.value;
      });

      return row;
    });
  }, [data.registrations]);

  // Create columns dynamically based on form questions
  const columns = useMemo(() => {
    const cols = [
      // Checkbox column
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),
      ...createHeaders(data).map((header) =>
        columnHelper.accessor((row) => row[`q_${header.id}`], {
          id: `q_${header.id}`,
          header: header.question,
          cell: (info) => info.getValue() || "-",
          meta: header,
        })
      ), 
    ];
  
    return cols;
  }, [data.headers]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      sorting,
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleDeleteSelected = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    console.log("Delete registrations:", selectedIds);
    // Implement delete logic here
  };

  const handleExportSelected = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    console.log("Export registrations:", selectedIds);
    // Implement export logic here
  };

  const handleEmailSelected = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    console.log("Email registrations:", selectedIds);
    // Implement email logic here
  };

  const handleRowClick = (row: TableRowData, event: React.MouseEvent) => {
    // Don't navigate if clicking on checkbox or if no userId
    if (!row.userId) return;
    
    const target = event.target as HTMLElement;
    // Prevent navigation when clicking on checkbox
    if (target.closest('[role="checkbox"]')) return;
    
    navigate({ to: PATHS.PROFILE.VIEW(row.userId) });
  };

  return (
    <div className="space-y-4">
      {selectedCount > 0 && (
        <div className="flex items-center justify-between rounded-md border bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedCount} {selectedCount === 1 ? "row" : "rows"} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailSelected}
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSelected}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const question = header.column.columnDef.meta as Header | undefined;
                  const currentFilter = columnFilters.find(
                    (f) => f.id === header.column.id,
                  );

                  return (
                    <TableHead key={header.id}>
                      <div className="space-y-2">
                        <div className="font-medium">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>

                        {/* Render appropriate filter based on question type */}
                        {question?.type === FormQuestionType.SET ? (
                          <div className="flex items-center gap-1 mb-2">
                            <Select
                              value={(currentFilter?.value as string) || "all"}
                              onValueChange={(value) => {
                                if (value === "all") {
                                  header.column.setFilterValue(undefined);
                                } else {
                                  header.column.setFilterValue(value);
                                }
                              }}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="All" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {question.answerSet?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {currentFilter && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                  header.column.setFilterValue(undefined)
                                }
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ) : header.column.id !== "createdAt" &&
                          header.column.id !== "select" ? (
                          <Input
                            placeholder="Filter..."
                            value={(currentFilter?.value as string) || ""}
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                            className="h-8 text-xs mb-2"
                          />
                        ) : null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const hasUserId = !!row.original.userId;
                return (
                  <TableRow 
                    key={row.id}
                    className={hasUserId ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}
                    onClick={(e) => hasUserId && handleRowClick(row.original, e)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {table.getFilteredRowModel().rows.length} of {tableData.length}{" "}
        registrations
      </div>
    </div>
  );
};
