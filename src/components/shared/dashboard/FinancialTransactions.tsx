import { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Calendar, Download } from "lucide-react";
import type { Transaction, TransactionFilter, DateRange } from '@/types/wallet';
import { ITEMS_PER_PAGE } from '@/constants/wallet';

interface FinancialTransactionsProps {
  transactions: Transaction[];
}

export default function FinancialTransactions({ transactions }: FinancialTransactionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>("this-month");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = searchQuery === "" || 
        transaction.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = transactionFilter === "all" ||
        (transactionFilter === "income" && transaction.change.startsWith("+ ")) ||
        (transactionFilter === "expense" && transaction.change.startsWith("-")) ||
        (transactionFilter === "course" && transaction.type === "بيع دورة") ||
        (transactionFilter === "partnership" && transaction.type === "عمولة شراكة");
      
      // Date range filtering would be implemented here with actual date parsing
      // For now, we'll assume all transactions match the date range
      const matchesDateRange = true;
      
      return matchesSearch && matchesFilter && matchesDateRange;
    });
  }, [transactions, searchQuery, transactionFilter, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Export transactions function
  const handleExportTransactions = () => {
    // Implementation would go here
    console.log('Exporting transactions...');
  };

  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">سجل المعاملات المالية</h3>
          <p className="text-sm text-gray-600 mt-1">إجمالي {filteredTransactions.length} معاملة</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleExportTransactions}
        >
          <Download className="w-4 h-4" />
          تصدير المعاملات
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المعاملات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
        <Select value={transactionFilter} onValueChange={(value) => setTransactionFilter(value as TransactionFilter)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="تصفية حسب النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المعاملات</SelectItem>
            <SelectItem value="income">الإيرادات</SelectItem>
            <SelectItem value="expense">المصروفات</SelectItem>
            <SelectItem value="course">بيع الدورات</SelectItem>
            <SelectItem value="partnership">عمولات الشراكة</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="gap-2">
              <Calendar className="w-4 h-4" />
              الفترة الزمنية
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDateRange("today")}>اليوم</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("this-week")}>هذا الأسبوع</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("this-month")}>هذا الشهر</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("this-year")}>هذا العام</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-right font-semibold text-gray-700 py-4">رقم المعاملة</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">التاريخ</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">نوع المعاملة</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">المنتج</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">الطالب</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">التغيير في الرصيد</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">الرصيد</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="text-right py-4">
                    <div className="text-gray-600">{transaction.id}</div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${transaction.typeColor}-100 text-${transaction.typeColor}-700`}>
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="font-medium text-gray-900">{transaction.product}</div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="text-gray-600">{transaction.student}</div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className={`font-semibold ${transaction.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      ﷼{transaction.change}
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="text-gray-900 font-medium">﷼{transaction.after}</div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${transaction.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                  لا توجد معاملات مطابقة للبحث
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {paginatedTransactions.length > 0 ? (
          paginatedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm leading-5 text-right">
                    {transaction.product}
                  </h3>
                  <p className="text-xs text-gray-500 text-right">
                    {transaction.student}
                  </p>
                  <p className="text-xs text-gray-500 text-right">
                    {transaction.date}
                  </p>
                </div>
                <div className="text-left">
                  <div className={`font-semibold text-sm ${transaction.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    ﷼{transaction.change}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${transaction.typeColor}-100 text-${transaction.typeColor}-700`}>
                  {transaction.type}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${transaction.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                  {transaction.status}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm text-gray-600">
                  رقم المعاملة: {transaction.id}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  الرصيد: ﷼{transaction.after}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد معاملات مطابقة للبحث.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            عرض {(currentPage - 1) * ITEMS_PER_PAGE + 1} إلى {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} من {filteredTransactions.length} معاملة
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              السابق
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              التالي
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}