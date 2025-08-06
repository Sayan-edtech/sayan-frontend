import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, Download } from "lucide-react";
import type { Table } from "@tanstack/react-table";

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

interface SessionFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  minPrice: number;
  onMinPriceChange: (price: number) => void;
  onClearFilters: () => void;
  table: Table<Session> | null;
}

function SessionFilters({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  minPrice,
  onMinPriceChange,
  onClearFilters,
  table,
}: SessionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    table?.getColumn("title")?.setFilterValue(value);
  };

  const exportData = () => {
    if (!table) return;
    
    const data = table.getFilteredRowModel().rows.map(row => row.original);
    const csvContent = [
      ["العنوان", "النوع", "الفئة", "المدة", "السعر", "المدرب", "التاريخ", "الوقت", "الحالة"],
      ...data.map(session => [
        session.title,
        session.type,
        session.category,
        `${session.duration} دقيقة`,
        `${session.price} ر.س`,
        session.instructor,
        session.date,
        session.time,
        session.status === 'available' ? 'متاح' : session.status === 'booked' ? 'محجوز' : 'مكتمل'
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sessions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0 space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الجلسات..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
          </Button>
          <Button
            variant="outline"
            onClick={exportData}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">الفئة</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الفئات</SelectItem>
                <SelectItem value="استشارات تقنية">استشارات تقنية</SelectItem>
                <SelectItem value="استشارات أعمال">استشارات أعمال</SelectItem>
                <SelectItem value="تطوير شخصي">تطوير شخصي</SelectItem>
                <SelectItem value="تصميم">تصميم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">نوع الجلسة</label>
            <Select value={selectedType} onValueChange={onTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الأنواع</SelectItem>
                <SelectItem value="فردية">فردية</SelectItem>
                <SelectItem value="جماعية">جماعية</SelectItem>
                <SelectItem value="ورشة عمل">ورشة عمل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">الحالة</label>
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الحالات</SelectItem>
                <SelectItem value="available">متاح</SelectItem>
                <SelectItem value="booked">محجوز</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">السعر الأدنى</label>
            <Select
              value={minPrice.toString()}
              onValueChange={(value) => onMinPriceChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر السعر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">جميع الأسعار</SelectItem>
                <SelectItem value="-1">مجاني</SelectItem>
                <SelectItem value="100">100 ر.س فأكثر</SelectItem>
                <SelectItem value="200">200 ر.س فأكثر</SelectItem>
                <SelectItem value="500">500 ر.س فأكثر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(selectedCategory !== "الكل" ||
        selectedType !== "الكل" ||
        selectedStatus !== "الكل" ||
        minPrice > 0 ||
        searchTerm) && (
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">
            الفلاتر النشطة: {[selectedCategory, selectedType, selectedStatus].filter(f => f !== "الكل").length + (minPrice > 0 ? 1 : 0) + (searchTerm ? 1 : 0)}
          </span>
          <Button
            variant="ghost"
            onClick={() => {
              onClearFilters();
              setSearchTerm("");
              table?.getColumn("title")?.setFilterValue("");
            }}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            مسح جميع الفلاتر
          </Button>
        </div>
      )}
    </div>
  );
}

export default SessionFilters;