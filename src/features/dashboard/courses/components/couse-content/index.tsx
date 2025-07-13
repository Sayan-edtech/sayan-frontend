import Header from "./Header";
import LessonPreview from "./LessonPreview";
import LessonSidebar from "./LessonSidebar";

function CourseContent() {
  return (
    <div className="space-y-4">
      <Header />
      <div className="flex gap-4">
        <LessonSidebar />
        <LessonPreview />
      </div>
    </div>
  );
}

export default CourseContent;
