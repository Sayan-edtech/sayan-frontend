import type { Course } from "@/types/couse";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";

function CourseCard({ course, href }: { course: Course; href?: string }) {
  return (
    <Link
      to={href ?? `/courses/${course.slug}`}
      className="flex flex-col h-full"
    >
      {/* Course Image */}
      <div className="aspect-video relative">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="w-full h-[180px] object-cover rounded-[20px]"
        />
        {/* Free Badge */}
        <div className="absolute top-3 left-3 bg-[#009AFF] text-white text-xs font-semibold px-3 py-1 rounded-full">
          مجاني
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="fill-current w-3 h-3 text-yellow-400" />
          <span>{course.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col gap-4 flex-1 pt-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-card-foreground line-clamp-2 truncate">
              {course.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 truncate">
            {course.description}
          </p>
        </div>

        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              إضافة للسلة
            </button>
            <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <strong className="text-foreground text-lg">
              {course.price === 0 ? "مجاناً" : `${course.price} ريال`}
            </strong>
            {course.insteadOf && (
              <strong className="text-sm text-[#33333394] line-through decoration-[#FF4747]">
                {course.insteadOf} ريال
              </strong>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
