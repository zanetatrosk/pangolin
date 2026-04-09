import { FC, useState } from "react";
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
import { Trash2, UserRound } from "lucide-react";
import {
  Header,
  FormQuestionType, RegistrationFormData
} from "./types";
import { PATHS } from "@/paths";
import { RsvpStatus } from "@/services/types";
import { SelectionActionBar } from "./SelectionActionBar";
import { useTranslation } from "react-i18next";

interface TableRowData {
  id: string;
  userId?: string;
  q_status: RsvpStatus;
  [key: string]: any; // Dynamic answer fields
}

const columnHelper = createColumnHelper<TableRowData>();

const isNameHeader = (header: Header) => header.id === "email"

const createHeaders = (data: RegistrationFormData, t: (key: string) => string) => {
  return [ ...data.headers, {
      id: "status",
      question: t("eventStats.table.status"),
      type: FormQuestionType.SET,
      answerSet: Object.values(RsvpStatus),
    } ];
}
export const RegistrationTable: FC<{ data: RegistrationFormData; eventId: string }> = ({
  data,
  eventId,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // Transform registrations into table-friendly format
  const tableData: TableRowData[] = data.registrations.map((reg) => {
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

  // Create columns dynamically based on form questions
  const columns = [
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
          aria-label={t("eventStats.table.selectAll")}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t("eventStats.table.selectRow")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    ...createHeaders(data, t).map((header) =>
      columnHelper.accessor((row) => row[`q_${header.id}`], {
        id: `q_${header.id}`,
        header: header.question,
        cell: (info) => {
          const value = info.getValue() || "-";

          if (isNameHeader(header) && info.row.original.userId) {
            return (
              <div className="flex items-center gap-2">
                <span>{String(value)}</span>
                <Button
                  type="button"
                  size="icon"
                  className="h-6 w-6"
                  aria-label={t("eventStats.table.viewProfile")}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate({ to: PATHS.PROFILE.VIEW(info.row.original.userId!) });
                  }}
                > 
                  <UserRound className="h-4 w-4" />
                </Button>
              </div>
            );
          }
          if(header.id === "updatedAt" || header.id === "timestamp") {
            return new Date(String(value)).toLocaleString();
          }
          return value;
        },
        meta: header,
      })
    ), 
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getRowId: (row) => row.id,
    autoResetAll: false,
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

  return (
    <div className="space-y-4">
      <SelectionActionBar
        selectedRows={table.getSelectedRowModel().rows.map(row => row.original)}
        eventId={eventId}
      />
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
                                <SelectValue placeholder={t("eventStats.table.all")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">{t("eventStats.table.all")}</SelectItem>
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
                            placeholder={t("eventStats.table.filterPlaceholder")}
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
                return (
                  <TableRow 
                    key={row.id}
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
                  {t("eventStats.table.noRegistrations")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        {t("eventStats.table.showing", { filtered: table.getFilteredRowModel().rows.length, total: tableData.length })}
      </div>
    </div>
  );
};
