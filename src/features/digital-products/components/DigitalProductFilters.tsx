import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { DigitalProduct } from "@/types/digital-product";

interface DigitalProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearFilters: () => void;
  table?: Table<DigitalProduct> | null;
}

function DigitalProductFilters({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
  table,
}: DigitalProductFiltersProps) {
  const categories = [
    "الكل",
    "كتب إلكترونية",
    "قوالب",
    "أدوات",
    "دورات",
    "برمجيات",
    "تصاميم",
    "أخرى",
  ];

  const statuses = ["الكل", "منشور", "مسودة"];

  const hasActiveFilters = selectedCategory !== "الكل" || selectedStatus !== "الكل" || searchTerm !== "";

  const exportToCSV = () => {
    if (!table) return;
    
    const data = table.getFilteredRowModel().rows.map(row => {
      const product = row.original;
      return {
        'العنوان': product.title,
        'الوصف': product.description,
        'السعر': product.price,
        'السعر بعد الخصم': product.discountPrice || '',
        'التصنيف': product.category,
        'الحالة': product.status === 'published' ? 'منشور' : 'مسودة',
        'المؤلف': product.author,
        'التحميلات': product.downloads,
        'التقييم': product.rating,
        'تاريخ الإنشاء': new Date(product.createdAt).toLocaleDateString('ar-SA'),
      };
    });

    const csvContent = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'digital-products.csv';
    link.click();
  };

  const printTable = () => {
    if (!table) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const data = table.getFilteredRowModel().rows.map(row => row.original);
    
    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <title>تقرير المنتجات الرقمية</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
          th { background-color: #f2f2f2; }
          h1 { text-align: center; color: #333; }
        </style>
      </head>
      <body>
        <h1>تقرير المنتجات الرقمية</h1>
        <table>
          <thead>
            <tr>
              <th>العنوان</th>
              <th>التصنيف</th>
              <th>السعر</th>
              <th>الحالة</th>
              <th>التحميلات</th>
              <th>التقييم</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(product => `
              <tr>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>$${product.discountPrice || product.price}</td>
                <td>${product.status === 'published' ? 'منشور' : 'مسودة'}</td>
                <td>${product.downloads}</td>
                <td>${product.rating} ⭐</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full sm:w-48 focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="اختر التصنيف" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-32 focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {table && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  تصدير
                  <ChevronDown className="w-4 h-4 mr-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>تصدير البيانات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem onClick={exportToCSV}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  تصدير كـ CSV
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem onClick={printTable}>
                  <Printer className="w-4 h-4 mr-2" />
                  طباعة التقرير
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {table && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  الأعمدة
                  <ChevronDown className="w-4 h-4 mr-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>إظهار الأعمدة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === 'title' && 'العنوان'}
                        {column.id === 'category' && 'التصنيف'}
                        {column.id === 'price' && 'السعر'}
                        {column.id === 'status' && 'الحالة'}
                        {column.id === 'downloads' && 'التحميلات'}
                        {column.id === 'rating' && 'التقييم'}
                        {column.id === 'createdAt' && 'تاريخ الإنشاء'}
                        {column.id === 'actions' && 'الإجراءات'}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory !== "الكل" && (
              <Badge variant="secondary" className="gap-1">
                التصنيف: {selectedCategory}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => onCategoryChange("الكل")}
                />
              </Badge>
            )}
            {selectedStatus !== "الكل" && (
              <Badge variant="secondary" className="gap-1">
                الحالة: {selectedStatus}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => onStatusChange("الكل")}
                />
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                البحث: {searchTerm}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => onSearchChange("")}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              مسح جميع الفلاتر
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DigitalProductFilters;