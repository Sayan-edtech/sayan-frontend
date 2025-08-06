import { buttonVariants } from "@/components/ui/button";
import SessionTable from "@/features/sessions/components/SessionTable";
import SessionStats from "@/features/sessions/components/SessionStats";
import SessionFilters from "@/features/sessions/components/SessionFilters";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState, useMemo } from "react";
import { Calendar, Plus } from "lucide-react";
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

const sessions: Session[] = [
  {
    id: 1,
    title: "استشارة تقنية متخصصة في تطوير التطبيقات",
    type: "فردية",
    duration: 60,
    price: 300,
    instructor: "أحمد محمد",
    date: "2024-01-15",
    time: "10:00 ص",
    status: "available",
    maxParticipants: 1,
    currentParticipants: 0,
    category: "استشارات تقنية",
  },
  {
    id: 2,
    title: "ورشة عمل: تطوير استراتيجية الأعمال الرقمية",
    type: "ورشة عمل",
    duration: 120,
    price: 500,
    instructor: "سارة أحمد",
    date: "2024-01-18",
    time: "2:00 م",
    status: "available",
    maxParticipants: 15,
    currentParticipants: 8,
    category: "استشارات أعمال",
  },
  {
    id: 3,
    title: "جلسة تطوير شخصي: بناء الثقة والقيادة",
    type: "جماعية",
    duration: 90,
    price: 200,
    instructor: "محمد علي",
    date: "2024-01-20",
    time: "6:00 م",
    status: "booked",
    maxParticipants: 10,
    currentParticipants: 10,
    category: "تطوير شخصي",
  },
  {
    id: 4,
    title: "استشارة في تصميم واجهات المستخدم",
    type: "فردية",
    duration: 45,
    price: 250,
    instructor: "فاطمة حسن",
    date: "2024-01-12",
    time: "11:00 ص",
    status: "completed",
    maxParticipants: 1,
    currentParticipants: 1,
    category: "تصميم",
  },
  {
    id: 5,
    title: "ورشة عمل مجانية: مقدمة في ريادة الأعمال",
    type: "ورشة عمل",
    duration: 180,
    price: 0,
    instructor: "خالد أحمد",
    date: "2024-01-25",
    time: "9:00 ص",
    status: "available",
    maxParticipants: 25,
    currentParticipants: 12,
    category: "استشارات أعمال",
  },
  {
    id: 6,
    title: "جلسة استشارية: تحسين الأداء المهني",
    type: "فردية",
    duration: 60,
    price: 350,
    instructor: "نورا سالم",
    date: "2024-01-22",
    time: "4:00 م",
    status: "available",
    maxParticipants: 1,
    currentParticipants: 0,
    category: "تطوير شخصي",
  },
];

function AcademySessions() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [minPrice, setMinPrice] = useState(0);
  const [table, setTable] = useState<Table<Session> | null>(null);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchesCategory =
        selectedCategory === "الكل" || session.category === selectedCategory;

      const matchesType =
        selectedType === "الكل" || session.type === selectedType;

      const matchesStatus =
        selectedStatus === "الكل" || session.status === selectedStatus;

      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && session.price === 0) ||
        (minPrice > 0 && session.price >= minPrice);

      return matchesCategory && matchesType && matchesStatus && matchesPrice;
    });
  }, [selectedCategory, selectedType, selectedStatus, minPrice]);

  const handleClearFilters = () => {
    setSelectedCategory("الكل");
    setSelectedType("الكل");
    setSelectedStatus("الكل");
    setMinPrice(0);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Calendar}
        title="الجلسات الحضورية"
        actions={
          <Link
            to={`${Routes.DASHBOARD}/${Pages.SESSIONS}/${Pages.NEW}`}
            className={buttonVariants()}
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة جلسة جديدة
          </Link>
        }
      />
      <SessionStats sessions={filteredSessions} />
      <SessionFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <SessionTable sessions={filteredSessions} onTableReady={setTable} />
    </div>
  );
}

export default AcademySessions;

