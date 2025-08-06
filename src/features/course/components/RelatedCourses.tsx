import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CourseCard from "@/components/shared/CourseCard";

export default function RelatedCourses() {
  const relatedCourses = [
    {
      id: 1,
      title: "تطوير تطبيقات الويب باستخدام React.js",
      description: "تعلم كيفية بناء تطبيقات ويب تفاعلية باستخدام React.js",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
      price: 0,
      rating: 4.8,
      instructor: {
        name: "أحمد محمد",
        image:
          "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
      },
      type: "تطوير الويب",
      category: "برمجة",
      slug: "react-js",
      videoUrl: "https://example.com/video.mp4",
      duration: "8 ساعات",
      lessonsCount: 24,
      enrolledStudents: 1200,
      level: "متوسط",
    },
    {
      id: 2,
      title: "تعلم تصميم واجهات المستخدم UI/UX",
      description: "دورة شاملة في تصميم واجهات المستخدم وتجربة المستخدم",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm3ku6p8w0001zw88iw0jzsq9%2Fnextjs-14.jpeg&w=828&q=75",
      price: 299,
      rating: 4.9,
      instructor: {
        name: "سارة أحمد",
        image:
          "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
      },
      type: "تصميم",
      category: "تصميم",
      insteadOf: 350,
      slug: "ui-ux",
      videoUrl: "https://example.com/video.mp4",
      duration: "8 ساعات",
      lessonsCount: 24,
      enrolledStudents: 1200,
      level: "متوسط",
    },
    {
      id: 3,
      title: "التسويق الرقمي الشامل",
      description: "استراتيجيات وأدوات التسويق الرقمي الحديثة",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2lmnwqy0001n5p52l97up8w%2Fairbnb-thumb.png&w=828&q=75",
      price: 199,
      rating: 4.7,
      instructor: {
        name: "محمد علي",
        image:
          "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
      },
      type: "تسويق رقمي",
      category: "تسويق",
      insteadOf: 400,
      slug: "digital-marketing",
      videoUrl: "https://example.com/video.mp4",
      duration: "8 ساعات",
      lessonsCount: 24,
      enrolledStudents: 1200,
      level: "متوسط",
    },
    {
      id: 4,
      title: "الذكاء الاصطناعي وتعلم الآلة",
      description: "مقدمة في الذكاء الاصطناعي وتطبيقاته العملية",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
      price: 399,
      rating: 4.9,
      instructor: {
        name: "د. خالد إبراهيم",
        image:
          "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
      },
      type: "ذكاء اصطناعي",
      category: "برمجة",
      insteadOf: 539,
      slug: "ai-and-machine-learning",
      videoUrl: "https://example.com/video.mp4",
      duration: "8 ساعات",
      lessonsCount: 24,
      enrolledStudents: 1200,
      level: "متوسط",
    },
    {
      id: 5,
      title: "تطوير تطبيقات الموبايل",
      description: "تعلم تطوير تطبيقات الهواتف الذكية باستخدام React Native",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
      price: 0,
      rating: 4.6,
      instructor: {
        name: "عمر حسن",
        image:
          "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
      },
      type: "تطوير الويب",
      category: "برمجة",
      slug: "mobile-development",
      videoUrl: "https://example.com/video.mp4",
      duration: "8 ساعات",
      lessonsCount: 24,
      enrolledStudents: 1200,
      level: "متوسط",
    },
    {
      id: 6,
      title: "إدارة المشاريع الاحترافية",
      description: "منهجيات وأدوات إدارة المشاريع الحديثة",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
      price: 299,
      rating: 4.8,
      instructor: {
        name: "ليلى كمال",
        image:
          "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
      },
      type: "إدارة",
      category: "أعمال",
      insteadOf: 350,
      slug: "project-management",
      videoUrl: "https://example.com/video.mp4",
      duration: "8 ساعات",
      lessonsCount: 24,
      enrolledStudents: 1200,
      level: "متوسط",
    },
  ] as const;

  return (
    <div className="container">
      <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
        مواد تعليمية مناسبة لك
      </h3>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView="auto"
        breakpoints={{
          640: {
            slidesPerView: "auto",
          },
          1024: {
            slidesPerView: "auto",
          },
        }}
        className="!pb-4 !px-1"
      >
        <ul>
          {relatedCourses.map((course) => (
            <SwiperSlide key={course.id} className="h-full">
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </div>
  );
}
