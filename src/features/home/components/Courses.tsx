import CourseCard from "@/components/shared/CourseCard";
import Searchbar from "@/components/shared/searchbar";
import { usePublicCourses } from "../hooks/useCoursesQueries";
import type { Course } from "@/types/couse";

const filters = {
  price: ["مجاني", "مدفوع"],
  type: ["تطوير الويب", "تصميم", "تسويق رقمي", "ذكاء اصطناعي"],
  category: ["برمجة", "تصميم", "أعمال", "تسويق"],
};

export default function Courses() {
  const { data: courses, isPending } = usePublicCourses({});
  if (isPending) {
    return <div className="text-center">جارٍ تحميل الدورات...</div>;
  }
  console.log("courses", courses);
  return (
    <section
      style={{
        background:
          "linear-gradient(136.72deg, rgba(0, 255, 206, 0.1) -16.9%, rgba(209, 209, 209, 0.173594) 34.08%, rgba(172, 172, 172, 0) 135.36%)",
      }}
      className="py-16"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-2xl lg:text-3xl text-foreground font-bold text-center sm:text-right">
            كل المواد التدريبية
          </h2>
          <Searchbar className="w-md max-w-full" />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="bg-card rounded-[20px] p-6 lg:col-span-1 space-y-6">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-card-foreground">
                التصنيف
              </h3>
              <div className="space-y-2">
                {filters.category.map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
          {!isPending && courses && (
            <CoursesList courses={courses?.data.courses} />
          )}
        </div>
      </div>
    </section>
  );
}
function CoursesList({ courses }: { courses: Course[] }) {
  return (
    <div className="lg:col-span-3">
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="bg-card hover:shadow-sm transition-colors duration-200 rounded-[20px] p-4"
          >
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
}
