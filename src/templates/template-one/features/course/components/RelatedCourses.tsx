import CourseCard from "@/components/shared/CourseCard";

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
    slug: "react-js",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
  },
  // Add more related courses as needed
];

export default function RelatedCourses() {
  return (
    <section className="py-8 bg-gray-50">
              <div className="container mx-auto">
        <h2 className="text-2xl lg:text-3xl text-gray-900 font-bold text-center mb-8">
          دورات أخرى قد تعجبك
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
