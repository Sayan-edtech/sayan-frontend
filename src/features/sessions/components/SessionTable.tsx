import { useState, useMemo, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Session {
  id: number;
  title: string;
  type: string;
  duration: number;
  price: number;
  instructor: string;
  date: string;
  time: string;
  status: 'available' | 'booked' | 'completed';
  maxParticipants: number;
  currentParticipants: number;
  category: string;
}

interface SessionTableProps {
  sessions: Session[];
  onTableReady?: (table: Table<Session>) => void;
}

const columnHelper = createColumnHelper<Session>();

function SessionTable({ sessions, onTableReady }: SessionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const getStatusBadge = (status: Session['status']) => {
    const statusConfig = {
      available: { label: "متاح", variant: "default" as const, className: "bg-green-100 text-green-800" },
      booked: { label: "محجوز", variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "مكتمل", variant: "outline" as const, className: "bg-gray-100 text-gray-800" },
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig: Record<string, { className: string }> = {
      "فردية": { className: "bg-blue-100 text-blue-800" },
      "جماعية": { className: "bg-purple-100 text-purple-800" },
      "ورشة عمل": { className: "bg-orange-100 text-orange-800" },
    };
    
    const config = typeConfig[type] || { className: "bg-gray-100 text-gray-800" };
    return (
      <Badge className={config.className}>
        {type}
      </Badge>
    );
  };

  const columns = useMemo<ColumnDef<Session>[]>(
    () => [
      columnHelper.accessor("title", {
        header: "عنوان الجلسة",
        cell: (info) => (
          <div className="max-w-xs">
            <div className="font-medium text-gray-900 truncate">
              {info.getValue()}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {info.row.original.date}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("type", {
        header: "النوع",
        cell: (info) => getTypeBadge(info.getValue()),
      }),
      columnHelper.accessor("category", {
        header: "الفئة",
        cell: (info) => (
          <span className="text-sm text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("instructor", {
        header: "المدرب",
        cell: (info) => (
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("duration", {
        header: "المدة",
        cell: (info) => (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="w-3 h-3" />
            {info.getValue()} دقيقة
          </div>
        ),
      }),
      columnHelper.accessor("price", {
        header: "السعر",
        cell: (info) => (
          <span className="font-semibold text-gray-900">
            {info.getValue() === 0 ? "مجاني" : `${info.getValue()} ر.س`}
          </span>
        ),
      }),
      columnHelper.display({
        id: "participants",
        header: "المشاركين",
        cell: (info) => (
          <div className="flex items-center gap-1 text-sm">
            <Users className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900">
              {info.row.original.currentParticipants}/{info.row.original.maxParticipants}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("time", {
        header: "الوقت",
        cell: (info) => (
          <span className="text-sm text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "الحالة",
        cell: (info) => getStatusBadge(info.getValue()),
      }),
      columnHelper.display({
        id: "actions",
        header: "الإجراءات",
        cell: (info) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                عرض التفاصيل
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                تعديل
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: sessions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  return (
    <div className="bg-white rounded-xl shadow-sm border-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={`h-3 w-3 ${
                              header.column.getIsSorted() === "asc"
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          />
                          <ChevronDown
                            className={`h-3 w-3 -mt-1 ${
                              header.column.getIsSorted() === "desc"
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            عرض {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} إلى{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            من {table.getFilteredRowModel().rows.length} جلسة
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronRight className="h-4 w-4" />
            السابق
          </Button>
          <span className="text-sm text-gray-700">
            صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SessionTable;