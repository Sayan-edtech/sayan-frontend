import Searchbar from "@/components/shared/searchbar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const courses = [
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
  },
];

const filters = {
  price: ["مجاني", "مدفوع"],
  type: ["تطوير الويب", "تصميم", "تسويق رقمي", "ذكاء اصطناعي"],
  category: ["برمجة", "تصميم", "أعمال", "تسويق"],
};

export default function Courses() {
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

          <CoursesList />
        </div>
      </div>
    </section>
  );
}
function CoursesList() {
  return (
    <div className="lg:col-span-3">
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
}
function CourseCard({ course }: { course: any }) {
  return (
    <li className="bg-card rounded-[20px] p-4">
      {/* Course Image */}
      <div className="aspect-video relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-[180px] object-cover rounded-[20px]"
        />
      </div>

      {/* Course Content */}
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-card-foreground line-clamp-2">
              {course.title}
            </h3>
            <Badge className="bg-[#009AFF] text-white font-semibold px-4 h-7 rounded-[20px]">
              مجاني
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              تقييمات المادة العلمية
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="fill-current w-4 h-4" />
              <span className="text-sm font-medium">
                {course.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <img
              src={course.instructor.image}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">
              {course.instructor.name}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center">
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
    </li>
  );
}
