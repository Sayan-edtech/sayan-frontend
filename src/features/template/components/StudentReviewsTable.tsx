import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StudentReview {
  student_name: string;
  image: string;
  rating: number;
  comment: string;
}

interface StudentReviewsTableProps {
  reviews: StudentReview[];
}

const columns: ColumnDef<StudentReview>[] = [
  {
    accessorKey: "image",
    header: "الصورة",
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt={row.getValue("name")}
        className="h-12 w-12 rounded-lg object-cover"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "student_name",
    header: "اسم الطالب",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium text-right truncate">
          {row.getValue("student_name")}
        </div>
      </div>
    ),
  },
 
  {
    accessorKey: "rating",
    header: "التقييم",
    cell: ({ row }) => (
      <div className="text-[#FFC107]">{"★".repeat(row.getValue("rating"))}</div>
    ),
  },
  {
    accessorKey: "comment",
    header: "التعليق",
    cell: ({ row }) => (
      <Badge variant="outline" className="border-blue-200 text-blue-800">
        {row.getValue("comment")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: () => {
      return (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function StudentReviewsTable({ reviews }: StudentReviewsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: reviews,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        <Input
          placeholder="البحث في الاراء عن اسم الطالب..."
          value={
            (table.getColumn("student_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("student_name")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto sm:ml-auto">
              الأعمدة <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnHeaders = {
                  image: "الصورة",
                  student_name: "اسم الطالب",
                  rating: "التقييم",
                  comment: "التعليق",
                };
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnHeaders[column.id as keyof typeof columnHeaders] ||
                      column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={row.getValue("image")}
                  alt={row.getValue("title")}
                  className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                    {row.getValue("title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 text-right">
                    {row.getValue("instructor")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 text-xs"
                >
                  {row.getValue("category")}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-800 text-xs"
                >
                  {row.getValue("type")}
                </Badge>
                <Badge
                  className={`text-xs ${
                    row.getValue("level") === "مبتدئ"
                      ? "bg-green-100 text-green-800"
                      : row.getValue("level") === "متوسط"
                      ? "bg-yellow-100 text-yellow-800"
                      : row.getValue("level") === "متقدم"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {row.getValue("level")}
                </Badge>
              </div>

              <div className="flex justify-end pt-2 border-t">
                <div className="text-sm font-medium">
                  {parseFloat(row.getValue("price")) === 0
                    ? "مجاني"
                    : `${row.getValue("price")} ر.س`}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد نتائج.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-right font-semibold text-gray-700 py-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right py-4">
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
                  className="h-24 text-center text-gray-500"
                >
                  لا توجد نتائج.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} صف محدد.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StudentReviewsTable;
