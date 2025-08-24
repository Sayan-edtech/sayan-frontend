import type { Course } from "@/types/course";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, MapPin, Globe, Video, Users } from "lucide-react";

function CourseCard({ course, href }: { course: Course; href?: string }) {
  // Get course type display info
  const getCourseTypeInfo = () => {
    switch (course.deliveryType) {
      case "recorded-online":
        return {
          icon: <Video className="w-4 h-4" />,
          label: "دورة مسجلة أون لاين",
          bgColor: "bg-blue-100 text-blue-700"
        };
      case "in-person":
        return {
          icon: <MapPin className="w-4 h-4" />,
          label: "دورة حضورية",
          bgColor: "bg-green-100 text-green-700"
        };
      case "live-online":
        return {
          icon: <Globe className="w-4 h-4" />,
          label: "دورة مباشرة أون لاين",
          bgColor: "bg-purple-100 text-purple-700"
        };
      case "private-session":
        return {
          icon: <Users className="w-4 h-4" />,
          label: "جلسة خصوصية أون لاين",
          bgColor: "bg-orange-100 text-orange-700"
        };
      case "digital-product":
        return {
          icon: <Video className="w-4 h-4" />,
          label: "منتج رقمي",
          bgColor: "bg-indigo-100 text-indigo-700"
        };
      case "product-bundle":
        return {
          icon: <Users className="w-4 h-4" />,
          label: "حزمة منتجات",
          bgColor: "bg-pink-100 text-pink-700"
        };
      default:
        return {
          icon: <Video className="w-4 h-4" />,
          label: "دورة أون لاين",
          bgColor: "bg-gray-100 text-gray-700"
        };
    }
  };

  const typeInfo = getCourseTypeInfo();
  const isClickable = course.deliveryType !== "private-session" || course.isAvailable;
  
  // Determine the correct route based on delivery type
  const getRouteUrl = () => {
    if (href) return href;
    
    switch (course.deliveryType) {
      case "live-online":
        return `/live-courses/${course.slug}`;
      case "in-person":
        return `/in-person-courses/${course.slug}`;
      default:
        return `/courses/${course.slug}`;
    }
  };

  const CardContent = () => (
    <>
      {/* Course Image */}
      <div className="relative" style={{ aspectRatio: '10/6' }}>
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-xl"
        />
        {/* Course Type Badge */}
        <div className={`absolute top-3 left-3 ${typeInfo.bgColor} text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
          {typeInfo.icon}
          <span>{typeInfo.label}</span>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="fill-current w-3 h-3 text-yellow-400" />
          <span>{course.rating.toFixed(1)}</span>
        </div>

        {/* Seat Information for in-person and live-online courses */}
        {(course.deliveryType === "in-person" || course.deliveryType === "live-online") && course.remainingSeats !== undefined && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            <span>{course.remainingSeats} مقعد متبقي</span>
          </div>
        )}

        {/* Availability overlay for unavailable private sessions */}
        {course.deliveryType === "private-session" && !course.isAvailable && (
          <div className="absolute inset-0 bg-black/50 rounded-t-xl flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded-full">
              لايوجد مواعيد حاليا  
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="flex flex-col justify-between p-4 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-card-foreground line-clamp-2 text-base leading-tight mb-4">
          {course.title}
        </h3>

        {/* Action Area */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                isClickable 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isClickable}
            >
              <ShoppingCart className="w-4 h-4" />
              {isClickable ? "إضافة للسلة" : "غير متاح"}
            </button>
            <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <strong className="text-foreground text-base">
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
    </>
  );

  // If it's a private session and not available, render as div instead of Link
  if (course.deliveryType === "private-session" && !course.isAvailable) {
    return (
      <div className="flex flex-col h-[320px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      to={getRouteUrl()}
      className="flex flex-col h-[320px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent />
    </Link>
  );
}

export default CourseCard;
