import Layout from "@/features/course/components/Layout";
// import Hero from "@/features/course/components/Hero";
import RelatedCourses from "@/features/course/components/RelatedCourses";

export default function CourseDetails() {
  return (
    <Layout>
      <main
        style={{
          background:
            "linear-gradient(156.58deg, rgba(15, 232, 232, 0.2) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
        }}
        className="pt-44 pb-20"
      >
        {/* <Hero courseData={courseData} /> */}
        <RelatedCourses />
      </main>
    </Layout>
  );
}
