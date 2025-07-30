import React, { useState } from "react";
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
import { useDeleteFAQ } from "../hooks/useFAQsMutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudentFaqsEditForm from "./StudentFaqsEditForm";

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

interface StudentFaq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface StudentFaqsTableProps {
  faqs: StudentFaq[];
}

function StudentFaqsTable({ faqs }: StudentFaqsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<StudentFaq | null>(null);

  const deleteFAQMutation = useDeleteFAQ();

  const handleDeleteClick = (faq: StudentFaq) => {
    setSelectedFaq(faq);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (faq: StudentFaq) => {
    setSelectedFaq(faq);
    setEditDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedFaq) {
      try {
        await deleteFAQMutation.mutateAsync(selectedFaq.id);
        setDeleteDialogOpen(false);
        setSelectedFaq(null);
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    }
  };

  const columns: ColumnDef<StudentFaq>[] = [
    {
      accessorKey: "question",
      header: "السؤال الشائع",
      cell: ({ row }) => (
        <div className="max-w-[400px] text-right">
          <div className="font-medium truncate leading-relaxed">
            {row.getValue("question")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "answer",
      header: "الإجابة",
      cell: ({ row }) => (
        <div className="max-w-[500px] text-right">
          <div className="text-sm text-gray-600 line-clamp-3 truncate">
            {row.getValue("answer")}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "الإجراءات",
      enableHiding: false,
      cell: ({ row }) => {
        const faq = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditClick(faq)}
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClick(faq)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: faqs,
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
          placeholder="البحث في الأسئلة الشائعة..."
          value={
            (table.getColumn("question")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("question")?.setFilterValue(event.target.value)
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
                  question: "السؤال الشائع",
                  answer: "الإجابة",
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
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-5 text-right mb-2">
                    {row.getValue("question")}
                  </h3>
                  <p className="text-sm text-gray-600 text-right leading-relaxed line-clamp-3">
                    {row.getValue("answer")}
                  </p>
                </div>
                <div className="flex gap-2 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(row.original)}
                    className="h-8 w-8 p-0 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(row.original)}
                    className="h-8 w-8 p-0 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {row.getValue("created_at") ? (
                <div className="flex justify-end pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    {new Date(
                      row.getValue("created_at") as string
                    ).toLocaleDateString("ar-SA")}
                  </div>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد أسئلة شائعة.
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
                  لا توجد أسئلة شائعة.
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">حذف السؤال الشائع</DialogTitle>
            <DialogDescription className="text-right">
              هل أنت متأكد من أنك تريد حذف السؤال "{selectedFaq?.question}"؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteFAQMutation.isPending}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteFAQMutation.isPending}
            >
              {deleteFAQMutation.isPending ? "جاري الحذف..." : "حذف"}
            </Button>
                     </DialogFooter>
         </DialogContent>
       </Dialog>

       <StudentFaqsEditForm
         faq={selectedFaq}
         open={editDialogOpen}
         onOpenChange={setEditDialogOpen}
       />
      </div>
    );
}

export default StudentFaqsTable;
