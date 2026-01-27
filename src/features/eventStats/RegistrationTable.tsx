import { FC, useMemo, useState } from "react";
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
import { X } from "lucide-react";
import {
  FormQuestion,
  FormQuestionType,
  RegistrationWithAnswers,
  RegistrationFormData,
} from "./types";

interface TableRowData {
  id: string;
  email: string;
  createdAt: string;
  [key: string]: any; // Dynamic answer fields
}

const columnHelper = createColumnHelper<TableRowData>();

export const RegistrationTable: FC<{ data: RegistrationFormData }> = ({
  data,
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Transform registrations into table-friendly format
  const tableData: TableRowData[] = useMemo(() => {
    return data.registrations.map((reg) => {
      const row: TableRowData = {
        id: reg.id,
        email: reg.user.email,
        createdAt: reg.createdAt,
      };

      // Add answers as dynamic fields
      reg.answers.forEach((answer) => {
        row[`q_${answer.questionId}`] = Array.isArray(answer.answer)
          ? answer.answer.join(", ")
          : answer.answer;
      });

      return row;
    });
  }, [data.registrations]);

  // Create columns dynamically based on form questions
  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      }),
    ];

    // Add dynamic columns for each form question
    data.form.forEach((question) => {
      cols.push(
        columnHelper.accessor(`q_${question.id}`, {
          header: question.question,
          cell: (info) => info.getValue() || "-",
          filterFn: "includesString",
          meta: {
            question,
          },
        })
      );
    });

    cols.push(
      columnHelper.accessor("createdAt", {
        header: "Registered",
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        filterFn: "includesString",
      })
    );

    return cols;
  }, [data.form]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const question = header.column.columnDef.meta?.question as
                    | FormQuestion
                    | undefined;
                  const currentFilter = columnFilters.find(
                    (f) => f.id === header.column.id
                  );

                  return (
                    <TableHead key={header.id}>
                      <div className="space-y-2">
                        <div className="font-medium">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        
                        {/* Render appropriate filter based on question type */}
                        {question?.type === FormQuestionType.SELECT ||
                        question?.type === FormQuestionType.RADIO ? (
                          <div className="flex items-center gap-1">
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
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ) : header.column.id !== "createdAt" ? (
                          <Input
                            placeholder="Filter..."
                            value={(currentFilter?.value as string) || ""}
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                            className="h-8 text-xs"
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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
