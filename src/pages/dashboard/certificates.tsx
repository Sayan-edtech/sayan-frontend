import {
  GraduationCap,
  Download,
  Calendar,
  Award,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Dummy certificates data
const dummyCertificates = [
  {
    id: 1,
    title: "شهادة إتمام دورة البرمجة بـ React",
    courseName: "البرمجة بـ React للمبتدئين",
    academy: "أكاديمية التقنية المتقدمة",
    academyImage: "/api/placeholder/50/50",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop&crop=center",
    completionDate: "2024-01-15",
    issueDate: "2024-01-16",
    certificateId: "CERT-REACT-2024-001",
    grade: "ممتاز",
    score: 95,
  },
  {
    id: 2,
    title: "شهادة إتمام دورة تطوير تطبيقات الجوال",
    courseName: "تطوير تطبيقات الجوال باستخدام Flutter",
    academy: "معهد البرمجة الحديثة",
    academyImage: "/api/placeholder/50/50",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=240&fit=crop&crop=center",
    completionDate: "2024-02-20",
    issueDate: "2024-02-21",
    certificateId: "CERT-FLUTTER-2024-002",
    grade: "جيد جداً",
    score: 88,
  },
  {
    id: 3,
    title: "شهادة إتمام دورة أساسيات التصميم",
    courseName: "أساسيات التصميم UI/UX",
    academy: "مدرسة التصميم الرقمي",
    academyImage: "/api/placeholder/50/50",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=240&fit=crop&crop=center",
    completionDate: "2024-03-10",
    issueDate: "2024-03-11",
    certificateId: "CERT-DESIGN-2024-003",
    grade: "ممتاز",
    score: 92,
  },
];

function Certificates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");

  const sortOptions = ["الأحدث", "الأقدم"];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "ممتاز":
        return "bg-green-100 text-green-700";
      case "جيد جداً":
        return "bg-blue-100 text-blue-700";
      case "جيد":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Header />

      {/* Search and Sort Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث في الشهادات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px] justify-between"
            >
              <span className="text-gray-700">{sortBy}</span>
              <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className={`cursor-pointer ${
                  sortBy === option ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Certificate Header */}
            <div className="relative aspect-[10/6] overflow-hidden">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-white text-center">
                  <Award className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-medium">شهادة إنجاز</p>
                </div>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {certificate.title}
              </h3>

              {/* Academy Info */}
              <div
                className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() =>
                  (window.location.href = `/academy/${certificate.id}`)
                }
              >
                <img
                  src={certificate.academyImage}
                  alt={certificate.academy}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">
                  {certificate.academy}
                </span>
              </div>

              {/* Certificate Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>
                    تاريخ الإكمال: {formatDate(certificate.completionDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <GraduationCap className="w-3 h-3" />
                  <span>رقم الشهادة: {certificate.certificateId}</span>
                </div>
              </div>

              {/* Grade and Score */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(
                    certificate.grade
                  )}`}
                >
                  {certificate.grade}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {certificate.score}%
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium rounded-lg">
                  <Download className="w-4 h-4 mr-2" />
                  تحميل الشهادة
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  عرض
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">الشهادات</span>
        </div>
      </div>
    </div>
  );
}
