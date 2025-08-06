import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Clock, Play, Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Dummy course data
const dummyCourses = [
  {
    id: 1,
    title: "البرمجة بـ React للمبتدئين",
    academy: "أكاديمية التقنية المتقدمة",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop&crop=center",
    progress: 75,
    duration: "12 ساعة",
    level: "مبتدئ",
  },
  {
    id: 2,
    title: "تطوير تطبيقات الجوال باستخدام Flutter",
    academy: "معهد البرمجة الحديثة",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop&crop=center",
    progress: 45,
    duration: "18 ساعة",
    level: "متوسط",
  },
  {
    id: 3,
    title: "أساسيات التصميم UI/UX",
    academy: "مدرسة التصميم الرقمي",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop&crop=center",
    progress: 90,
    duration: "8 ساعات",
    level: "مبتدئ",
  },
  {
    id: 4,
    title: "إدارة قواعد البيانات MySQL",
    academy: "أكاديمية قواعد البيانات",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=240&fit=crop&crop=center",
    progress: 30,
    duration: "15 ساعة",
    level: "متقدم",
  },
];

function MyCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");

  const sortOptions = ["الأحدث", "الأقدم"];



  const getLevelColor = (level: string) => {
    switch (level) {
      case "مبتدئ":
        return "bg-green-100 text-green-700";
      case "متوسط":
        return "bg-yellow-100 text-yellow-700";
      case "متقدم":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            placeholder="ابحث في المواد التعليمية..."
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
      
      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Course Image */}
            <div className="relative aspect-[10/6] overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-white text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-2" />
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>
              
              {/* Academy Info */}
              <div 
                className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => navigate(`/academy/${course.id}`)}
              >
                <img 
                  src={course.academyImage} 
                  alt={course.academy}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{course.academy}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">التقدم</span>
                  <span className="text-xs font-medium text-blue-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium rounded-lg"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <Play className="w-4 h-4 mr-2" />
                المتابعة 
              </Button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default MyCourses;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المواد التعليمية
          </span>
        </div>
      </div>
    </div>
  );
}
