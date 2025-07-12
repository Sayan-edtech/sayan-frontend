import CourseForm from "@/features/dashboard/courses/components/CourseForm";
import { useCourse } from "@/features/dashboard/courses/hooks/useCoursesQueries";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ManageCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: course } = useCourse(courseId as string);
  if (!course) {
    navigate("/dashboard/courses");
    return null;
  }
  return (
    <div className="space-y-6">
      <Header />
      <CourseForm course={course.data} />
    </div>
  );
}

export default ManageCourse;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Plus className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            إضافة مادة تعليمية جديدة
          </span>
        </div>
      </div>
    </div>
  );
}
