import { Plus, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import CourseTable from "@/features/courses/components/CourseTable";
import CourseStats from "@/features/courses/components/CourseStats";
import CourseFilters from "@/features/courses/components/CourseFilters";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";

interface Course {
  id: number;
  title: string;
  category: string;
  type: string;
  level: string;
  instructor: string;
  price: number;
  image: string;
  students?: number;
  rating?: number;
}

const courses: Course[] = [
  {
    id: 1,
    title:
      "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android",
    category: "تطوير التطبيقات",
    type: "تفاعلية",
    level: "متوسط",
    instructor: "أحمد محمد",
    price: 299,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 145,
    rating: 4.8,
  },
  {
    id: 2,
    title:
      "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف",
    category: "تطوير الويب",
    type: "تقنية",
    level: "متقدم",
    instructor: "سارة أحمد",
    price: 450,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 298,
    rating: 4.9,
  },
  {
    id: 3,
    title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة",
    category: "تصميم",
    type: "إبداعية",
    level: "مبتدئ",
    instructor: "محمد علي",
    price: 199,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 89,
    rating: 4.7,
  },
];
function AcademyCourses() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [minPrice, setMinPrice] = useState(0);
  const [table, setTable] = useState<Table<Course> | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "الكل" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "الكل" || course.level === selectedLevel;

      const matchesType =
        selectedType === "الكل" || course.type === selectedType;

      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && course.price === 0) ||
        (minPrice > 0 && course.price >= minPrice);

      return matchesCategory && matchesLevel && matchesType && matchesPrice;
    });
  }, [selectedCategory, selectedLevel, selectedType, minPrice]);

  const handleClearFilters = () => {
    setSelectedCategory("الكل");
    setSelectedLevel("الكل");
    setSelectedType("الكل");
    setMinPrice(0);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Users}
        title="الدورات التدريبية"
        actions={
          <Link
            to={`${Routes.DASHBOARD}/${Pages.COURSES}/${Pages.NEW}`}
            className={buttonVariants()}
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة دورة جديدة
          </Link>
        }
      />
      <CourseStats courses={filteredCourses} />
      <CourseFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <CourseTable courses={filteredCourses} onTableReady={setTable} />
    </div>
  );
}

export default AcademyCourses;


